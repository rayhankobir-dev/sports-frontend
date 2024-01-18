import { Routes, Route } from "react-router-dom";
import AboutPage from "./pages/about";
import HomePage from "./pages/home";
import RegisterPager from "./pages/register";
import LoginPage from "./pages/login";
import Dashboard from "./admin/pages/dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPager />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
