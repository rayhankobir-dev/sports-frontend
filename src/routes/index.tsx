/* eslint-disable @typescript-eslint/no-explicit-any */
import { Routes, Route } from "react-router-dom";
import AboutPage from "@/pages/about";
import HomePage from "@/pages/home";
import RegisterPage from "@/pages/register";
import LoginPage from "@/pages/login";
import VideoPage from "@/pages/videos";
import HomeLayout from "@/layout//home-layout";
import DashboardLayout from "@/layout/dashboard-layout";
import SingleVideoPage from "@/pages/video";
import ProtectedRoute from "@/components/ProtectedRoute";
import GenreVideoPage from "@/pages/genre-videos";
import ProfilePage from "@/pages/profile";
import HistoryPage from "@/pages/history";
import PublishVideo from "@/admin/pages/add-video";
import AllPlayers from "@/admin/pages/players";
import AllVideos from "@/admin/pages/videos";
import AddPlayer from "@/admin/pages/add-player";
import AddAdmin from "@/admin/pages/add-admin";
import AddCoach from "@/admin/pages/add-coach";
import AllAdmin from "@/admin/pages/admins";
import AllCoach from "@/admin/pages/coaches";
import PrivateRoute from "@/components/PrivateRoute";
import AdminAnalytics from "@/admin/pages/analytics";
import NotFound from "@/pages/not-found";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/videos" element={<VideoPage />} />
        <Route path="/videos/:slug" element={<SingleVideoPage />} />
        <Route path="/videos/genre/:slug" element={<GenreVideoPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/playlist" element={<HistoryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<PrivateRoute permission={["admin", "coach"]} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<AdminAnalytics />} />
            <Route path="/dashboard/video" element={<AllVideos />} />
            <Route path="/dashboard/video/publish" element={<PublishVideo />} />
            <Route path="/dashboard/video/:slug" element={<PublishVideo />} />

            <Route path="/dashboard/player/" element={<AllPlayers />} />
            <Route path="/dashboard/player/add" element={<AddPlayer />} />
            <Route path="/dashboard/player/edit/:id" element={<AllPlayers />} />

            <Route element={<PrivateRoute permission={["admin"]} />}>
              <Route path="/dashboard/coach/" element={<AllCoach />} />
              <Route path="/dashboard/coach/add" element={<AddCoach />} />
              <Route path="/dashboard/coach/edit/:id" element={<AddAdmin />} />
              <Route path="/dashboard/admin/" element={<AllAdmin />} />
              <Route path="/dashboard/admin/add" element={<AddAdmin />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
