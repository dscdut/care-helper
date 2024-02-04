import {
    DoctorLoginInterceptor,
    DoctorRegisterInterceptor,
    OtpVerifyInterceptor,
    PatientLoginInterceptor,
    PhoneVerifiedRegisterInterceptor,
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
            route: '/register/doctor',
            method: 'post',
            interceptors: [DoctorRegisterInterceptor],
            body: 'DoctorRegisterDto',
            controller: AuthController.doctorRegister,
            model: 'MessageDto',
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
            route: '/otp',
            method: 'post',
            body: 'PhoneDto',
            controller: AuthController.phoneRegister,
            model: 'PhoneUnverifiedRegisterResponseDto',
        },
        {
            route: '/verify-otp',
            method: 'post',
            body: 'OtpVerifyDto',
            interceptors: [OtpVerifyInterceptor],
            controller: AuthController.verifyOTP,
            model: 'MessageDto',
        },
        {
            route: '/register/patient',
            method: 'post',
            interceptors: [PhoneVerifiedRegisterInterceptor],
            body: 'PhoneVerifiedRegisterDto',
            controller: AuthController.patientRegister,
            model: 'PatientLoginResponseDto',
        },
    ]);
