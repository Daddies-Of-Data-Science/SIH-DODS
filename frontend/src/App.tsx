import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import IprPage from './pages/IprPage';
import ResearchPage from './Pages/Research/Research'
import { NavbarDefault } from './components/Navbar';
import StartupPage from './Pages/Startup/Startup';
import InvestorPage from './Pages/Investor/Investor';
import HomePage from './Pages/Home/Home';
import Dashboard from './Pages/Research/ResearchDashboard';
import StartupDashboard from './Pages/Startup/Dashboard/Dashboard';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InvestorDashboard from './Pages/Investor/InvestorDashboard';
import IPR from "./Pages/IPR/IPR"
//comment for aryan raand on signal
function App() {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Router>
        <div className='md:fixed w-full z-10 md:mt-3'>
          <NavbarDefault/>
        </div>
        <div className='md:relative'>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/ipr" element={<IPR />} />
            <Route path="/research" element={<ResearchPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/startup" element={<StartupPage />} />
            <Route path="/startup/dashboard" element={<StartupDashboard />} />
            <Route path="/investor" element={<InvestorPage />} />
            <Route path="/investor/dashboard" element={<InvestorDashboard />} />
          </Routes>
        </div>
        
      </Router>
    </>
  );
}

export default App;
