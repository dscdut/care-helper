import { User } from './users.type'
import { SuccessResponse } from './utils.type'
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

export type RefreshTokenResponse = SuccessResponse<{ access_token: string }>

export type AuthSlide = {
  id: number
  img: string
}

export type PoliciesOption = {
  id: number
  title: string
  to: string
}

export type LoginResponse = {
  user: User
  accessToken: string
  refreshToken: string
}

export type LoginReqBody = {
  email: string
  password: string
}

export type AuthErrorResponse = {
  message: string
  code: string
  status: number
  detail?: {
    type: string
    message: string
  }[]
}
