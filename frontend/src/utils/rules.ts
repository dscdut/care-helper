import { EMAIL_MESSAGES, PASSWORD_MESSAGES } from 'src/constants/messages'
import { PASSWORD } from 'src/shared/constant'
import * as yup from 'yup'

export const schema = yup.object({
  email: yup.string().required(EMAIL_MESSAGES.required).email(EMAIL_MESSAGES.isEmail),
  password: yup
    .string()
    .required(PASSWORD_MESSAGES.required)
    .min(PASSWORD.min, PASSWORD_MESSAGES.minLength)
    .max(PASSWORD.max, PASSWORD_MESSAGES.maxLength)
})

export type Schema = yup.InferType<typeof schema>
