import { Module } from 'packages/handler/Module';
import {
    RecordId, keyword, page, size
} from 'core/common/swagger';
import { DoctorVerifyInterceptor } from 'core/modules/user/interceptor';
import { CreateSurveyInterceptor } from 'core/modules/survey';
import { hasDoctorRole } from 'core/modules/auth/guard';
import { canDeleteSurvey, canGetSurvey } from 'core/modules/survey/guard';
import { DoctorController } from './doctor.controller';

export const DoctorResolver = Module.builder()
    .addPrefix({
        prefixPath: '/doctors',
        tag: 'doctors',
        module: 'DoctorModule',
    })
    .register([
        {
            route: '',
            method: 'get',
            params: [page, size, keyword],
            controller: DoctorController.searchDoctor,
            model: { $ref: 'PaginationDoctorDto' },
            description:
                'Everyone can search for doctors by name, phone number, quota code, work unit, expertise through keywords.',
        },
        {
            route: '/',
            method: 'put',
            interceptors: [DoctorVerifyInterceptor],
            guards: [hasDoctorRole],
            controller: DoctorController.verifyDoctor,
            body: 'DoctorVerifyDto',
            model: { $ref: 'DoctorDto' },
            preAuthorization: true,
        },
        {
            route: '/surveys',
            method: 'post',
            interceptors: [CreateSurveyInterceptor],
            guards: [hasDoctorRole],
            controller: DoctorController.createSurvey,
            body: 'CreateSurveyDto',
            model: { $ref: 'MessageDto' },
            preAuthorization: true,
        },
        {
            route: '/surveys/patients/:id',
            method: 'get',
            params: [page, size, RecordId],
            guards: [hasDoctorRole],
            controller: DoctorController.getSurveysOfPatient,
            model: { $ref: 'PaginationSurveyDto' },
            preAuthorization: true,
        },
        {
            route: '/surveys/:id',
            method: 'get',
            params: [RecordId],
            controller: DoctorController.getSurveyById,
            model: { $ref: 'SurveyDto' },
            guards: [canGetSurvey],
            preAuthorization: true,
        },
        {
            route: '/surveys/:id',
            method: 'delete',
            params: [RecordId],
            controller: DoctorController.deleteSurveyById,
            model: { $ref: 'MessageDto' },
            guards: [canDeleteSurvey],
            preAuthorization: true,
            description: 'Delete survey by id',
        },
        {
            route: '/:id',
            method: 'get',
            params: [RecordId],
            controller: DoctorController.getDoctorById,
            model: { $ref: 'DoctorDto' },
        },
    ]);
