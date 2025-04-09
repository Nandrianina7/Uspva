import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import SigninLAyout from './Components/SigninLayout';
import Agenda from './Components/Agenda';

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: '20px'}}>
        <Routes>
          <Route path='/' element={ <Home/> }></Route>
          <Route path='/SigninLayout' element={ <SigninLAyout/> }></Route>
          <Route path='/Agenda' element={<Agenda />}></Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App;
