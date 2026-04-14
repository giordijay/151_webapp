type PlaceholderOptions = {
  title: string;
  subtitle?: string;
  from: string;
  to: string;
  accent?: string;
};

export function createPlaceholderArt({
  title,
  subtitle,
  from,
  to,
  accent = "#f7efe5",
}: PlaceholderOptions) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" role="img" aria-label="${title}">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${from}" />
          <stop offset="100%" stop-color="${to}" />
        </linearGradient>
      </defs>
      <rect width="1200" height="900" rx="64" fill="url(#g)" />
      <circle cx="980" cy="190" r="130" fill="${accent}" fill-opacity="0.18" />
      <circle cx="220" cy="720" r="170" fill="${accent}" fill-opacity="0.14" />
      <path d="M175 220C355 120 480 140 650 270C820 400 920 420 1045 355" fill="none" stroke="${accent}" stroke-opacity="0.55" stroke-width="10" stroke-linecap="round" />
      <path d="M160 620C290 530 410 520 560 605C710 690 855 690 1010 615" fill="none" stroke="${accent}" stroke-opacity="0.35" stroke-width="8" stroke-linecap="round" />
      <text x="96" y="705" font-family="Georgia, serif" font-size="116" font-weight="700" fill="#fffaf5">${title}</text>
      <text x="100" y="780" font-family="Arial, sans-serif" font-size="34" fill="#fffaf5" fill-opacity="0.92">${subtitle ?? "Placeholder visual"}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}
