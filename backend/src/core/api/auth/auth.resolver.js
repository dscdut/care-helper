import { RegisterInterceptor } from 'core/modules/auth/interceptor/register.interceptor';
import {
    PhoneLoginInterceptor,
    EmailLoginInterceptor,
} from 'core/modules/auth';
import { Module } from 'packages/handler/Module';
import { AuthController } from './auth.controller';

export const AuthResolver = Module.builder()
    .addPrefix({
        prefixPath: '/auth',
        tag: 'auth',
        module: 'AuthModule',
    })
    .register([
        {
            route: '/email',
            method: 'post',
            interceptors: [EmailLoginInterceptor],
            body: 'EmailLoginDto',
            controller: AuthController.emailLogin,
        },
        {
            route: '/phone',
            method: 'post',
            interceptors: [PhoneLoginInterceptor],
            body: 'PhoneLoginDto',
            controller: AuthController.phoneLogin,
        },
        {
            route: '/register',
            method: 'post',
            interceptors: [RegisterInterceptor],
            body: 'RegisterDto',
            controller: AuthController.register,
        },
    ]);
