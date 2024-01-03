import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import EntryDetail from "./pages/Journal/entryDetail";
import { IndexPage } from "./pages/Index";
import Signup from "./pages/Auth/Signup";
import { useState } from "react";
import { useMediaQuery } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiTheme from "./MuiTheme";
import Entries from "./pages/entries";
import CreateEntries from "./pages/Journal/CreateEntries";

function App() {
  const preferedSettings = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState(preferedSettings);
  const handleModeChange = () => {
    // console.log(mode)
    setMode((prev) => !prev);
  };

  return (
    <>
      <ThemeProvider theme={MuiTheme(mode)}>
        <CssBaseline />
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<IndexPage />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/route" element={<Entries />} />
          <Route
            path="/dashboard"
            element={<Dashboard mode={mode} setMode={handleModeChange} />}
          />
          <Route path="entries/:id" element={<EntryDetail />} />
          <Route path="/createEntries" element={<CreateEntries />} />

          {/* <Route path="/forgot-password" element={<ForgotPassword />} />
         <Route path="/change-password" element={<ChangePassword />} /> */}
          {/* Add more routes as needed */}
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
