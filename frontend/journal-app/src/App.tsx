import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import EntryDetail from "./pages/entryDetail";
import { IndexPage } from "./pages/Index";
import Signup from "./pages/Auth/Signup";
import { useState } from "react";
import { CssBaseline, useMediaQuery } from "@mui/material";
import { ThemeProvider, createMuiTheme} from '@material-ui/core/styles';
// import MuiTheme from "./MuiTheme";

function App() {
  const preferedSettings = useMediaQuery('(prefers-color-scheme: dark)')
  const [mode, setMode] = useState(preferedSettings);
  const handleModeChange = () => {
    console.log(mode)
    setMode(prev=> !prev);
  }
  const theme = createMuiTheme({
    palette: {
      mode:  "dark",
      primary: {
        main: "#FF007A",
        light:"#FF007A",
        dark:"#FF007A"
      }
    },
  });
  return (
    <>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
       <Routes>
         {/* <Route path="/" element={<Home />} /> */}
         <Route path="/" element={<IndexPage />} />
         <Route path="/login" element={<Login/>}></Route>
         <Route path="/signup" element={<Signup />} />
         <Route path="/dashboard" element={<Dashboard mode={mode} setMode={handleModeChange}/>}/>
         <Route path='entries/:id' element={<EntryDetail/>}/>
         
         {/* <Route path="/forgot-password" element={<ForgotPassword />} />
         <Route path="/change-password" element={<ChangePassword />} /> */}
         {/* Add more routes as needed */}
       </Routes>
       </ThemeProvider>
    </>
  );
}

export default App;
