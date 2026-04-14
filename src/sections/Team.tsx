import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import SectionShell from "../components/SectionShell";

const memberKeys = ["sofia", "giulia", "martina"] as const;
const avatarColors = ["#ba6c43", "#55624d", "#85503f"];

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
        {memberKeys.map((key, index) => {
          const name = t(`team.members.${key}.name`);
          const initials = name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2);

          return (
            <Grid item xs={12} md={4} key={key}>
              <Card sx={{ height: "100%", bgcolor: "background.paper" }}>
                <CardContent sx={{ p: 3.5 }}>
                  <Stack spacing={2.5}>
                    <Avatar
                      sx={{
                        width: 76,
                        height: 76,
                        bgcolor: avatarColors[index],
                        fontWeight: 800,
                        fontSize: "1.3rem",
                      }}
                    >
                      {initials}
                    </Avatar>
                    <Stack spacing={0.5}>
                      <Typography variant="h3" sx={{ fontSize: "2rem" }}>
                        {name}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: "primary.main",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                        }}
                      >
                        {t(`team.members.${key}.role`)}
                      </Typography>
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      {t(`team.members.${key}.bio`)}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </SectionShell>
  );
}

export default Team;
