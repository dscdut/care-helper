import {
    DoctorLoginInterceptor,
    DoctorRegisterInterceptor,
    OtpVerifyInterceptor,
    PatientLoginInterceptor,
    PhoneInterceptor,
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
            route: '/doctor/profile',
            method: 'get',
            preAuthorization: true,
            controller: AuthController.getAuthDoctor,
            model: { $ref: 'DoctorDto' },
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
            route: '/patient/profile',
            method: 'get',
            preAuthorization: true,
            controller: AuthController.getAuthPatient,
            model: { $ref: 'PatientDto' },
        },
        {
            route: '/otp',
            method: 'post',
            body: 'PhoneDto',
            interceptors: [PhoneInterceptor],
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
