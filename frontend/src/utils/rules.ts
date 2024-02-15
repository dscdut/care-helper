import { PRESCRIPTION_ROW_NAME } from 'src/constants/common'
import {
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
          .required(PRESCRIPTION_MESSAGE.QUANTITY.required),
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

export type AuthSchema = yup.InferType<typeof authSchema>
export type PrescriptionSchema = yup.InferType<typeof prescriptionSchema>
export type ExaminationSchema = yup.InferType<typeof examinationSchema>
export type SearchSchema = yup.InferType<typeof searchSchema>
