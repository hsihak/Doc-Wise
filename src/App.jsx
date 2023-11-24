import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './assets/pages/Home'
import PhaseOne from './assets/pages/PhaseOne'


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/phase-one' element={<PhaseOne/>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
