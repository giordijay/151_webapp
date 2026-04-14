import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Stack,
  Typography,
  Box,
  Container,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createPlaceholderArt } from "../utils/placeholderArt";
import scissorImage from "../assets/images/scissor.png";

gsap.registerPlugin(ScrollTrigger);

const serviceKeys = ["cut", "styling", "color", "treatment", "bridal"] as const;
const gradients = [
  ["#8b4d30", "#d49370"],
  ["#55624d", "#7d8c74"],
  ["#703b39", "#c98574"],
  ["#3f5247", "#96a883"],
  ["#9b654c", "#d7a47d"],
] as const;

const getScissorSize = (viewportWidth: number) => {
  if (viewportWidth < 600) return 220;
  if (viewportWidth < 900) return 360;
  return 600;
};

function Services() {
  const { t } = useTranslation();
  const scissorRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scissorSize, setScissorSize] = useState(() =>
    getScissorSize(window.innerWidth),
  );

  useEffect(() => {
    const onResize = () => {
      setScissorSize(getScissorSize(window.innerWidth));
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!scissorRef.current || !sectionRef.current) return;

    const scissorEl = scissorRef.current;
    const sectionEl = sectionRef.current;

    const ctx = gsap.context(() => {
      gsap.set(scissorEl, { x: 0, y: 0, rotation: 0 });

      gsap.to(scissorEl, {
        scrollTrigger: {
          trigger: sectionEl,
          start: "top center",
          end: "bottom center",
          scrub: 1,
          invalidateOnRefresh: true,
        },
        x: () => Math.max(sectionEl.offsetWidth - scissorSize, 0),
        y: () => Math.max(sectionEl.offsetHeight - scissorSize, 0),
        rotation: 360,
        duration: 1,
      });
    }, sectionEl);

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
    };
  }, [scissorSize]);

  return (
    <Box
      ref={sectionRef}
      component="section"
      id="services"
      sx={{
        scrollMarginTop: { xs: 88, md: 104 },
        py: { xs: 8, md: 12 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated Scissor Element */}
      <Box
        ref={scissorRef}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: scissorSize,
          height: scissorSize,
          backgroundImage: `url(${scissorImage})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        <Stack spacing={1.5} sx={{ mb: 5 }}>
          <Typography
            variant="overline"
            sx={{
              color: "primary.main",
              fontWeight: 800,
              letterSpacing: "0.18em",
            }}
          >
            {t("services.eyebrow")}
          </Typography>
          <Typography
            variant="h2"
            sx={{ maxWidth: 680, fontSize: { xs: "2.5rem", md: "4rem" } }}
          >
            {t("services.title")}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 720, fontSize: "1.05rem" }}
          >
            {t("services.subtitle")}
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          {serviceKeys.map((key, index) => {
            const [from, to] = gradients[index];
            const image = createPlaceholderArt({
              title: t(`services.items.${key}.title`),
              subtitle: t(`services.items.${key}.duration`),
              from,
              to,
            });

            return (
              <Grid item xs={12} md={6} lg={index === 4 ? 12 : 4} key={key}>
                <Card sx={{ height: "100%", bgcolor: "background.paper" }}>
                  <CardMedia
                    component="img"
                    image={image}
                    alt={t(`services.items.${key}.title`)}
                    sx={{ height: 240 }}
                  />
                  <CardContent sx={{ p: 3 }}>
                    <Stack spacing={2}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        spacing={2}
                        alignItems="center"
                      >
                        <Typography variant="h3" sx={{ fontSize: "2rem" }}>
                          {t(`services.items.${key}.title`)}
                        </Typography>
                        <Chip
                          icon={<AccessTimeRoundedIcon />}
                          label={t(`services.items.${key}.duration`)}
                          variant="outlined"
                        />
                      </Stack>
                      <Typography variant="body2" color="text.secondary">
                        {t(`services.items.${key}.description`)}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}

export default Services;
