// src/router.jsx
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound"; 

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // Shared layout with Navbar
    children: [
      { path: "", element: <Home /> }, // Home/Tool page
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
