import { User } from 'src/types/users.type'
import { SuccessResponse } from 'src/types/utils.type'
export interface SelectOption {
  label: string
  value: number
}

export type AuthResponse = SuccessResponse<{
  access_token: string
  refresh_token: string
  expires_refresh_token: number
  expires: number
}>

export type RefreshTokenResponse = SuccessResponse<{ accessToken: string }>

export type LoginResponse = {
  user: User
  accessToken: string
  refreshToken: string
}
export type RegisterResponse = {
  message: string
}

export type LoginReqBody = {
  email: string
  password: string
}

export type RegisterReqBody = LoginReqBody

export type AuthErrorResponse = {
  message: string
  code: string
  status: number
  detail?: {
    type: string
    message: string
  }[]
}
