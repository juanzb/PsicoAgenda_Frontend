import { createBrowserRouter } from "react-router";
import { HomePage } from "../../pages/landing/home/Home";
import { LoginPage } from "../../pages/login/Login";
import { DashboardPage } from "../../pages/admin/dashboard/Dashboard";
import { DoctorsPage } from "../../pages/admin/doctors/Doctors";
import { PatientsPage } from "../../pages/admin/patients/Patients";
import { AppointmentsPage } from "../../pages/admin/appointments/Appointments";
import { CalendarPage } from "../../pages/admin/calendar/Calendar";
import { PatientDataPage } from "../../pages/admin/patients/PatientData";
import { DoctorDataPage } from "../../pages/admin/doctors/DoctorData";
import { PatientDashboardPage } from "../../pages/patient/PatientDashboard";
import { PatientHistoryPage } from "../../pages/patient/PatientHistory";
import { PatientTasksPage } from "../../pages/patient/PatientTasks";
import { NotFoundPage } from "../../pages/not-found/NotFount";
import { RegistrePage } from "../../pages/register/Register";
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
        path: PATHS.ADMIN.DOCTOR_DATA,
        Component: DoctorDataPage,
      },
      {
        path: PATHS.ADMIN.PATIENTS,
        Component: PatientsPage,
      },
      {
        path: PATHS.ADMIN.PATIENT_DATA,
        Component: PatientDataPage,
      },
      {
        path: PATHS.ADMIN.APPOINTMENTS,
        Component: AppointmentsPage,
      },
      {
        path: PATHS.ADMIN.CALENDAR,
        Component: CalendarPage,
      },
    ],
  },
  {
    path: PATHS.PATIENT.ROOT,
    Component: AdminLayout,
    children: [
      {
        index: true,
        path: PATHS.PATIENT.DASHBOARD,
        Component: PatientDashboardPage,
      },
      {
        path: PATHS.PATIENT.HISTORY,
        Component: PatientHistoryPage,
      },
      {
        path: PATHS.PATIENT.TASKS,
        Component: PatientTasksPage,
      },
      {
        path: PATHS.PATIENT.APPOINTMENTS,
        Component: AppointmentsPage,
      },
    ],
  },
  {
    path: "*",
    Component: NotFoundPage,
  },
]);
