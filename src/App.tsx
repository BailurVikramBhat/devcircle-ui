import { Route, BrowserRouter, Routes } from 'react-router-dom';
import './App.css';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import Settings from './pages/Settings';
import { AuthProtector } from './pages/route-protectors/authProtector';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route
            path='/:userId/*'
            element={
              <AuthProtector>
                <LandingPage />
              </AuthProtector>
            }
          />
          <Route
            path='/:userId/settings/*'
            element={
              <AuthProtector>
                <Settings />
              </AuthProtector>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
