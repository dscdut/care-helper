import { Module } from 'packages/handler/Module';
import { prescriptionId } from 'core/common/swagger/prescription-id';
import { CreatePrescriptionInterceptor } from 'core/modules/prescription/interceptor/prescription.create.interceptor';
import { hasDoctorOrPatientRole, hasDoctorRole } from 'core/modules/auth/guard';
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
            model: 'CreatePrescriptionResponseDto',
            preAuthorization: true,
        },
        {
            route: '/:prescriptionId',
            method: 'get',
            params: [prescriptionId],
            guards: [hasDoctorOrPatientRole],
            controller: PrescriptionController.getPrescriptionById,
            model: 'PrescriptionDto',
            preAuthorization: true,
        },
    ]);
