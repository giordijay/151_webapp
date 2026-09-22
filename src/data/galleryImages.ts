// Foto della location. Le dimensioni sono quelle dei file ottimizzati
// (scripts/optimize-location-images.ps1): servono a riservare lo spazio nella
// griglia masonry prima del lazy-load e a calcolare la geometria del lightbox
// senza attendere il caricamento dell'immagine.
//
// La chiave i18n e' volutamente slegata dal nome file: aggiungere o sostituire
// una foto non deve far slittare tutti i titoli.
import shot01 from "../assets/images/location/3.jpeg";
import shot02 from "../assets/images/location/4.jpeg";
import shot03 from "../assets/images/location/1.jpeg";
import shot04 from "../assets/images/location/8.jpeg";
import shot05 from "../assets/images/location/7.jpeg";
import shot06 from "../assets/images/location/12.jpeg";
import shot07 from "../assets/images/location/2.jpeg";
import shot08 from "../assets/images/location/10.jpeg";
import shot09 from "../assets/images/location/9.jpeg";
import shot10 from "../assets/images/location/11.jpeg";
import shot11 from "../assets/images/location/5.jpeg";

export type GalleryImage = {
  /** Chiave sotto `gallery.items.*` nei file di traduzione. */
  key: string;
  src: string;
  /** Dimensioni intrinseche in px. */
  width: number;
  height: number;
};

/** Ordine curato: orizzontali e verticali alternati per bilanciare le colonne. */
export const galleryImages: GalleryImage[] = [
  { key: "shot01", src: shot01, width: 2000, height: 1333 },
  { key: "shot02", src: shot02, width: 1168, height: 1776 },
  { key: "shot03", src: shot03, width: 2000, height: 1333 },
  { key: "shot04", src: shot04, width: 1333, height: 2000 },
  { key: "shot05", src: shot05, width: 2000, height: 1333 },
  { key: "shot06", src: shot06, width: 1333, height: 2000 },
  { key: "shot07", src: shot07, width: 2000, height: 1333 },
  { key: "shot08", src: shot08, width: 1334, height: 2000 },
  { key: "shot09", src: shot09, width: 2000, height: 1333 },
  { key: "shot10", src: shot10, width: 1333, height: 2000 },
  { key: "shot11", src: shot11, width: 1333, height: 2000 },
];
