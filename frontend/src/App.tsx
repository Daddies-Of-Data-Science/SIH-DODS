import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './Pages/Home/Home';
// import IprPage from './pages/IprPage';
// import ResearchPage from './pages/ResearchPage';
// import StartupPage from './pages/StartupPage';
// import InvestorPage from './pages/InvestorPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/ipr" element={<IprPage />} />
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/startup" element={<StartupPage />} />
        <Route path="/investor" element={<InvestorPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
