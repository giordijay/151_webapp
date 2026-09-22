import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Box, IconButton, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";
import gsap from "gsap";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import type { TouchEvent } from "react";
import { useTranslation } from "react-i18next";
import type { GalleryImage } from "../data/galleryImages";

export const LIGHTBOX_CAPTION_ID = "gallery-lightbox-caption";

export type LightboxHandle = {
  /** Riproduce l'animazione di uscita e poi chiama onClosed. */
  close: () => void;
};

type Rect = { top: number; left: number; width: number; height: number };

type GalleryLightboxProps = {
  images: GalleryImage[];
  initialIndex: number;
  /** Rect attuale della miniatura, rimisurato a ogni animazione. */
  getTileRect: (index: number) => Rect | null;
  onClosed: () => void;
  reducedMotion: boolean;
};

const SWIPE_THRESHOLD = 50;
const NAV_OFFSET = 48;

/**
 * Geometria dell'immagine espansa: contenuta in 90vw x 86vh e centrata.
 * Si calcola dalle dimensioni intrinseche note, senza attendere il caricamento.
 */
function getTargetRect(image: GalleryImage): Rect {
  const scale = Math.min(
    (window.innerWidth * 0.9) / image.width,
    (window.innerHeight * 0.86) / image.height,
  );
  const width = image.width * scale;
  const height = image.height * scale;

  return {
    width,
    height,
    left: (window.innerWidth - width) / 2,
    top: (window.innerHeight - height) / 2,
  };
}

/**
 * Trasformazione che sovrappone l'immagine espansa alla sua miniatura.
 * Le miniature masonry sono ad aspect ratio naturale (nessun object-fit: cover),
 * quindi scaleX e scaleY coincidono e il morph non deforma l'immagine:
 * passare le tile a "cover" romperebbe questa proprieta.
 */
function getThumbTransform(thumb: Rect, target: Rect) {
  return {
    x: thumb.left - target.left,
    y: thumb.top - target.top,
    scaleX: thumb.width / target.width,
    scaleY: thumb.height / target.height,
  };
}

function isOffscreen(rect: Rect) {
  return (
    rect.top + rect.height <= 0 ||
    rect.top >= window.innerHeight ||
    rect.left + rect.width <= 0 ||
    rect.left >= window.innerWidth
  );
}

function arrowSx(side: "left" | "right"): SxProps<Theme> {
  return {
    position: "fixed",
    top: { xs: "auto", sm: "50%" },
    bottom: { xs: 18, sm: "auto" },
    left: {
      xs: side === "left" ? "calc(50% - 60px)" : "calc(50% + 12px)",
      sm: side === "left" ? 16 : "auto",
    },
    right: { xs: "auto", sm: side === "right" ? 16 : "auto" },
    transform: { xs: "none", sm: "translateY(-50%)" },
    color: "common.white",
    bgcolor: "rgba(255, 255, 255, 0.12)",
    backdropFilter: "blur(6px)",
    pointerEvents: "auto",
    "&:hover": { bgcolor: "rgba(255, 255, 255, 0.24)" },
  };
}

/**
 * Vive dentro il Portal del Modal: il suo layout effect scatta quando i nodi
 * dell'overlay sono davvero nel DOM. Tenere l'animazione nel componente padre
 * non funziona, perche' il Portal monta i figli in un secondo passaggio e a
 * quel punto i ref del padre sono ancora vuoti.
 */
