import { useRoutes, Navigate } from "react-router-dom";

import Login from "../views/login";


function ProtectedRouter() {
  const routes = [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "*",
      redirect: "/",
      element: <Navigate to="/login" replace />,
    },
  ];

  return useRoutes(routes);
}

export default ProtectedRouter;
