import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './assets/pages/Home';
import PhaseOne from './assets/pages/PhaseOne';
import PhaseTwo from './assets/pages/PhaseTwo';
import PhaseThree from './assets/pages/PhaseThree';
import { Header } from './assets/components/Header/Header';
import SubHeader from './assets/components/Header/SubHeader';
import Help from './assets/pages/Help';
import MyProfile from './assets/pages/MyProfile';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  const showHeadersRoutes = ['/phase-one', '/phase-two', '/phase-three', '/help', '/profile'];

  // Define an array of routes where the headers should be shown
  const showSubHeadersRoutes = ['/phase-one', '/phase-two', '/phase-three'];

  // Check if the current route is in the array of routes where headers should be shown
  const shouldShowHeaders = showHeadersRoutes.includes(location.pathname);

  const shouldShowSubHeaders = showSubHeadersRoutes.includes(location.pathname);


  return (
    <>
      {shouldShowHeaders && <Header />}
      {shouldShowSubHeaders && <SubHeader />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/phase-one' element={<PhaseOne />} />
        <Route path='/phase-two' element={<PhaseTwo />} />
        <Route path='/phase-three' element={<PhaseThree />} />
        <Route path='/help' element={<Help/>}/>
        <Route path='/profile' element={<MyProfile/>}/>
      </Routes>
    </>
  );
}

export default App;
