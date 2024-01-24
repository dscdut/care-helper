import { LoginReqBody, AuthResponse, LoginResponse } from './../types/auth.type'

import http from 'src/utils/http'

export const URL_LOGIN = 'auth/email'
export const URL_REGISTER = 'register'
export const URL_LOGOUT = 'logout'
export const URL_REFRESH_TOKEN = 'refresh-access-token'

const authApi = {
  registerAccount(body: { email: string; password: string }) {
    return http.post<AuthResponse>(URL_REGISTER, body)
  },
  login(body: LoginReqBody) {
    return http.post<LoginResponse>(URL_LOGIN, body)
  },
  logout() {
    return http.post(URL_LOGOUT)
  }
}

export default authApi
