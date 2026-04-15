import { createBrowserRouter, Outlet } from "react-router";
import { HomePage } from "../../pages/home/home";
import { LoginPage } from "../../pages/login/login";
import { DashboardPage } from "../../pages/admin/dashboard/dashboard";
import { DoctorsPage } from "../../pages/admin/doctors/doctors";
import { ClientsPage } from "../../pages/admin/clients/clients";

export const routesApp = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "login",
    Component: LoginPage,
  },
  {
    path: "register",
    Component: () => <div>Register</div>,
  },
  {
    path: "admin",
    element: (
      <>
        <h1 className="text-blue-300">Admin Layout</h1>
        <Outlet />
      </>
    ),
    children: [
      {
        index: true,
        path: "dashboard",
        Component: DashboardPage,
      },
      {
        path: "doctors",
        Component: DoctorsPage,
      },
      {
        path: "clients",
        Component: ClientsPage,
      },
    ],
  },
  {
    path: "*",
    Component: () => <div>404</div>,
  },
]);
