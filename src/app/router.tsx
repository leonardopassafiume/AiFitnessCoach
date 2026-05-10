import { createBrowserRouter, Navigate } from "react-router-dom";
import { ActivityDetailPage } from "../pages/activities/ActivityDetailPage";
import { ActivitiesPage } from "../pages/activities/ActivitiesPage";
import { CallbackPage } from "../pages/auth/CallbackPage";
import { LoginPage } from "../pages/auth/LoginPage";
import { CoachPage } from "../pages/coach/CoachPage";
import { DashboardPage } from "../pages/dashboard/DashboardPage";
import { MealsPage } from "../pages/meals/MealsPage";
import { Layout } from "../shared/components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "activities", element: <ActivitiesPage /> },
      { path: "activities/:activityId", element: <ActivityDetailPage /> },
      { path: "meals", element: <MealsPage /> },
      { path: "coach", element: <CoachPage /> },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/auth/callback", element: <CallbackPage /> },
]);
