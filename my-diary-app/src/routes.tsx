// src/routes.tsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Entries from './pages/entries';
import EntryDetail from './pages/entryDetail';
import App from './App';
// import ForgotPassword from './pages/ForgotPassword';
// import ChangePassword from './pages/ChangePassword';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/app" element={<App />} />
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register />} />
        <Route path="/entries" element={<Entries/>}/>
        <Route path='entries/:id' element={<EntryDetail/>}/>
        {/* <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/change-password" element={<ChangePassword />} /> */}
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
