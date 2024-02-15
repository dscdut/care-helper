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
    required: 'Quantity is required.',
    isNumber: 'Quantity must be a number'
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

export const MEDICAL_TESTS_MESSAGE = {
  PARAMETER: {
    required: 'Parameter is required.'
  },
  INDEX: {
    required: 'Index is required.'
  },
  UNIT: {
    required: 'Unit is required.'
  }
} as const
export const DIAGNOSE_MESSAGE = {
  DETAILS: {
    required: 'Details is required.'
  },
  CONCLUDE: {
    required: 'Conclude is required.'
  }
} as const
export const HOSPITAL_MESSAGE = {
  required: 'Hospital is required.'
} as const
export const SEARCH_MESSAGE = {
  KEYWORD: {
    required: 'Keyword is required.'
  }
} as const
