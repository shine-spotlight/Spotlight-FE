import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "@components/ProtectedRoute";
import { Layout } from "@components/Layout";
import {
  Home,
  Spaces,
  Artists,
  Proposals,
  Announcements,
  Mypage,
  Login,
} from "@pages";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "spaces", element: <Spaces /> },
      { path: "artists", element: <Artists /> },
      { path: "proposals", element: <Proposals /> },
      { path: "announcements", element: <Announcements /> },
      { path: "mypage", element: <Mypage /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);
