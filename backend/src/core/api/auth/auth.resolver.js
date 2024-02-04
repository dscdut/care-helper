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
            model: { $ref: 'DoctorLoginResponseDto' },
        },
        {
            route: '/register/doctor',
            method: 'post',
            interceptors: [DoctorRegisterInterceptor],
            body: 'DoctorRegisterDto',
            controller: AuthController.doctorRegister,
            model: { $ref: 'MessageDto' },
        },
        {
            route: '/patient',
            method: 'post',
            interceptors: [PatientLoginInterceptor],
            body: 'PatientLoginDto',
            controller: AuthController.patientLogin,
            model: { $ref: 'PatientLoginResponseDto' },
        },
        {
            route: '/otp',
            method: 'post',
            body: 'PhoneDto',
            controller: AuthController.phoneRegister,
            model: { $ref: 'PhoneUnverifiedRegisterResponseDto' },
        },
        {
            route: '/verify-otp',
            method: 'post',
            body: 'OtpVerifyDto',
            interceptors: [OtpVerifyInterceptor],
            controller: AuthController.verifyOTP,
            model: { $ref: 'MessageDto' },
        },
        {
            route: '/register/patient',
            method: 'post',
            interceptors: [PhoneVerifiedRegisterInterceptor],
            body: 'PhoneVerifiedRegisterDto',
            controller: AuthController.patientRegister,
            model: { $ref: 'PatientLoginResponseDto' },
        },
    ]);
