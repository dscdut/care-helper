import { Module } from 'packages/handler/Module';
import { CreatePrescriptionInterceptor } from 'core/modules/prescription/interceptor/prescription.create.interceptor';
import { hasDoctorOrPatientRole, hasDoctorRole } from 'core/modules/auth/guard';
import { RecordId } from 'core/common/swagger';
import { PrescriptionController } from './prescription.controller';

export const PrescriptionResolver = Module.builder()
    .addPrefix({
        prefixPath: '/prescriptions',
        tag: 'prescriptions',
        module: 'PrescriptionModule',
    })
    .register([
        {
            route: '/',
            method: 'post',
            interceptors: [CreatePrescriptionInterceptor],
            body: 'CreatePrescriptionDto',
            guards: [hasDoctorRole],
            controller: PrescriptionController.createPrescription,
            model: { $ref: 'MessageDto' },
            preAuthorization: true,
        },
        {
            route: '/:id',
            method: 'get',
            params: [RecordId],
            guards: [hasDoctorOrPatientRole],
            controller: PrescriptionController.getPrescriptionById,
            model: { $ref: 'PrescriptionDto' },
            preAuthorization: true,
        },
        {
            route: '/examination/:id',
            method: 'get',
            params: [RecordId],
            guards: [hasDoctorOrPatientRole],
            controller: PrescriptionController.getPrescriptionsByExamination,
            model: { type: 'array', items: { $ref: 'PrescriptionDto' } },
            description: 'Get prescriptions data as a patient or doctor by examination id. For patients, you can only get your own medical examination data and cannot view other people \'s data.',
            preAuthorization: true,
        },
    ]);
