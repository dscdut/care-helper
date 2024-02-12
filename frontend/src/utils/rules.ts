import { PRESCRIPTION_ROW_NAME } from 'src/constants/common'
import {
  CONFIRM_PASSWORD_MESSAGES,
  EMAIL_MESSAGES,
  PASSWORD_MESSAGES,
  PRESCRIPTION_MESSAGE
} from 'src/constants/messages'
import * as yup from 'yup'

export const authSchema = yup.object({
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
        quantity: yup.string().required(PRESCRIPTION_MESSAGE.QUANTITY.required),
        amount: yup.string().required(PRESCRIPTION_MESSAGE.AMOUNT.required),
        usage: yup.string().required(PRESCRIPTION_MESSAGE.USAGE.required)
      })
    )
    .required(),
  date: yup.object({ startDate: yup.string(), endDate: yup.string() })
})

export type AuthSchema = yup.InferType<typeof authSchema>
export type PrescriptionSchema = yup.InferType<typeof prescriptionSchema>
