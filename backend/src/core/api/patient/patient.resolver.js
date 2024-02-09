import { Module } from 'packages/handler/Module';
import { RecordId } from 'core/common/swagger';
import { UpdatePatientInterceptor } from 'core/modules/user';
import { hasDoctorRole } from 'core/modules/auth/guard';
import { PatientController } from './patient.controller';

export const PatientResolver = Module.builder()
    .addPrefix({
        prefixPath: '/patients',
        tag: 'patients',
        module: 'PatientModule',
    })
    .register([
        {
            route: '/my-patients',
            method: 'get',
            guards: [hasDoctorRole],
            controller: PatientController.getPatientsOfDoctor,
            model: { type: 'array', items: { $ref: 'PatientDto' } },
            preAuthorization: true,
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
        {
            route: '/:id',
            method: 'get',
            params: [RecordId],
            controller: PatientController.getPatientById,
            model: { $ref: 'PatientDto' },
        },
    ]);
