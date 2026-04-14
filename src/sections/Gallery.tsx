import ZoomInRoundedIcon from "@mui/icons-material/ZoomInRounded";
import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import SectionShell from "../components/SectionShell";
import { createPlaceholderArt } from "../utils/placeholderArt";

const galleryKeys = [
  "look1",
  "look2",
  "look3",
  "look4",
  "look5",
  "look6",
] as const;
const galleryColors = [
  ["#ba6c43", "#d4a06d"],
  ["#58694f", "#9cad8b"],
  ["#7d4b43", "#cf987f"],
  ["#5b4b69", "#ab98bf"],
  ["#48636d", "#95bfc5"],
  ["#8a563d", "#d5ad85"],
] as const;

function Gallery() {
  const { t } = useTranslation();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.down("md"));
  const [selectedImage, setSelectedImage] = useState<null | {
    src: string;
    alt: string;
  }>(null);

  const columns = isSmall ? 1 : isMedium ? 2 : 3;

  const items = galleryKeys.map((key, index) => {
    const [from, to] = galleryColors[index];
    return {
      key,
      src: createPlaceholderArt({
        title: t(`gallery.items.${key}.title`),
        subtitle: t(`gallery.items.${key}.category`),
        from,
        to,
      }),
      title: t(`gallery.items.${key}.title`),
      category: t(`gallery.items.${key}.category`),
      rows: index === 0 || index === 4 ? 2 : 1,
    };
  });

  return (
    <SectionShell
      id="gallery"
      eyebrow={t("gallery.eyebrow")}
      title={t("gallery.title")}
      subtitle={t("gallery.subtitle")}
    >
      <ImageList
        variant="quilted"
        cols={columns}
        rowHeight={columns === 1 ? 280 : 220}
        gap={20}
      >
        {items.map((item) => (
          <ImageListItem
            key={item.key}
            cols={1}
            rows={columns === 1 ? 1 : item.rows}
            sx={{ borderRadius: 6, overflow: "hidden" }}
          >
            <Box
              component="img"
              src={item.src}
              alt={item.title}
              sx={{ height: "100%", width: "100%", objectFit: "cover" }}
            />
            <ImageListItemBar
              title={item.title}
              subtitle={item.category}
              actionIcon={
                <IconButton
                  sx={{ color: "common.white" }}
                  onClick={() =>
                    setSelectedImage({ src: item.src, alt: item.title })
                  }
                  aria-label={t("gallery.viewLabel")}
                >
                  <ZoomInRoundedIcon />
                </IconButton>
              }
              sx={{
                background:
                  "linear-gradient(180deg, transparent, rgba(39, 28, 24, 0.82))",
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Dialog
        open={Boolean(selectedImage)}
        onClose={() => setSelectedImage(null)}
        maxWidth="lg"
        fullWidth
      >
        <DialogContent sx={{ p: 1.5, bgcolor: "#201713" }}>
          {selectedImage ? (
            <Stack spacing={1.5}>
              <Box
                component="img"
                src={selectedImage.src}
                alt={selectedImage.alt}
                sx={{ width: "100%", borderRadius: 4 }}
              />
            </Stack>
          ) : null}
        </DialogContent>
      </Dialog>
    </SectionShell>
  );
}

export default Gallery;
