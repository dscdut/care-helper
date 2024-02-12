import { Module } from 'packages/handler/Module';
import {
    RecordId, keyword, page, size
} from 'core/common/swagger';
import { DoctorVerifyInterceptor } from 'core/modules/user/interceptor/doctor.verify.interceptor';
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
            route: '/:id',
            method: 'get',
            params: [RecordId],
            controller: DoctorController.getDoctorById,
            model: { $ref: 'DoctorDto' },
        },
        {
            route: '',
            method: 'get',
            params: [page, size, keyword],
            controller: DoctorController.searchDoctor,
            model: { $ref: 'PaginationDoctorDto' },
            description: 'Everyone can search for doctors by name, phone number, quota code, work unit, expertise through keywords.'
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
    ]);
