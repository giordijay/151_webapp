import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useScrollTrigger,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";

type SectionLink = {
  label: string;
  href: string;
};

type NavbarProps = {
  sectionLinks: SectionLink[];
};

function Navbar({ sectionLinks }: NavbarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const elevated = useScrollTrigger({ disableHysteresis: true, threshold: 18 });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const openMenu = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{
        borderBottom: elevated
          ? "1px solid rgba(39, 28, 24, 0.08)"
          : "1px solid transparent",
        bgcolor: elevated ? "rgba(255, 250, 245, 0.82)" : "transparent",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: { xs: 78, md: 88 }, gap: 2 }}>
          <Stack sx={{ flexGrow: 1 }}>
            <Typography
              variant="overline"
              sx={{
                color: "primary.main",
                fontWeight: 800,
                letterSpacing: "0.22em",
              }}
            >
              151 HAIR SALON
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", fontWeight: 600 }}
            >
              Contemporary hair, beauty, and barber studio
            </Typography>
          </Stack>

          {isMobile ? (
            <>
              <LanguageSwitcher />
              <IconButton
                color="inherit"
                onClick={openMenu}
                aria-label="open navigation menu"
              >
                <MenuRoundedIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={closeMenu}
              >
                {sectionLinks.map((link) => (
                  <MenuItem
                    key={link.href}
                    component="a"
                    href={link.href}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <Stack direction="row" spacing={1.2} alignItems="center">
              {sectionLinks.map((link) => (
                <Button key={link.href} color="inherit" href={link.href}>
                  {link.label}
                </Button>
              ))}
              <Box sx={{ pl: 1 }}>
                <LanguageSwitcher />
              </Box>
            </Stack>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
