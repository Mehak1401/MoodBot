import React from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";

import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Header from "./components/header";
import Home from "./components/home";
import { AuthProvider } from "./contexts/authContext";

function AppRoutes() {
  const routesArray = [
    {
      path: "*",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: <Home />,
    },
  ];
  return useRoutes(routesArray);
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <div className="w-full h-screen flex flex-col">
          <AppRoutes />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
