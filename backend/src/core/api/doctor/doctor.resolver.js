import { Module } from 'packages/handler/Module';
import { RecordId } from 'core/common/swagger';
import { DoctorVerifyInterceptor } from 'core/modules/user/interceptor/doctor.verify.interceptor';
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
            model: 'DoctorDto',
        },
        {
            route: '/',
            method: 'put',
            interceptors: [DoctorVerifyInterceptor],
            controller: DoctorController.verifyDoctor,
            body: 'DoctorVerifyDto',
            model: 'MessageDto',
            preAuthorization: true,
        },
    ]);
