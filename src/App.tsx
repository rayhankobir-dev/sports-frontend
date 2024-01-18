import { Routes, Route } from "react-router-dom";
import AboutPage from "./pages/about";
import HomePage from "./pages/home";
import RegisterPager from "./pages/register";
import LoginPage from "./pages/login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPager />} />
    </Routes>
  );
}

export default App;
