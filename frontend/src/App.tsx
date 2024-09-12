import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import IprPage from './pages/IprPage';
import ResearchPage from '../../frontend/src/pages/Research/Research'
import { NavbarDefault } from './components/Navbar';
import StartupPage from '../../frontend/src/pages/Startup/Startup';
import InvestorPage from '../../frontend/src/pages/Investor/Investor';
import HomePage from '../../frontend/src/pages/Home/Home';
import Dashboard from './pages/Research/ResearchDashboard';
import StartupDashboard from './pages/Startup/Dashboard/Dashboard';
import InvestorDasboard from './pages/Investor/InvestorDasboard';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
            {/* <Route path="/ipr" element={<IprPage />} /> */}
            <Route path="/research" element={<ResearchPage />} />
            <Route path="research/dashboard" element={<Dashboard/>} />
            <Route path="/startup" element={<StartupPage />} />
            <Route path="/startup/dashboard" element={<StartupDashboard />} />
            <Route path="/investor" element={<InvestorPage />} />
            <Route path="/investor/dashboard" element={<InvestorDasboard />} />
          </Routes>
        </div>
        
      </Router>
    </>
  );
}

export default App;
