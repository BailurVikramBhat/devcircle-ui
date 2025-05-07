import { Route, BrowserRouter, Routes } from 'react-router-dom';
import './App.css';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import Settings from './pages/Settings';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/dashboard/*' element={<LandingPage />} />
          <Route path='/settings/*' element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
