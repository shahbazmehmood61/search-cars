import * as React from "react";
import { AppBar, Box, Toolbar, Typography, useMediaQuery } from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";

const useStyles = makeStyles({
  appBar: {
    "& .MuiToolbar-root": {
      paddingLeft: 6,
      paddingRight: 6,
    },
  },
});

export const Header = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const { appBar } = useStyles();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className={matches ? appBar : ""}>
        <Toolbar>
          <Typography variant="h1" component="div" sx={{ flexGrow: 1 }}>
            NHTSA
          </Typography>
          <Typography variant="h3">Vehicile Listing (vPIC)</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
