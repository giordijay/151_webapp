import FacebookIcon from "@mui/icons-material/Facebook";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import {
  Box,
  Container,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

type SectionLink = {
  label: string;
  href: string;
};

type FooterProps = {
  sectionLinks: SectionLink[];
};

function Footer({ sectionLinks }: FooterProps) {
  const { t } = useTranslation();

  return (
    <Box component="footer" sx={{ pb: 5, pt: 2 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 3,
            bgcolor: "rgba(39, 28, 24, 0.94)",
            color: "rgba(255, 250, 245, 0.9)",
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={4}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", md: "center" }}
          >
            <Stack spacing={1}>
              <Typography
                variant="overline"
                sx={{
                  color: "primary.light",
                  letterSpacing: "0.18em",
                  fontWeight: 800,
                }}
              >
                151 HAIR SALON
              </Typography>
              <Typography variant="body1">{t("footer.address")}</Typography>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255, 250, 245, 0.7)" }}
              >
                {t("footer.copy")}
              </Typography>
            </Stack>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              alignItems={{ xs: "flex-start", sm: "center" }}
            >
              <Stack direction="row" spacing={1}>
                {sectionLinks.map((link) => (
                  <Typography
                    key={link.href}
                    component="a"
                    href={link.href}
                    variant="body2"
                  >
                    {link.label}
                  </Typography>
                ))}
              </Stack>
              <Stack direction="row" spacing={1}>
                <IconButton
                  color="inherit"
                  component="a"
                  href="https://maps.app.goo.gl/nUvmYodWZu2rMWDt6"
                  aria-label="open location section"
                >
                  <LocationOnRoundedIcon />
                </IconButton>
                <IconButton
                  color="inherit"
                  component="a"
                  href="https://www.instagram.com/151hairsalon/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="instagram"
                >
                  <InstagramIcon />
                </IconButton>
                <IconButton
                  color="inherit"
                  component="a"
                  href="https://www.facebook.com/151hairsalon/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="facebook"
                >
                  <FacebookIcon />
                </IconButton>
                <IconButton
                  color="inherit"
                  component="a"
                  href="mailto:151hairsalon@gmail.com"
                  aria-label="email"
                >
                  <EmailRoundedIcon />
                </IconButton>
              </Stack>
            </Stack>
          </Stack>
          <Divider sx={{ borderColor: "rgba(255, 250, 245, 0.12)", my: 3 }} />
          <Typography
            variant="caption"
            sx={{ color: "rgba(255, 250, 245, 0.6)" }}
          >
            {t("footer.note")}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
