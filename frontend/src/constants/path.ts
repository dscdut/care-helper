export const path = {
  home: '/',
  auth: '/auth',
  login: '/auth/login',
  register: '/auth/register',
  patients: '/patients',
  patientDetail: '/patients/:patientId',
  patientDetailExamination: '/patients/:patientId/medical-records/:examinationId',
  schedules: '/schedules',
  surveys: '/surveys',
  personals: '/personals'
} as const
