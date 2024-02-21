import { Module } from 'packages/handler/Module';
import {
    RecordId, keyword, page, size
} from 'core/common/swagger';
import { DoctorVerifyInterceptor } from 'core/modules/user/interceptor';
import { hasDoctorRole } from 'core/modules/auth/guard';
import { DoctorController } from './doctor.controller';

export const DoctorResolver = Module.builder()
    .addPrefix({
        prefixPath: '/doctors',
        tag: 'doctors',
        module: 'DoctorModule',
    })
    .register([
        {
            route: '',
            method: 'get',
            params: [page, size, keyword],
            controller: DoctorController.searchDoctor,
            model: { $ref: 'PaginationDoctorDto' },
            description:
                'Everyone can search for doctors by name, phone number, quota code, work unit, expertise through keywords.',
        },
        {
            route: '/',
            method: 'put',
            interceptors: [DoctorVerifyInterceptor],
            guards: [hasDoctorRole],
            controller: DoctorController.verifyDoctor,
            body: 'DoctorVerifyDto',
            model: { $ref: 'DoctorDto' },
            preAuthorization: true,
        },
        {
            route: '/my-surveys',
            method: 'get',
            guards: [hasDoctorRole],
            params: [page, size],
            controller: DoctorController.getMySurveys,
            model: { $ref: 'PaginationSurveyDto' },
            preAuthorization: true,
        },
        {
            route: '/my-patients',
            method: 'get',
            guards: [hasDoctorRole],
            params: [page, size, keyword],
            controller: DoctorController.getMyPatients,
            model: { $ref: 'PaginationPatientDto' },
            preAuthorization: true,
        },
        {
            route: '/:id',
            method: 'get',
            params: [RecordId],
            controller: DoctorController.getDoctorById,
            model: { $ref: 'DoctorDto' },
        },
    ]);
