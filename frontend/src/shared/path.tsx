import Home from 'src/pages/home/Home'
import Login from 'src/pages/login/Login'
import Patient from 'src/pages/patient/Patient'
import Personal from 'src/pages/personal/Personal'
import Register from 'src/pages/register/Register'
import AppointmentSchedule from 'src/pages/schedule/Schedule'
import MedicalSurvey from 'src/pages/survey/Survey'
import PatientDetails from 'src/pages/patient/pages/patient-details/PatientDetail'
import { RouteObject } from 'react-router-dom'
import { path } from 'src/constants/path'
import SurveyDetail from 'src/pages/survey/pages/SurveyDetail'
import { Examination, ExaminationListRecords } from 'src/pages/patient/components'

// private routes (path, component)
export const AUTH_ROUTER: RouteObject[] = [
  {
    path: path.login,
    element: <Login />
  },
  {
    path: path.register,
    element: <Register />
  }
]

export const PRIVATE_ROUTER: RouteObject[] = [
  {
    path: path.home,
    element: <Home />
  },
  {
    path: path.patients,
    element: <Patient />
  },
  {
    path: path.patientDetail,
    element: <PatientDetails />,
    children: [
      {
        path: path.patientDetail,
        element: <ExaminationListRecords />
      },
      {
        path: path.patientDetailExamination,
        element: <Examination />
      }
    ]
  },
  {
    path: path.schedules,
    element: <AppointmentSchedule />
  },
  {
    path: path.surveys,
    element: <MedicalSurvey />
  },
  {
    path: path.surveyDetail,
    element: <SurveyDetail />
  },
  {
    path: path.personals,
    element: <Personal />
  }
]
