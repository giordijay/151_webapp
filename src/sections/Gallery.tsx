import {
  Box,
  ButtonBase,
  ImageList,
  ImageListItem,
  Modal,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import GalleryLightbox, {
  LIGHTBOX_CAPTION_ID,
} from "../components/GalleryLightbox";
import type { LightboxHandle } from "../components/GalleryLightbox";
import SectionShell from "../components/SectionShell";
import { galleryImages } from "../data/galleryImages";

const SCRIM_CLASS = "gallery-tile-scrim";
const GAP = 20;

function Gallery() {
  const { t } = useTranslation();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.down("md"));
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const cols = isSmall ? 1 : isMedium ? 2 : 3;

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const tileRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const lightboxRef = useRef<LightboxHandle | null>(null);

  // Rimisurato a ogni animazione: dopo un resize o un cambio di colonne la
  // miniatura non e' piu' dove era quando il lightbox si e' aperto.
  const getTileRect = useCallback((index: number) => {
    return tileRefs.current[index]?.getBoundingClientRect() ?? null;
  }, []);

  return (
    <SectionShell
      id="gallery"
      eyebrow={t("gallery.eyebrow")}
      title={t("gallery.title")}
      subtitle={t("gallery.subtitle")}
    >
      {/*
        variant="masonry" fa dipendere l'altezza di ogni contenitore
        dall'aspect ratio dell'immagine. cols e gap devono restare props:
        MUI li scrive come style inline (columnCount / columnGap / marginBottom)
        e batterebbero qualunque valore passato via sx. rowHeight va omesso,
        altrimenti forza un'altezza fissa su ogni item.
      */}
      <ImageList
        variant="masonry"
        cols={cols}
        gap={GAP}
        sx={{ m: 0, mb: `-${GAP}px`, overflowY: "visible" }}
      >
        {galleryImages.map((image, index) => {
          const title = t(`gallery.items.${image.key}.title`);

          return (
            <ImageListItem key={image.key}>
              <ButtonBase
                ref={(node: HTMLButtonElement | null) => {
                  tileRefs.current[index] = node;
                }}
                onClick={() => setActiveIndex(index)}
                aria-label={t("gallery.viewLabel", { title })}
                disableRipple
                sx={{
                  display: "block",
                  width: "100%",
                  borderRadius: 1,
                  overflow: "hidden",
                  boxShadow: "0 18px 50px rgba(83, 52, 37, 0.10)",
                  transition: "transform 340ms ease, box-shadow 340ms ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 26px 60px rgba(83, 52, 37, 0.18)",
                  },
                  [`&:hover .${SCRIM_CLASS}, &:focus-visible .${SCRIM_CLASS}`]: {
                    opacity: 1,
                  },
                  "&:focus-visible": {
                    outline: `2px solid ${theme.palette.primary.main}`,
                    outlineOffset: 3,
                  },
                  // Senza hover il titolo resta sempre leggibile.
                  "@media (hover: none)": {
                    [`& .${SCRIM_CLASS}`]: { opacity: 1 },
                  },
                  "@media (prefers-reduced-motion: reduce)": {
                    transition: "none",
                    "&:hover": { transform: "none" },
                  },
                }}
              >
                <Box
                  component="img"
                  src={image.src}
                  alt={t(`gallery.items.${image.key}.imageAlt`)}
                  // Gli attributi width/height riservano lo spazio prima del
                  // lazy-load: senza, le tile collassano e la griglia riflowa.
                  width={image.width}
                  height={image.height}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  sx={{ display: "block", width: "100%", height: "auto" }}
                />
                <Box
                  className={SCRIM_CLASS}
                  aria-hidden
                  sx={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "flex-end",
                    p: { xs: 2, md: 2.5 },
                    opacity: 0,
                    transition: "opacity 320ms ease",
                    background:
                      "linear-gradient(180deg, rgba(39, 28, 24, 0) 38%, rgba(39, 28, 24, 0.28) 62%, rgba(39, 28, 24, 0.82) 100%)",
                    pointerEvents: "none",
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      color: "common.white",
                      textAlign: "left",
                      fontSize: { xs: "1.45rem", md: "1.75rem" },
                      lineHeight: 1.15,
                      textShadow: "0 2px 18px rgba(0, 0, 0, 0.38)",
                    }}
                  >
                    {title}
                  </Typography>
                </Box>
              </ButtonBase>
            </ImageListItem>
          );
        })}
      </ImageList>

      {/*
        Modal (non Dialog: imporrebbe un Paper e una sua transizione) per avere
        portal, focus trap, scroll lock ed Esc. Il backdrop di MUI e' nascosto
        perche' scriverebbe opacity inline sullo stesso nodo animato da GSAP.
      */}
      <Modal
        open={activeIndex !== null}
        onClose={() => lightboxRef.current?.close()}
        hideBackdrop
      >
        <Box
          role="dialog"
          aria-modal="true"
          aria-labelledby={LIGHTBOX_CAPTION_ID}
          tabIndex={-1}
          sx={{ position: "fixed", inset: 0, outline: "none" }}
        >
          {activeIndex !== null ? (
            <GalleryLightbox
              ref={lightboxRef}
              images={galleryImages}
              initialIndex={activeIndex}
              getTileRect={getTileRect}
              onClosed={() => setActiveIndex(null)}
              reducedMotion={prefersReducedMotion}
            />
          ) : null}
        </Box>
      </Modal>
    </SectionShell>
  );
}

export default Gallery;
