const { createTheme } = require("@mui/material");

export const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#2e2e2e",
      contrastText: "#fff",
    },
    secondary: {
      main: "#d5c075",
      contrastText: "#000",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#d5c075",
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: "red",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          margin: "0.5rem 0",
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          padding: 0,
          borderBottom: "1px solid #717171de",
        },
      },
    },
  },
  typography: {
    fontFamily: "sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: "bolder",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: "bold",
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: "bold",
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: "bold",
    },
    h6: {
      fontSize: "1rem",
      fontWeight: "bold",
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 400,
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
    },
  },
});
