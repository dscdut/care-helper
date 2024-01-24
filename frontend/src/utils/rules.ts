import { EMAIL_MESSAGES, PASSWORD_MESSAGES } from 'src/constants/messages'
import * as yup from 'yup'

export const schema = yup.object({
  email: yup.string().required(EMAIL_MESSAGES.required).email(EMAIL_MESSAGES.isEmail),
  password: yup.string().required(PASSWORD_MESSAGES.required)
})

export type Schema = yup.InferType<typeof schema>
