import { Module } from 'packages/handler/Module';
import { RecordId } from 'core/common/swagger';
import { UpdatePatientInterceptor } from 'core/modules/user';
import { PatientController } from './patient.controller';

export const PatientResolver = Module.builder()
    .addPrefix({
        prefixPath: '/patients',
        tag: 'patients',
        module: 'PatientModule',
    })
    .register([
        {
            route: '/:id',
            method: 'get',
            params: [RecordId],
            controller: PatientController.getPatientById,
            model: { $ref: 'PatientDto' },
        },
        {
            route: '/',
            method: 'put',
            interceptors: [UpdatePatientInterceptor],
            body: 'PatientUpdateDto',
            controller: PatientController.updatePatient,
            model: { $ref: 'PatientDto' },
            preAuthorization: true,
        },
    ]);
