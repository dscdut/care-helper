export const EMAIL_MESSAGES = {
  required: 'Email is required.',
  isEmail: 'Email is invalid.'
} as const

export const PASSWORD_MESSAGES = {
  required: 'Password is required.',
  minLength: 'Password must have at least 8 characters.',
  maxLength: 'Password has maximum 8 characters.'
} as const

export const CONFIRM_PASSWORD_MESSAGES = {
  required: 'Confirm password is required.',
  isMatch: 'Confirm password must be match.'
} as const

export const PHONE_MESSAGE = {
  required: 'Phone is required.',
  isPhone: 'Phone is invalid.'
} as const

export const FIRST_NAME_MESSAGE = {
  required: 'First name is required.'
} as const

export const LAST_NAME_MESSAGE = {
  required: 'Last name is required.'
} as const

export const PRESCRIPTION_MESSAGE = {
  MEDICINE_NAME: {
    required: 'Medicine name is required.'
  },
  MEDICINE_TYPE: {
    required: 'Medicine form is required.'
  },
  QUANTITY: {
    required: 'Quantity is required.'
  },
  AMOUNT: {
    required: 'Amount is required.'
  },
  USAGE: {
    required: 'Usage is required.'
  },
  DATE: {
    required: 'Date is required.'
  }
} as const
