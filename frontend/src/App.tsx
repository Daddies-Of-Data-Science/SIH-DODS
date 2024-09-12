import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import IprPage from './pages/IprPage';
import ResearchPage from '../../frontend/src/Pages/Research/Research'
import { NavbarDefault } from './components/Navbar';
import StartupPage from '../../frontend/src/Pages/Startup/Startup';
import InvestorPage from '../../frontend/src/Pages/Investor/Investor';
import HomePage from '../../frontend/src/Pages/Home/Home';
import Dashboard from './Pages/Research/ResearchDashboard';
import StartupDashboard from './Pages/Startup/Dashboard/Dashboard';

function App() {
  return (
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
          <Route path="/startup/dashboard" element={< StartupDashboard/>} />
          <Route path="/investor" element={<InvestorPage />} /> 
        </Routes>
      </div>
      
    </Router>
  );
}

export default App;
