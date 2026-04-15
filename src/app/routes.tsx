import { createBrowserRouter } from "react-router";
import { HomePage } from "../pages/home/home";
import { LoginPage } from "../pages/auth/login/login";
import { DashboardPage } from "../pages/admin/dashboard/dashboard";
import { DoctorsPage } from "../pages/admin/doctors/doctors";
import { ClientsPage } from "../pages/admin/clients/clients";
import { NotFoundPage } from "../pages/not-found/NotFount";
import { RegistrePage } from "../pages/auth/register/register";
import { AdminLayout } from "../pages/admin/AdminLayout";

export const routesApp = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "auth",
    children: [
      { path: "login", Component: LoginPage },
      { path: "register", Component: RegistrePage },
    ],
  },
  {
    path: "admin",
    Component: AdminLayout,
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
    Component: NotFoundPage,
  },
]);
