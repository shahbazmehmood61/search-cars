import { createTheme, ThemeProvider } from "@mui/material/styles";

let theme = createTheme();

theme.typography.h1 = {
  fontSize: 30,
  color: "#ffffff",
  [theme.breakpoints.down("sm")]: {
    fontSize: 24,
  },
};

theme.typography.h2 = {
  fontSize: 25,
  [theme.breakpoints.down("sm")]: {
    fontSize: 20,
  },
  color: "#000000",
};

theme.typography.h3 = {
  fontSize: 20,
  color: "#ffffff",
  [theme.breakpoints.down("sm")]: {
    fontSize: 17,
  },
};

theme.typography.body1 = {
  fontSize: 16,
  [theme.breakpoints.down("sm")]: {
    fontSize: 13,
  },
};

theme.typography.heading = {
  fontWeight: 700,
  [theme.breakpoints.down("sm")]: {
    fontSize: 14,
    fontWeight: 500,
    whiteSpace: "nowrap",
  },
};

theme.typography.page = {
  fontSize: 16,
  [theme.breakpoints.down("sm")]: {
    fontSize: 14,
  },
};

theme.typography.button = {
  textTransform: "capitalize",
};

theme.palette.primary = {
  main: "#0083C1",
};

theme.palette.secondary = {
  main: "#ffffff",
};

export const CustomTheme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
