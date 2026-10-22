import { Card, CardContent, CardMedia, Grid, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import SectionShell from "../components/SectionShell";
import danielaImage from "../assets/images/team/daniela.jpg";
import sonaImage from "../assets/images/team/sona.jpg";
import saraBarberImage from "../assets/images/team/sara_barber.jpg";
import emineImage from "../assets/images/team/emine.jpg";

const members = [
  { key: "daniela", image: danielaImage },
  { key: "sona", image: sonaImage },
  { key: "saraBarber", image: saraBarberImage },
  { key: "emine", image: emineImage },
] as const;

function Team() {
  const { t } = useTranslation();

  return (
    <SectionShell
      id="team"
      eyebrow={t("team.eyebrow")}
      title={t("team.title")}
      subtitle={t("team.subtitle")}
    >
      <Grid container spacing={3}>
        {members.map((member) => (
          <Grid item xs={12} md={6} key={member.key}>
            <Card sx={{ height: "100%", bgcolor: "background.paper" }}>
              <CardMedia
                component="img"
                image={member.image}
                alt={t(`team.members.${member.key}.imageAlt`)}
                sx={{ height: { xs: 300, md: 340 }, objectFit: "cover" }}
              />
              <CardContent sx={{ p: 3.5 }}>
                <Stack spacing={1.2}>
                  <Typography variant="h3" sx={{ fontSize: "2rem" }}>
                    {t(`team.members.${member.key}.name`)}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: "primary.main",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    {t(`team.members.${member.key}.role`)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t(`team.members.${member.key}.bio`)}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </SectionShell>
  );
}

export default Team;
