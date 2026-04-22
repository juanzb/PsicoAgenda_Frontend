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
import { RoleGuard } from "../../components/shared/RoleGuard";
import { PATHS } from "./paths";

export const routesApp = createBrowserRouter([
  // RUTAS PÚBLICAS (Accesibles por todos)
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

  // PORTAL ADMINISTRADOR (Protegido: Solo ADMIN)
  {
    path: PATHS.ADMIN.ROOT,
    element: (
      <RoleGuard allowedRoles={["ADMIN"]}>
        <AdminLayout />
      </RoleGuard>
    ),
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

  // PORTAL DOCTOR (Protegido: Solo DOCTOR)
  {
    path: PATHS.DOCTOR.ROOT,
    element: (
      <RoleGuard allowedRoles={["DOCTOR"]}>
        <AdminLayout />
      </RoleGuard>
    ),
    children: [
      {
        index: true,
        path: PATHS.DOCTOR.DASHBOARD,
        Component: DashboardPage,
      },
      {
        path: PATHS.DOCTOR.MY_CALENDAR,
        Component: CalendarPage,
      },
      {
        path: PATHS.DOCTOR.MY_PATIENTS,
        Component: PatientsPage,
      },
      {
        path: PATHS.DOCTOR.PATIENT_DETAIL,
        Component: PatientDataPage,
      },
      {
        path: PATHS.DOCTOR.APPOINTMENTS,
        Component: AppointmentsPage,
      },
      {
        path: PATHS.DOCTOR.MY_PROFILE,
        Component: DoctorDataPage,
      },
    ],
  },

  // PORTAL PACIENTE (Protegido: Solo PACIENTE)
  {
    path: PATHS.PATIENT.ROOT,
    element: (
      <RoleGuard allowedRoles={["PACIENTE"]}>
        <AdminLayout />
      </RoleGuard>
    ),
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

  // 404
  {
    path: "*",
    Component: NotFoundPage,
  },
]);
