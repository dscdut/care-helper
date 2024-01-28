import {
  CONFIRM_PASSWORD_MESSAGES,
  EMAIL_MESSAGES,
  FIRST_NAME_MESSAGE,
  LAST_NAME_MESSAGE,
  PASSWORD_MESSAGES,
  PHONE_MESSAGE
} from 'src/constants/messages'
import { PHONE_REGEX } from 'src/constants/common'
import * as yup from 'yup'

export const schema = yup.object({
  email: yup.string().required(EMAIL_MESSAGES.required).email(EMAIL_MESSAGES.isEmail),
  password: yup.string().required(PASSWORD_MESSAGES.required),
  confirmPassword: yup
    .string()
    .required(CONFIRM_PASSWORD_MESSAGES.required)
    .oneOf([yup.ref('password')], CONFIRM_PASSWORD_MESSAGES.isMatch),
  phone: yup.string().required(PHONE_MESSAGE.required).matches(PHONE_REGEX, PHONE_MESSAGE.isPhone),
  firstName: yup.string().required(FIRST_NAME_MESSAGE.required),
  lastName: yup.string().required(LAST_NAME_MESSAGE.required)
})

export type Schema = yup.InferType<typeof schema>
