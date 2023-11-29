import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './assets/pages/Home';
import PhaseOne from './assets/pages/PhaseOne';
import PhaseTwo from './assets/pages/PhaseTwo';
import PhaseThree from './assets/pages/PhaseThree';
import { Header } from './assets/components/Header/Header';
import SubHeader from './assets/components/Header/SubHeader';

function App() {
  // Wrap your entire App component with Router
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  // Define an array of routes where the headers should be shown
  const showHeadersRoutes = ['/phase-one', '/phase-two', '/phase-three'];

  // Check if the current route is in the array of routes where headers should be shown
  const shouldShowHeaders = showHeadersRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowHeaders && <Header />}
      {shouldShowHeaders && <SubHeader />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/phase-one' element={<PhaseOne />} />
        <Route path='/phase-two' element={<PhaseTwo />} />
        <Route path='/phase-three' element={<PhaseThree />} />
      </Routes>
    </>
  );
}

export default App;
