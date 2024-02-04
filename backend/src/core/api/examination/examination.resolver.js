import { Module } from 'packages/handler/Module';
import { examinationId, page, size } from 'core/common/swagger';
import {
    CreateExaminationInterceptor,
    UpdateExaminationInterceptor,
} from 'core/modules/examination/interceptor';
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
                $ref: 'ExaminationDto',
            },
            preAuthorization: true,
        },
        {
            route: '/:examinationId',
            method: 'get',
            params: [examinationId],
            guards: [hasDoctorOrPatientRole],
            controller: ExaminationController.getDetailExamination,
            model: { $ref: 'ExaminationDto' },
            preAuthorization: true,
        },
        {
            route: '',
            method: 'post',
            interceptors: [CreateExaminationInterceptor],
            body: 'CreateExaminationDto',
            guards: [hasDoctorRole],
            controller: ExaminationController.createExamination,
            model: { $ref: 'ExaminationDto' },
            preAuthorization: true,
            description: 'create a new empty examination',
        },
        {
            route: '',
            method: 'put',
            interceptors: [UpdateExaminationInterceptor],
            body: 'UpdateExaminationDto',
            guards: [hasDoctorRole],
            controller: ExaminationController.updateExamination,
            model: { $ref: 'MessageDto' },
            preAuthorization: true,
            description:
                'update empty examination to examination with diagnose, detail diagnose, advice(note), ',
        },
        {
            route: '/:examinationId',
            method: 'delete',
            params: [examinationId],
            guards: [hasDoctorRole],
            controller: ExaminationController.deleteEmptyExamination,
            model: { $ref: 'MessageDto' },
            description:
                'can only be deleted for medical examinations without tests or prescriptions',
            preAuthorization: true,
        },
    ]);
