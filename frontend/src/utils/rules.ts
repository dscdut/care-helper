import dayjs from 'dayjs'
import { PRESCRIPTION_ROW_NAME } from 'src/constants/common'
import {
  APPOINTMENT_SCHEDULE_MESSAGE,
  CONFIRM_PASSWORD_MESSAGES,
  DIAGNOSE_MESSAGE,
  EMAIL_MESSAGES,
  HOSPITAL_MESSAGE,
  MEDICAL_TESTS_MESSAGE,
  PASSWORD_MESSAGES,
  PRESCRIPTION_MESSAGE,
  SEARCH_MESSAGE
} from 'src/constants/messages'
import * as yup from 'yup'

export const authSchema = yup.object().shape({
  //TODO: need refactor
  email: yup.string().required(EMAIL_MESSAGES.required).email(EMAIL_MESSAGES.isEmail),
  password: yup.string().required(PASSWORD_MESSAGES.required),
  confirmPassword: yup
    .string()
    .required(CONFIRM_PASSWORD_MESSAGES.required)
    .oneOf([yup.ref('password')], CONFIRM_PASSWORD_MESSAGES.isMatch)
})
export const prescriptionSchema = yup.object().shape({
  [PRESCRIPTION_ROW_NAME]: yup
    .array()
    .of(
      yup.object().shape({
        medicineName: yup.string().required(PRESCRIPTION_MESSAGE.MEDICINE_NAME.required),
        medicineType: yup.string().required(PRESCRIPTION_MESSAGE.MEDICINE_TYPE.required),
        quantity: yup
          .number()
          .typeError(PRESCRIPTION_MESSAGE.QUANTITY.isNumber)
          .required(PRESCRIPTION_MESSAGE.QUANTITY.required)
          .test({
            message: PRESCRIPTION_MESSAGE.QUANTITY.min,
            test: (value: number, context: yup.TestContext<yup.AnyObject>) => {
              return value > 0
            }
          }),
        amount: yup.string().required(PRESCRIPTION_MESSAGE.AMOUNT.required),
        usage: yup.string().required(PRESCRIPTION_MESSAGE.USAGE.required)
      })
    )
    .required(),
  note: yup.string(),
  date: yup.object({ startDate: yup.string(), endDate: yup.string() })
})

const medicalTestSchema = yup.object().shape({
  parameter: yup.string().required(MEDICAL_TESTS_MESSAGE.PARAMETER.required),
  index: yup.string().required(MEDICAL_TESTS_MESSAGE.INDEX.required),
  unit: yup.string().required(MEDICAL_TESTS_MESSAGE.UNIT.required)
})

export const examinationSchema = yup.object().shape({
  birthMark: yup.array().of(medicalTestSchema).required(),
  bloodTest: yup.array().of(medicalTestSchema).required(),
  bloodFatTest: yup.array().of(medicalTestSchema).required(),
  diagnose: yup.object().shape({
    details: yup.string().required(DIAGNOSE_MESSAGE.DETAILS.required),
    conclude: yup.string().required(DIAGNOSE_MESSAGE.CONCLUDE.required),
    advice: yup.string()
  }),
  hospital: yup.number().required(HOSPITAL_MESSAGE.required),
  prescription: prescriptionSchema
})

export const searchSchema = yup.object().shape({
  keyword: yup.string().required(SEARCH_MESSAGE.KEYWORD.required)
})

function handleTestTime(this: yup.TestContext<yup.AnyObject>) {
  const { startTime, endTime, date } = this.parent as {
    startTime: string
    endTime: string
    date: string
  }
  if (!date) {
    return true
  }
  const start = dayjs(`${date} ${startTime}`, { format: 'DD-MM-YYYY HH:mm' })
  const end = dayjs(`${date} ${endTime}`, { format: 'DD-MM-YYYY HH:mm' })
  return start.isBefore(end)
}

export const appointmentScheduleSchema = yup.object().shape({
  name: yup.string().required(APPOINTMENT_SCHEDULE_MESSAGE.NAME.required),
  date: yup
    .string()
    .required(PRESCRIPTION_MESSAGE.DATE.required)
    .test({
      message: APPOINTMENT_SCHEDULE_MESSAGE.DATE.inValid,
      test: (value: string, context: yup.TestContext<yup.AnyObject>) => {
        const valueDate = dayjs(value)
        const currentDate = dayjs()
        return valueDate.isSame(currentDate, 'day') || valueDate.isAfter(currentDate)
      }
    }),
  startTime: yup.string().test({
    message: APPOINTMENT_SCHEDULE_MESSAGE.TIME.inValid,
    test: handleTestTime
  }),
  endTime: yup.string().test({
    message: APPOINTMENT_SCHEDULE_MESSAGE.TIME.inValid,
    test: handleTestTime
  }),
  location: yup.string().required(APPOINTMENT_SCHEDULE_MESSAGE.LOCATION.required),
  note: yup.string(),
  search: searchSchema.pick(['keyword']),
  patientName: yup.string(),
  id: yup.number()
})

export type AuthSchema = yup.InferType<typeof authSchema>
export type PrescriptionSchema = yup.InferType<typeof prescriptionSchema>
export type ExaminationSchema = yup.InferType<typeof examinationSchema>
export type SearchSchema = yup.InferType<typeof searchSchema>
export type AppointmentScheduleSchema = yup.InferType<typeof appointmentScheduleSchema>
