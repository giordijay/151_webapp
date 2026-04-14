import CallRoundedIcon from "@mui/icons-material/CallRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import SectionShell from "../components/SectionShell";

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
      icon: <EmailRoundedIcon color="primary" />,
      label: t("contact.emailLabel"),
      value: t("contact.email"),
    },
    {
      icon: <EventAvailableRoundedIcon color="primary" />,
      label: t("contact.appointmentLabel"),
      value: t("contact.appointment"),
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
        <Grid item xs={12}>
          <Card sx={{ bgcolor: "background.paper" }}>
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Stack spacing={3}>
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
                      {item.label === t("contact.emailLabel") ? (
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          component="a"
                          href={`mailto:${item.value}`}
                          sx={{ textDecoration: "none", color: "inherit" }}
                        >
                          {item.value}
                        </Typography>
                      ) : (
                        <Typography variant="body1" color="text.secondary">
                          {item.value}
                        </Typography>
                      )}
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </SectionShell>
  );
}

export default Contact;
