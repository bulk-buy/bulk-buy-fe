const { createTheme } = require("@mui/material");

export const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#2e2e2e",
      contrastText: "#fff",
    },
    secondary: {
      main: "#efe494",
      contrastText: "#000",
    },
  },
});
