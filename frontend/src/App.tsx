import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/Home/Home';
// import IprPage from './pages/IprPage';
import ResearchPage from './pages/Research/Research'
import { NavbarDefault } from './components/Navbar';
import StartupPage from './pages/Startup/Startup';
import InvestorPage from './pages/Investor/Investor';

function App() {
  return (
    <Router>
      <NavbarDefault/>
      <Routes>
        <Route path="/" element={<HomePage />} />
         {/* <Route path="/ipr" element={<IprPage />} /> */}
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/startup" element={<StartupPage />} />
        <Route path="/investor" element={<InvestorPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
