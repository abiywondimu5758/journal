import "./App.css";
import { tw } from "typewind";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Entries from "./pages/entries";
import EntryDetail from "./pages/entryDetail";
import { IndexPage } from "./pages/Index";

function App() {
  return (
    <>
    
       <Routes>
         {/* <Route path="/" element={<Home />} /> */}
         <Route path="/" element={<IndexPage />} />
         <Route path="/login" element={<Login/>}></Route>
         <Route path="/register" element={<Register />} />
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
