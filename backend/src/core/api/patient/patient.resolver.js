import { Module } from 'packages/handler/Module';
import { RecordId } from 'core/common/swagger';
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
            model: 'PatientDto',
        },
        // {
        //     route: '/',
        //     method: 'put',
        //     controller: PatientController.getPatientById,
        //     model: 'PatientDto',
        // },
    ]);
