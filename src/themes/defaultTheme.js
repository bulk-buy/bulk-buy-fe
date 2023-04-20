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
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: "red",
        },
      },
    },
  },
});
