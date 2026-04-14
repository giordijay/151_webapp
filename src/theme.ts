import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#ba6c43",
      light: "#d49370",
      dark: "#8b4d30",
      contrastText: "#fffaf5",
    },
    secondary: {
      main: "#55624d",
      light: "#7d8c74",
      dark: "#394234",
      contrastText: "#f8f1e6",
    },
    background: {
      default: "#f7efe5",
      paper: "rgba(255, 250, 245, 0.86)",
    },
    text: {
      primary: "#271c18",
      secondary: "#5f4d45",
    },
  },
  typography: {
    fontFamily: "Manrope, system-ui, sans-serif",
    h1: {
      fontFamily: "Cormorant Garamond, Georgia, serif",
      fontWeight: 700,
      letterSpacing: "-0.03em",
    },
    h2: {
      fontFamily: "Cormorant Garamond, Georgia, serif",
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h3: {
      fontFamily: "Cormorant Garamond, Georgia, serif",
      fontWeight: 600,
    },
    button: {
      textTransform: "none",
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 24,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(22px)",
          backgroundImage: "none",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingInline: 20,
          paddingBlock: 11,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(14px)",
          border: "1px solid rgba(93, 72, 60, 0.1)",
          boxShadow: "0 20px 60px rgba(83, 52, 37, 0.08)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
});
