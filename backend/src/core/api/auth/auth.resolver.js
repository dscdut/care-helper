import {
    PatientLoginInterceptor,
    DoctorLoginInterceptor,
    PatientRegisterInterceptor,
    DoctorRegisterInterceptor,
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
            route: '/doctor',
            method: 'post',
            interceptors: [DoctorLoginInterceptor],
            body: 'DoctorLoginDto',
            controller: AuthController.doctorLogin,
            model: 'DoctorLoginResponseDto',
        },
        {
            route: '/patient',
            method: 'post',
            interceptors: [PatientLoginInterceptor],
            body: 'PatientLoginDto',
            controller: AuthController.patientLogin,
            model: 'PatientLoginResponseDto',
        },
        {
            route: '/register/patient',
            method: 'post',
            interceptors: [PatientRegisterInterceptor],
            body: 'PatientRegisterDto',
            controller: AuthController.patientRegister,
            model: 'RegisterResponseDto',
        },
        {
            route: '/register/doctor',
            method: 'post',
            interceptors: [DoctorRegisterInterceptor],
            body: 'DoctorRegisterDto',
            controller: AuthController.doctorRegister,
            model: 'RegisterResponseDto',
        },
    ]);
