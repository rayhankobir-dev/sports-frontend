import { Routes, Route } from "react-router-dom";
import AboutPage from "./pages/about";
import HomePage from "./pages/home";
import RegisterPager from "./pages/register";
import LoginPage from "./pages/login";
import Dashboard from "./admin/pages/dashboard";
import VideoPage from "./pages/videos";
import AddUserPage from "./admin/pages/add-user";
import AddCoachPage from "./admin/pages/add-coach";
import AddVideoPage from "./admin/pages/add-video";
import UserProfilePage from "./admin/pages/profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPager />} />
      <Route path="/videos" element={<VideoPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/player" element={<AddUserPage />} />
      <Route path="/dashboard/coach" element={<AddCoachPage />} />
      <Route path="/dashboard/video" element={<AddVideoPage />} />
      <Route path="/dashboard/profile" element={<UserProfilePage />} />
    </Routes>
  );
}

export default App;
