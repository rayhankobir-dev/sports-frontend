/* eslint-disable @typescript-eslint/no-explicit-any */
import AdminAnalytics from "../components/admin-analytics";
import CoachAnalytics from "../components/coach-analytic";
import useAuth from "@/hooks/useAuth";

export default function Analytics() {
  const { auth }: any = useAuth();
  if (auth.user.role.role === "admin") return <AdminAnalytics />;
  if (auth.user.role.role === "coach") return <CoachAnalytics />;
}
