/* eslint-disable @typescript-eslint/no-explicit-any */
import DashboardLayout from "@/layout/dashboard-layout";
import ProtectedRoute from "@/components/ProtectedRoute";
import PrivateRoute from "@/components/PrivateRoute";
import AdminAnalytics from "@/pages/admin/analytics";
import GenreVideoPage from "@/pages/genre-videos";
import { Routes, Route } from "react-router-dom";
import HomeLayout from "@/layout//home-layout";
import AllPlayers from "@/pages/admin/players";
import AllVideos from "@/pages/admin/videos";
import AllCoach from "@/pages/admin/coaches";
import AllAdmin from "@/pages/admin/admins";
import SingleVideoPage from "@/pages/video";
import RegisterPage from "@/pages/register";
import ProfilePage from "@/pages/profile";
import HistoryPage from "@/pages/history";
import NotFound from "@/pages/not-found";
import LoginPage from "@/pages/login";
import HomePage from "@/pages/home";
import AllGenres from "@/pages/admin/genres";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/videos/:slug" element={<SingleVideoPage />} />
        <Route path="/videos/genre/:slug" element={<GenreVideoPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<PrivateRoute permission={["player"]} />}>
            <Route path="/playlist" element={<HistoryPage />} />
          </Route>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<PrivateRoute permission={["admin", "coach"]} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<AdminAnalytics />} />
            <Route path="/dashboard/video" element={<AllVideos />} />
            <Route path="/dashboard/player" element={<AllPlayers />} />
            <Route path="/dashboard/genre" element={<AllGenres />} />

            <Route element={<PrivateRoute permission={["admin"]} />}>
              <Route path="/dashboard/coach" element={<AllCoach />} />
              <Route path="/dashboard/admin/" element={<AllAdmin />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
