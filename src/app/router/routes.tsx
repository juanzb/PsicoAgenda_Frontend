import { createBrowserRouter } from "react-router";
import { HomePage } from "../../pages/home/home";
import { LoginPage } from "../../pages/auth/login/login";
import { DashboardPage } from "../../pages/admin/dashboard/dashboard";
import { DoctorsPage } from "../../pages/admin/doctors/doctors";
import { ClientsPage } from "../../pages/admin/clients/clients";
import { NotFoundPage } from "../../pages/not-found/NotFount";
import { RegistrePage } from "../../pages/auth/register/register";
import { AdminLayout } from "../../pages/admin/AdminLayout";
import { PATHS } from "./paths";

export const routesApp = createBrowserRouter([
  {
    path: PATHS.HOME,
    Component: HomePage,
  },
  {
    path: PATHS.AUTH.ROOT,
    children: [
      {
        path: PATHS.AUTH.LOGIN,
        Component: LoginPage,
      },
      {
        path: PATHS.AUTH.REGISTER,
        Component: RegistrePage,
      },
    ],
  },
  {
    path: PATHS.ADMIN.ROOT,
    Component: AdminLayout,
    children: [
      {
        index: true,
        path: PATHS.ADMIN.DASHBOARD,
        Component: DashboardPage,
      },
      {
        path: PATHS.ADMIN.DOCTORS,
        Component: DoctorsPage,
      },
      {
        path: PATHS.ADMIN.CLIENTS,
        Component: ClientsPage,
      },
      {
        path: PATHS.ADMIN.APPOINTMENTS,
        element: <div>Página de Citas (Próximamente)</div>,
      },
    ],
  },
  {
    path: "*",
    Component: NotFoundPage,
  },
]);
