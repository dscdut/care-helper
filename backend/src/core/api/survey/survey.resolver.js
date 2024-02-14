import { Module } from 'packages/handler/Module';
import {
    RecordId, keyword, page, size
} from 'core/common/swagger';
import { CreateSurveyInterceptor } from 'core/modules/survey';
import { hasDoctorRole } from 'core/modules/auth/guard';
import { canDeleteSurvey, canGetSurvey } from 'core/modules/survey/guard';
import { SurveyController } from './survey.controller';

export const SurveyResolver = Module.builder()
    .addPrefix({
        prefixPath: '/surveys',
        tag: 'surveys',
        module: 'SurveyModule',
    })
    .register([
        {
            route: '',
            method: 'post',
            interceptors: [CreateSurveyInterceptor],
            guards: [hasDoctorRole],
            controller: SurveyController.createSurvey,
            body: 'CreateSurveyDto',
            model: { $ref: 'MessageDto' },
            preAuthorization: true,
        },
        {
            route: '/patients/:id',
            method: 'get',
            params: [page, size, RecordId],
            guards: [hasDoctorRole],
            controller: SurveyController.getSurveysOfPatient,
            model: { $ref: 'PaginationSurveyDto' },
            preAuthorization: true,
        },
        {
            route: '/:id',
            method: 'get',
            params: [RecordId],
            controller: SurveyController.getSurveyById,
            model: { $ref: 'SurveyDto' },
            guards: [canGetSurvey],
            preAuthorization: true,
        },
        {
            route: '/:id',
            method: 'delete',
            params: [RecordId],
            controller: SurveyController.deleteSurveyById,
            model: { $ref: 'MessageDto' },
            guards: [canDeleteSurvey],
            preAuthorization: true,
            description: 'Delete survey by id',
        },
    ]);
