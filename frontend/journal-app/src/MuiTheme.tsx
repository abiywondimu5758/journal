import { createTheme } from "@mui/material";

const MuiTheme = (mode: boolean) => {
  console.log(mode);
  return createTheme({
    palette: {
      mode: mode ? "dark" : "light",
      primary: {
        main: "#FF007A",
        light: "#FF007A",
        dark: "#FF007A",
      },
      secondary: {
        main: "#A2A2A2",
        light: "#A2A2A2",
        dark: "#A2A2A2",
      },
    },
  });
};

export default MuiTheme;
