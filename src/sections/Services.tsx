import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";
import { Box, Card, CardContent, Chip, Container, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import scissorImage from "../assets/images/scissor.png";

gsap.registerPlugin(ScrollTrigger);

const categoryKeys = ["hair", "beauty", "barber"] as const;

const getScissorSize = (viewportWidth: number) => {
  if (viewportWidth < 600) return 220;
  if (viewportWidth < 900) return 360;
  return 560;
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
          opacity: 0.75,
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
            sx={{ maxWidth: 760, fontSize: { xs: "2.5rem", md: "4rem" } }}
          >
            {t("services.title")}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 760, fontSize: "1.05rem" }}
          >
            {t("services.subtitle")}
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          {categoryKeys.map((key) => {
            const items = t(`services.categories.${key}.items`, {
              returnObjects: true,
            }) as string[];

            return (
              <Grid item xs={12} md={4} key={key}>
                <Card sx={{ height: "100%", bgcolor: "background.paper" }}>
                  <CardContent sx={{ p: 3 }}>
                    <Stack spacing={2}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography variant="h3" sx={{ fontSize: "2rem" }}>
                          {t(`services.categories.${key}.title`)}
                        </Typography>
                        <Chip
                          label={`${items.length} services`}
                          variant="outlined"
                          size="small"
                        />
                      </Stack>

                      <Stack spacing={1.2}>
                        {items.map((item) => (
                          <Stack
                            key={item}
                            direction="row"
                            spacing={1.25}
                            alignItems="center"
                          >
                            <FiberManualRecordRoundedIcon
                              sx={{ fontSize: 10, color: "primary.main" }}
                            />
                            <Typography variant="body2" color="text.secondary">
                              {item}
                            </Typography>
                          </Stack>
                        ))}
                      </Stack>
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
