import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Entries from "./pages/entries";
import EntryDetail from "./pages/entryDetail";
import { IndexPage } from "./pages/Index";
import Signup from "./pages/Auth/Signup";

function App() {
  return (
    <>
    
       <Routes>
         {/* <Route path="/" element={<Home />} /> */}
         <Route path="/" element={<IndexPage />} />
         <Route path="/login" element={<Login/>}></Route>
         <Route path="/signup" element={<Signup />} />
         <Route path="/entries" element={<Entries/>}/>
         <Route path='entries/:id' element={<EntryDetail/>}/>
         
         {/* <Route path="/forgot-password" element={<ForgotPassword />} />
         <Route path="/change-password" element={<ChangePassword />} /> */}
         {/* Add more routes as needed */}
       </Routes>
    </>
  );
}

export default App;
