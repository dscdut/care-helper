import { Module } from 'packages/handler/Module';
import { RecordId } from 'core/common/swagger';
import {
    hasDoctorOrPatientRole,
    hasPatientRole,
} from 'core/modules/auth/guard';
import { CreateMedicalHistoryInterceptor, UpdateMedicalHistoryInterceptor } from 'core/modules/medicalHistory/interceptor';
import { MedicalHistoryController } from './medical-history.controller';

export const MedicalHistoryResolver = Module.builder()
    .addPrefix({
        prefixPath: '/medical-histories',
        tag: 'medical histories',
        module: 'MedicalHistoryModule',
    })
    .register([
        {
            route: '',
            method: 'post',
            guards: [hasPatientRole],
            interceptop: [CreateMedicalHistoryInterceptor],
            controller: MedicalHistoryController.createMedicalHistory,
            model: {
                $ref: 'MessageDto',
            },
            body: 'CreateMedicalHistoryDto',
            preAuthorization: true,
        },
        {
            route: '',
            method: 'put',
            guards: [hasPatientRole],
            interceptop: [UpdateMedicalHistoryInterceptor],
            controller: MedicalHistoryController.updateMedicalHistory,
            model: {
                $ref: 'MessageDto',
            },
            body: 'UpdateMedicalHistoryDto',
            preAuthorization: true,
        },
        {
            route: '/patients/:id',
            method: 'get',
            params: [RecordId],
            guards: [hasDoctorOrPatientRole],
            controller: MedicalHistoryController.getMedicalHistoryByPatientId,
            model: {
                $ref: 'MedicalHistoryDto',
            },
            preAuthorization: true,
            description: 'Get medical history of a patient by patient_id',
        },
    ]);
