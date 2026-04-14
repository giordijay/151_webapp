import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import Footer from "./components/Footer.tsx";
import Navbar from "./components/Navbar.tsx";
import Contact from "./sections/Contact.tsx";
import Gallery from "./sections/Gallery.tsx";
import Hero from "./sections/Hero.tsx";
import Services from "./sections/Services.tsx";
import Team from "./sections/Team.tsx";

function App() {
  const { t } = useTranslation();

  const sectionLinks = [
    { label: t("nav.home"), href: "#hero" },
    { label: t("nav.services"), href: "#services" },
    { label: t("nav.gallery"), href: "#gallery" },
    { label: t("nav.team"), href: "#team" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  return (
    <Box sx={{ overflowX: "clip" }}>
      <Navbar sectionLinks={sectionLinks} />
      <Box
        component="main"
        sx={{
          position: "relative",
          "&::before": {
            content: '""',
            position: "fixed",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(circle at top left, rgba(198, 123, 79, 0.16), transparent 32%), radial-gradient(circle at 85% 20%, rgba(84, 94, 74, 0.12), transparent 28%), linear-gradient(180deg, rgba(255,248,239,0.95), rgba(249,241,230,0.92))",
            zIndex: -2,
          },
          "&::after": {
            content: '""',
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            backgroundImage:
              "linear-gradient(rgba(84, 94, 74, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(84, 94, 74, 0.05) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage:
              "linear-gradient(180deg, rgba(0,0,0,0.35), transparent 85%)",
            zIndex: -1,
          },
        }}
      >
        <Hero />
        <Services />
        <Gallery />
        <Team />
        <Contact />
      </Box>
      <Footer sectionLinks={sectionLinks} />
    </Box>
  );
}

export default App;
