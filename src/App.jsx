import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './assets/pages/Home';
import PhaseOne from './assets/pages/PhaseOne';
import PhaseTwo from './assets/pages/PhaseTwo'; // Removed curly braces
import PhaseThree from './assets/pages/PhaseThree'; // Removed curly braces
import { Header } from './assets/components/Header/Header';
import SubHeader from './assets/components/Header/SubHeader';


function App() {
  return (
    <>
      <Router>
        <Header/>
        <SubHeader/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/phase-one' element={<PhaseOne />} />
          <Route path='/phase-two' element={<PhaseTwo />} />
          <Route path='/phase-three' element={<PhaseThree />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
