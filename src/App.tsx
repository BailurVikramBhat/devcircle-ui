import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard/:userId" element={<DashboardPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
