import { Module } from 'packages/handler/Module';
import { RecordId, page, size } from 'core/common/swagger';
import { CreateExaminationInterceptor, UpdateExaminationInterceptor } from 'core/modules/examination/interceptor';
import { hasDoctorOrPatientRole, hasDoctorRole } from 'core/modules/auth/guard';
import { ExaminationController } from './examination.controller';

export const ExaminationResolver = Module.builder()
    .addPrefix({
        prefixPath: '/examinations',
        tag: 'examinations',
        module: 'ExaminationModule',
    })
    .register([
        {
            route: '/my-examinations',
            method: 'get',
            params: [page, size],
            guards: [hasDoctorOrPatientRole],
            controller: ExaminationController.listMyExaminations,
            model: {
                type: 'array',
                name: 'ExaminationDto',
            },
            description: 'Get data about medical visits that the patient or doctor are related to',
            preAuthorization: true,
        },
        {
            route: '/:id',
            method: 'get',
            params: [RecordId],
            guards: [hasDoctorOrPatientRole],
            controller: ExaminationController.getDetailExamination,
            model: 'ExaminationDto',
            description: 'Get medical examination data as a patient or doctor. For patients, you can only get your own medical examination data and cannot view other people \'s data.',
            preAuthorization: true,
        },
        {
            route: '',
            method: 'post',
            interceptors: [CreateExaminationInterceptor],
            body: 'CreateExaminationDto',
            guards: [hasDoctorRole],
            controller: ExaminationController.createExamination,
            model: 'ExaminationDto',
            preAuthorization: true,
            description: 'create a new empty examination'
        },
        {
            route: '',
            method: 'put',
            interceptors: [UpdateExaminationInterceptor],
            body: 'UpdateExaminationDto',
            guards: [hasDoctorRole],
            controller: ExaminationController.updateExamination,
            model: 'MessageDto',
            preAuthorization: true,
            description: 'update empty examination to examination with diagnose, detail diagnose, advice(note), '
        },
        {
            route: '/:id',
            method: 'delete',
            params: [RecordId],
            guards: [hasDoctorRole],
            controller: ExaminationController.deleteEmptyExamination,
            model: 'MessageDto',
            description: 'can only be deleted for medical examinations without tests or prescriptions',
            preAuthorization: true,
        },

    ]);
