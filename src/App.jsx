import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import CashPayment from "./pages/CashPayment";
import DigitalPayment from "./pages/DigitalPayment";
import OutletsPage from "./pages/Outlets";
import Users from "./pages/Users";
import Neccrate from './pages/Neccrate';
import Dailysales from './pages/Dailysales';
import Distributor from './pages/Distributor';

export default function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cash-payment" element={<CashPayment />} />
          <Route path="/digital-payment" element={<DigitalPayment />} />
          <Route path="/outlets" element={<OutletsPage />} />
          <Route path="/users" element={<Users />} />
          <Route path='/neccrate' element={<Neccrate/>}/>
          <Route path='/dailysales' element={<Dailysales/>}/>
          <Route path='/distribution' element={<Distributor/>}/>
          
        </Routes>
    
      
    </BrowserRouter>
  );
}
