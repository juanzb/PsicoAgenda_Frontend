import { createBrowserRouter } from "react-router";
import { HomePage } from "../../pages/landing/home/Home";
import { LoginPage } from "../../pages/auth/login/Login";
import { DashboardPage } from "../../pages/admin/dashboard/Dashboard";
import { DoctorsPage } from "../../pages/admin/doctors/Doctors";
import { PatientsPage } from "../../pages/admin/patients/Patients";
import { AppointmentsPage } from "../../pages/admin/appointments/Appointments";
import { NotFoundPage } from "../../pages/not-found/NotFount";
import { RegistrePage } from "../../pages/auth/register/Register";
import { AdminLayout } from "../../pages/admin/AdminLayout";
import { PATHS } from "./paths";

export const routesApp = createBrowserRouter([
  {
    path: PATHS.HOME,
    Component: HomePage,
  },
  {
    path: PATHS.LOGIN,
    Component: LoginPage,
  },
  {
    path: PATHS.REGISTER,
    Component: RegistrePage,
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
        path: PATHS.ADMIN.PATIENTS,
        Component: PatientsPage,
      },
      {
        path: PATHS.ADMIN.APPOINTMENTS,
        Component: AppointmentsPage,
      },
    ],
  },
  {
    path: "*",
    Component: NotFoundPage,
  },
]);
