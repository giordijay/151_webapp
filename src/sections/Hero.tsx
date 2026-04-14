import EastRoundedIcon from "@mui/icons-material/EastRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import Ribbons from "../components/Ribbons";
import { createPlaceholderArt } from "../utils/placeholderArt";

const heroImage = createPlaceholderArt({
  title: "Atelier Mane",
  subtitle: "Hero image placeholder",
  from: "#ba6c43",
  to: "#55624d",
  accent: "#fff0df",
});

function Hero() {
  const { t } = useTranslation();

  return (
    <Box
      component="section"
      id="hero"
      sx={{
        position: "relative",
        pt: { xs: 4, md: 7 },
        pb: { xs: 8, md: 10 },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
        }}
      >
        <Ribbons
          baseThickness={11}
          colors={["#5227FF", "#a70673", "#a28d93"]}
          speedMultiplier={0.42}
          maxAge={500}
          enableFade
          enableShaderEffect
        />
      </Box>
      <Container maxWidth="lg" sx={{ position: "relative" }}>
        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
          <Grid item xs={12} md={6}>
            <Stack spacing={3.5} sx={{ position: "relative", zIndex: 0 }}>
              <Chip
                label={t("hero.badge")}
                sx={{
                  alignSelf: "flex-start",
                  bgcolor: "rgba(186, 108, 67, 0.12)",
                  color: "primary.dark",
                  fontWeight: 700,
                  px: 1,
                }}
              />
              <Typography
                variant="overline"
                sx={{
                  color: "secondary.main",
                  letterSpacing: "0.22em",
                  fontWeight: 800,
                }}
              >
                {t("hero.eyebrow")}
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "3.25rem", md: "5.5rem" },
                  lineHeight: 0.94,
                }}
              >
                {t("hero.title")}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ maxWidth: 560, fontSize: "1.08rem" }}
              >
                {t("hero.description")}
              </Typography>
            </Stack>
            <Box sx={{ position: "relative", zIndex: 2, mt: 3.5 }}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  href="#contact"
                  startIcon={<EventAvailableRoundedIcon />}
                >
                  {t("hero.primaryCta")}
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  color="secondary"
                  href="#services"
                  endIcon={<EastRoundedIcon />}
                >
                  {t("hero.secondaryCta")}
                </Button>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: "relative",
                minHeight: { xs: 420, md: 600 },
                borderRadius: { xs: 6, md: 10 },
                overflow: "hidden",
                boxShadow: "0 34px 100px rgba(76, 44, 28, 0.18)",
                border: "1px solid rgba(255, 250, 245, 0.55)",
              }}
            >
              <Box
                component="img"
                src={heroImage}
                alt={t("hero.imageTitle")}
                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <Stack
                spacing={1}
                sx={{
                  position: "absolute",
                  left: { xs: 18, md: 28 },
                  right: { xs: 18, md: 28 },
                  bottom: { xs: 18, md: 28 },
                  p: { xs: 2.4, md: 3 },
                  borderRadius: 5,
                  bgcolor: "rgba(39, 28, 24, 0.55)",
                  backdropFilter: "blur(18px)",
                  color: "common.white",
                }}
              >
                <Typography
                  variant="h3"
                  sx={{ fontSize: { xs: "1.7rem", md: "2.1rem" } }}
                >
                  {t("hero.imageTitle")}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255, 250, 245, 0.82)" }}
                >
                  {t("hero.imageSubtitle")}
                </Typography>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Hero;