const GalleryLightbox = forwardRef<LightboxHandle, GalleryLightboxProps>(
  function GalleryLightbox(
    { images, initialIndex, getTileRect, onClosed, reducedMotion },
    handleRef,
  ) {
    const { t } = useTranslation();
    const [index, setIndex] = useState(initialIndex);

    const imageRef = useRef<HTMLImageElement | null>(null);
    const scrimRef = useRef<HTMLDivElement | null>(null);
    const chromeRef = useRef<HTMLDivElement | null>(null);
    const closeButtonRef = useRef<HTMLButtonElement | null>(null);
    const isClosingRef = useRef(false);
    const isAnimatingRef = useRef(false);
    const navDirectionRef = useRef(0);
    const touchStartRef = useRef<{ x: number; y: number } | null>(null);

    // Ricalcola la geometria dopo un resize / una rotazione.
    const [, bumpViewport] = useReducer((tick: number) => tick + 1, 0);

    const image = images[index];
    const target = getTargetRect(image);

    const close = useCallback(() => {
      if (isClosingRef.current) return;

      const imageEl = imageRef.current;
      const finish = () => {
        isClosingRef.current = false;
        isAnimatingRef.current = false;
        onClosed();
      };

      if (!imageEl) {
        finish();
        return;
      }

      isClosingRef.current = true;
      isAnimatingRef.current = true;
      const chrome = [scrimRef.current, chromeRef.current].filter(Boolean);

      if (reducedMotion) {
        gsap.to([imageEl, ...chrome], {
          opacity: 0,
          duration: 0.15,
          onComplete: finish,
        });
        return;
      }

      const thumb = getTileRect(index);
      const targetRect = getTargetRect(images[index]);

      // Se la miniatura non e' piu' visibile (navigazione + scroll) il morph
      // punterebbe fuori schermo: meglio una semplice dissolvenza.
      if (!thumb || isOffscreen(thumb)) {
        gsap.to([imageEl, ...chrome], {
          opacity: 0,
          duration: 0.24,
          ease: "power2.in",
          onComplete: finish,
        });
        return;
      }

      gsap
        .timeline({ defaults: { ease: "power2.inOut" }, onComplete: finish })
        .to(chromeRef.current, { opacity: 0, duration: 0.16 }, 0)
        .to(
          imageEl,
          {
            ...getThumbTransform(thumb, targetRect),
            duration: 0.42,
            force3D: true,
          },
          0,
        )
        .to(scrimRef.current, { opacity: 0, duration: 0.38 }, 0.04)
        .to(imageEl, { opacity: 0, duration: 0.12 }, 0.34);
    }, [getTileRect, images, index, onClosed, reducedMotion]);

    useImperativeHandle(handleRef, () => ({ close }), [close]);

    const navigate = useCallback(
      (direction: 1 | -1) => {
        if (isClosingRef.current || isAnimatingRef.current) return;

        const nextIndex = (index + direction + images.length) % images.length;
        const imageEl = imageRef.current;

        if (!imageEl || reducedMotion) {
          navDirectionRef.current = 0;
          setIndex(nextIndex);
          return;
        }

        isAnimatingRef.current = true;
        navDirectionRef.current = direction;
        gsap.to(imageEl, {
          x: -direction * NAV_OFFSET,
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
          onComplete: () => setIndex(nextIndex),
        });
      },
      [images.length, index, reducedMotion],
    );

    // Apertura: FLIP dalla miniatura cliccata.
    useLayoutEffect(() => {
      const imageEl = imageRef.current;
      const scrimEl = scrimRef.current;
      const chromeEl = chromeRef.current;
      if (!imageEl || !scrimEl || !chromeEl) return;

      // Esplicito invece di autoFocus: il FocusTrap del Modal sposta il focus
      // sul nodo radice se non lo trova gia' dentro, e autoFocus non arriva in
      // tempo. Alla chiusura il focus torna alla tile, gestito dal Modal.
      closeButtonRef.current?.focus({ preventScroll: true });

      const context = gsap.context(() => {
        const thumb = reducedMotion ? null : getTileRect(initialIndex);

        if (!thumb) {
          gsap.set(imageEl, { x: 0, y: 0, scaleX: 1, scaleY: 1, opacity: 0 });
          gsap.to([imageEl, scrimEl, chromeEl], {
            opacity: 1,
            duration: reducedMotion ? 0.15 : 0.24,
          });
          return;
        }

        // Lo stato iniziale va scritto prima del paint, altrimenti si vede un
        // frame con l'immagine gia' centrata a piena dimensione.
        gsap.set(imageEl, {
          transformOrigin: "top left",
          ...getThumbTransform(thumb, getTargetRect(images[initialIndex])),
          opacity: 0,
          willChange: "transform",
        });

        isAnimatingRef.current = true;

        const play = () => {
          gsap
            .timeline({
              defaults: { ease: "power3.out" },
              onComplete: () => {
                isAnimatingRef.current = false;
                gsap.set(imageEl, { willChange: "auto" });
              },
            })
            // Per i primi frame la miniatura reale resta visibile sotto, con la
            // stessa geometria: nasconde il border-radius scalato.
            .to(imageEl, { opacity: 1, duration: 0.12 }, 0)
            .to(scrimEl, { opacity: 1, duration: 0.34 }, 0)
            .to(
              imageEl,
              { x: 0, y: 0, scaleX: 1, scaleY: 1, duration: 0.52, force3D: true },
              0,
            )
            .to(chromeEl, { opacity: 1, duration: 0.24 }, 0.2);
        };

        // L'overlay e' invisibile e gia' posizionato, quindi attendere la
        // decodifica non mostra stati intermedi sbagliati.
        void imageEl.decode().then(play).catch(play);
      });

      return () => context.revert();
      // Solo al mount: i cambi di immagine hanno la loro transizione.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Cambio immagine: entra dal lato opposto a quello di uscita.
    useLayoutEffect(() => {
      if (navDirectionRef.current === 0) return;

      const imageEl = imageRef.current;
      if (!imageEl) return;

      const direction = navDirectionRef.current;
      navDirectionRef.current = 0;

      gsap.set(imageEl, {
        x: direction * NAV_OFFSET,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        opacity: 0,
      });

      const play = () => {
        gsap.to(imageEl, {
          x: 0,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => {
            isAnimatingRef.current = false;
          },
        });
      };

      void imageEl.decode().then(play).catch(play);
    }, [index]);

    // Frecce da tastiera. Esc arriva dal Modal, che chiama close().
    useEffect(() => {
      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          navigate(1);
        } else if (event.key === "ArrowLeft") {
          event.preventDefault();
          navigate(-1);
        }
      };

      window.addEventListener("keydown", onKeyDown);
      return () => window.removeEventListener("keydown", onKeyDown);
    }, [navigate]);

    useEffect(() => {
      let timer = 0;
      const onResize = () => {
        window.clearTimeout(timer);
        timer = window.setTimeout(() => {
          if (!isAnimatingRef.current) bumpViewport();
        }, 120);
      };

      window.addEventListener("resize", onResize);
      return () => {
        window.clearTimeout(timer);
        window.removeEventListener("resize", onResize);
      };
    }, [bumpViewport]);

    const handleTouchStart = (event: TouchEvent) => {
      const touch = event.changedTouches[0];
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchEnd = (event: TouchEvent) => {
      const start = touchStartRef.current;
      touchStartRef.current = null;
      if (!start) return;

      const touch = event.changedTouches[0];
      const deltaX = touch.clientX - start.x;
      const deltaY = touch.clientY - start.y;

      if (
        Math.abs(deltaX) > SWIPE_THRESHOLD &&
        Math.abs(deltaX) > Math.abs(deltaY)
      ) {
        navigate(deltaX < 0 ? 1 : -1);
      }
    };

    return (
      <Box
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        sx={{ position: "absolute", inset: 0 }}
      >
        <Box
          ref={scrimRef}
          onClick={close}
          sx={{
            position: "absolute",
            inset: 0,
            opacity: 0,
            bgcolor: "rgba(26, 17, 13, 0.92)",
            backdropFilter: "blur(6px)",
          }}
        />

        <Box
          component="img"
          ref={imageRef}
          src={image.src}
          alt={t(`gallery.items.${image.key}.imageAlt`)}
          loading="eager"
          decoding="sync"
          draggable={false}
          style={{
            top: target.top,
            left: target.left,
            width: target.width,
            height: target.height,
          }}
          sx={{
            position: "fixed",
            display: "block",
            opacity: 0,
            borderRadius: "14px",
            boxShadow: "0 40px 120px rgba(0, 0, 0, 0.45)",
            userSelect: "none",
          }}
        />

        <Box
          ref={chromeRef}
          sx={{
            position: "absolute",
            inset: 0,
            opacity: 0,
            pointerEvents: "none",
          }}
        >
          <IconButton
            ref={closeButtonRef}
            onClick={close}
            aria-label={t("gallery.closeLabel")}
            sx={{
              position: "fixed",
              top: 16,
              right: 16,
              color: "common.white",
              bgcolor: "rgba(255, 255, 255, 0.12)",
              backdropFilter: "blur(6px)",
              pointerEvents: "auto",
              "&:hover": { bgcolor: "rgba(255, 255, 255, 0.24)" },
            }}
          >
            <CloseRoundedIcon />
          </IconButton>

          <IconButton
            onClick={() => navigate(-1)}
            aria-label={t("gallery.prevLabel")}
            sx={arrowSx("left")}
          >
            <ChevronLeftRoundedIcon />
          </IconButton>

          <IconButton
            onClick={() => navigate(1)}
            aria-label={t("gallery.nextLabel")}
            sx={arrowSx("right")}
          >
            <ChevronRightRoundedIcon />
          </IconButton>

          <Typography
            id={LIGHTBOX_CAPTION_ID}
            variant="h3"
            sx={{
              position: "fixed",
              left: 0,
              right: 0,
              bottom: { xs: 76, sm: 20 },
              textAlign: "center",
              color: "common.white",
              fontSize: { xs: "1.25rem", md: "1.5rem" },
            }}
          >
            {t(`gallery.items.${image.key}.title`)}
          </Typography>
        </Box>
      </Box>
    );
  },
);

export default GalleryLightbox;
