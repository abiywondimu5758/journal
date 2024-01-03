import { createTheme } from "@mui/material";

const MuiTheme = () => {
  return createTheme({
    palette: {
      mode:  "dark",
      primary: {
        main: "#FF007A",
        light:"#FF007A",
        dark:"#FF007A"
      }
    },
  });
};

export default MuiTheme;
