import AlternateEmailRoundedIcon from "@mui/icons-material/AlternateEmailRounded";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import SectionShell from "../components/SectionShell";
import { createPlaceholderArt } from "../utils/placeholderArt";

const mapPlaceholder = createPlaceholderArt({
  title: "Map",
  subtitle: "Placeholder",
  from: "#394234",
  to: "#ba6c43",
  accent: "#f7efe5",
});

function Contact() {
  const { t } = useTranslation();

  const infoItems = [
    {
      icon: <PlaceRoundedIcon color="primary" />,
      label: t("contact.addressLabel"),
      value: t("contact.address"),
    },
    {
      icon: <CallRoundedIcon color="primary" />,
      label: t("contact.phoneLabel"),
      value: t("contact.phone"),
    },
    {
      icon: <AlternateEmailRoundedIcon color="primary" />,
      label: t("contact.emailLabel"),
      value: t("contact.email"),
    },
    {
      icon: <ScheduleRoundedIcon color="primary" />,
      label: t("contact.hoursLabel"),
      value: t("contact.hours"),
    },
  ];

  return (
    <SectionShell
      id="contact"
      eyebrow={t("contact.eyebrow")}
      title={t("contact.title")}
      subtitle={t("contact.subtitle")}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Stack spacing={3}>
            <Card sx={{ bgcolor: "background.paper" }}>
              <CardContent sx={{ p: 3.5 }}>
                <Stack spacing={2.5}>
                  {infoItems.map((item) => (
                    <Stack
                      key={item.label}
                      direction="row"
                      spacing={2}
                      alignItems="flex-start"
                    >
                      <Box
                        sx={{
                          width: 44,
                          height: 44,
                          borderRadius: "50%",
                          display: "grid",
                          placeItems: "center",
                          bgcolor: "rgba(186, 108, 67, 0.12)",
                          flexShrink: 0,
                        }}
                      >
                        {item.icon}
                      </Box>
                      <Stack spacing={0.5}>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                          }}
                        >
                          {item.label}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          {item.value}
                        </Typography>
                      </Stack>
                    </Stack>
                  ))}
                </Stack>
              </CardContent>
            </Card>
            <Card sx={{ overflow: "hidden", bgcolor: "background.paper" }}>
              <Box
                component="img"
                src={mapPlaceholder}
                alt={t("contact.mapTitle")}
                sx={{ width: "100%", height: 240, objectFit: "cover" }}
              />
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h3" sx={{ fontSize: "1.9rem" }}>
                  {t("contact.mapTitle")}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t("contact.mapSubtitle")}
                </Typography>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
        <Grid item xs={12} md={7}>
          <Card sx={{ height: "100%", bgcolor: "background.paper" }}>
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Stack spacing={2.5}>
                <Typography
                  variant="h3"
                  sx={{ fontSize: { xs: "2rem", md: "2.4rem" } }}
                >
                  {t("contact.formTitle")}
                </Typography>
                <TextField fullWidth label={t("contact.name")} />
                <TextField
                  fullWidth
                  label={t("contact.emailField")}
                  type="email"
                />
                <TextField
                  fullWidth
                  label={t("contact.message")}
                  multiline
                  minRows={6}
                />
                <Button
                  variant="contained"
                  size="large"
                  sx={{ alignSelf: "flex-start" }}
                >
                  {t("contact.submit")}
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </SectionShell>
  );
}

export default Contact;
