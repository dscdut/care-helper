import { CONFIRM_PASSWORD_MESSAGES, EMAIL_MESSAGES, PASSWORD_MESSAGES } from 'src/constants/messages'
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

export type AuthSchema = yup.InferType<typeof authSchema>
