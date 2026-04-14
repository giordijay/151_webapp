import TranslateRoundedIcon from "@mui/icons-material/TranslateRounded";
import {
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    value: string | null,
  ) => {
    if (value) {
      void i18n.changeLanguage(value);
    }
  };

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <TranslateRoundedIcon sx={{ color: "text.secondary", fontSize: 18 }} />
      <Typography
        variant="caption"
        sx={{ color: "text.secondary", fontWeight: 700 }}
      >
        {i18n.language.toUpperCase()}
      </Typography>
      <ToggleButtonGroup
        size="small"
        exclusive
        value={i18n.language}
        onChange={handleChange}
        aria-label="language switcher"
        sx={{
          "& .MuiToggleButton-root": {
            borderRadius: 999,
            borderColor: "rgba(39, 28, 24, 0.12)",
            px: 1.4,
            py: 0.45,
            fontWeight: 700,
          },
        }}
      >
        <ToggleButton value="it">IT</ToggleButton>
        <ToggleButton value="en">EN</ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
}

export default LanguageSwitcher;
