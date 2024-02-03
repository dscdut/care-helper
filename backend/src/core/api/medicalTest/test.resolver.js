import { Module } from 'packages/handler/Module';
import { examinationId , page, size } from 'core/common/swagger';
import { CreateExaminationInterceptor, UpdateExaminationInterceptor } from 'core/modules/examination/interceptor';
import { hasDoctorOrPatientRole, hasDoctorRole } from 'core/modules/auth/guard';
import { MedicalTestController } from './examination.controller';

export const MedicalTestResolver = Module.builder()
    .addPrefix({
        prefixPath: '/tests',
        tag: 'tests',
        module: 'TestModule',
    })
    .register([
        {
            route: '/my-examinations',
            method: 'get',
            params: [page,size],
            guards: [hasDoctorOrPatientRole],
            controller: MedicalTestController.listMyExaminations,
            model: {
                type: 'array',
                name: 'ExaminationDto',
            },
            preAuthorization: true,
        },
        {
            route: '/:examinationId',
            method: 'get',
            params: [examinationId],
            guards: [hasDoctorOrPatientRole],
            controller: MedicalTestController.getDetailExamination,
            model: 'ExaminationDto',
            preAuthorization: true,
        },
        {
            route: '',
            method: 'post',
            interceptors: [CreateExaminationInterceptor],
            body: 'CreateExaminationDto',
            guards: [hasDoctorRole],
            controller: MedicalTestController.createExamination,
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
            controller: MedicalTestController.updateExamination,
            model: 'MessageDto',
            preAuthorization: true,
            description: 'update empty examination to examination with diagnose, detail diagnose, advice(note), '
        },
        {
            route: '/:examinationId',
            method: 'delete',
            params: [examinationId],
            guards: [hasDoctorRole],
            controller: MedicalTestController.deleteEmptyExamination,
            model: 'MessageDto',
            description: 'can only be deleted for medical examinations without tests or prescriptions',
            preAuthorization: true,
        },

    ]);
