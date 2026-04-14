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
import heroImage from "../assets/images/logo.svg";

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
            <Box
              component="img"
              src={heroImage}
              alt="151 Hair Salon"
              sx={{ width: "100%", maxHeight: { xs: 320, md: 520 }, objectFit: "contain" }}
            />
          </Grid>
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
                sx={{ maxWidth: 620, fontSize: "1.08rem" }}
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
        </Grid>
      </Container>
    </Box>
  );
}

export default Hero;
