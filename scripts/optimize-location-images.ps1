<#
.SYNOPSIS
    Ridimensiona e ricomprime le foto della gallery (src/assets/images/location).

.DESCRIPTION
    Gli originali a piena risoluzione vengono spostati una volta sola in _originals/location
    (cartella gitignorata) e da quel momento sono la sorgente di ogni run: lo script e
    idempotente e si puo rilanciare cambiando -MaxEdge / -Quality senza perdere nulla.

    Nessuna dipendenza esterna: usa System.Drawing di Windows.

.EXAMPLE
    powershell -ExecutionPolicy Bypass -File scripts/optimize-location-images.ps1
    powershell -ExecutionPolicy Bypass -File scripts/optimize-location-images.ps1 -MaxEdge 2400 -Quality 85
#>
[CmdletBinding()]
param(
    # Lato lungo massimo in pixel. Le immagini piu piccole non vengono mai ingrandite.
    [int] $MaxEdge = 2000,
    # Qualita JPEG 1-100.
    [ValidateRange(1, 100)]
    [int] $Quality = 82
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Drawing

$repoRoot = Split-Path -Parent $PSScriptRoot
$targetDir = Join-Path $repoRoot "src\assets\images\location"
$originalsDir = Join-Path $repoRoot "_originals\location"

if (-not (Test-Path $targetDir)) {
    throw "Cartella non trovata: $targetDir"
}

if (-not (Test-Path $originalsDir)) {
    New-Item -ItemType Directory -Force -Path $originalsDir | Out-Null
}

# Primo run: gli originali vivono ancora in src/. Spostali nel backup gitignorato.
$imageGlobs = @("*.jpeg", "*.jpg", "*.png")

$backupCount = @(Get-ChildItem (Join-Path $originalsDir "*") -File -Include $imageGlobs -ErrorAction SilentlyContinue).Count
if ($backupCount -eq 0) {
    $toMove = @(Get-ChildItem (Join-Path $targetDir "*") -File -Include $imageGlobs)
    if ($toMove.Count -eq 0) {
        throw "Nessuna immagine da ottimizzare in $targetDir"
    }
    Write-Host "Sposto $($toMove.Count) originali in _originals/location ..." -ForegroundColor Cyan
    $toMove | Move-Item -Destination $originalsDir
}

$sources = @(Get-ChildItem (Join-Path $originalsDir "*") -File -Include $imageGlobs) | Sort-Object {
    # Ordine naturale: 1, 2, ... 10, 11 invece di 1, 10, 11, 2
    if ($_.BaseName -match '^\d+$') { [int] $_.BaseName } else { [int]::MaxValue }
}, Name

$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
    Where-Object { $_.MimeType -eq "image/jpeg" }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters 1
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
    [System.Drawing.Imaging.Encoder]::Quality, [int64] $Quality)

$report = @()

foreach ($source in $sources) {
    $image = [System.Drawing.Image]::FromFile($source.FullName)
    try {
        $ratio = [Math]::Min($MaxEdge / $image.Width, $MaxEdge / $image.Height)
        # Mai upscaling: 4.jpeg (1168x1776) viene solo ricompresso.
        if ($ratio -gt 1) { $ratio = 1 }

        $width = [int] [Math]::Round($image.Width * $ratio)
        $height = [int] [Math]::Round($image.Height * $ratio)

        $bitmap = New-Object System.Drawing.Bitmap $width, $height
        try {
            $bitmap.SetResolution($image.HorizontalResolution, $image.VerticalResolution)
            $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
            try {
                $graphics.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
                $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
                $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
                $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
                $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

                $rect = New-Object System.Drawing.Rectangle 0, 0, $width, $height
                $graphics.DrawImage($image, $rect)
            }
            finally { $graphics.Dispose() }

            # Nome file invariato, estensione .jpeg come gli originali.
            $outPath = Join-Path $targetDir ($source.BaseName + ".jpeg")
            $bitmap.Save($outPath, $jpegCodec, $encoderParams)
        }
        finally { $bitmap.Dispose() }
    }
    finally { $image.Dispose() }

    $outFile = Get-Item (Join-Path $targetDir ($source.BaseName + ".jpeg"))
    $report += [pscustomobject]@{
        File   = $outFile.Name
        Width  = $width
        Height = $height
        KB     = [Math]::Round($outFile.Length / 1KB)
        WasKB  = [Math]::Round($source.Length / 1KB)
    }
}

$encoderParams.Dispose()

Write-Host ""
$report | Format-Table -AutoSize
$totalNow = ($report | Measure-Object -Property KB -Sum).Sum
$totalBefore = ($report | Measure-Object -Property WasKB -Sum).Sum
Write-Host ("Totale: {0} KB (prima {1} KB, -{2}%)" -f $totalNow, $totalBefore,
    [Math]::Round(100 - ($totalNow / $totalBefore * 100))) -ForegroundColor Green
Write-Host ""
Write-Host "Copia le dimensioni in src/data/galleryImages.ts:" -ForegroundColor Cyan
$report | ForEach-Object { "  {0} -> width: {1}, height: {2}" -f $_.File, $_.Width, $_.Height }
