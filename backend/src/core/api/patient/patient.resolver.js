import { Module } from 'packages/handler/Module';
import {
    RecordId, keyword, page, patientId, size
} from 'core/common/swagger';
import { UpdatePatientInterceptor } from 'core/modules/user';
import { hasDoctorOrPatientRole, hasDoctorRole, hasPatientRole } from 'core/modules/auth/guard';
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
            route: '/my-surveys',
            method: 'get',
            guards: [hasPatientRole],
            params: [page, size],
            controller: PatientController.getMySurveys,
            model: { $ref: 'PaginationSurveyDto' },
            preAuthorization: true,
        },
        {
            route: '/:patientId/examinations',
            method: 'get',
            params: [page, size, patientId],
            guards: [hasDoctorRole],
            controller: PatientController.listExaminations,
            model: { $ref: 'PaginationPatientExaminationDto' },
            description: 'Get a list of a patient\'s examinations',
            preAuthorization: true,
        },
        {
            route: '',
            method: 'get',
            guards: [hasDoctorRole],
            params: [page, size, keyword],
            controller: PatientController.searchPatient,
            model: { $ref: 'PaginationPatientDto' },
            preAuthorization: true,
            description:
                'Only doctors have the right to find patient information via phone number, name, address, national id card, insurance by keyword.',
        },
        {
            route: '/',
            method: 'put',
            guards: [hasPatientRole],
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
            guards: [hasDoctorOrPatientRole],
            controller: PatientController.getPatientById,
            model: { $ref: 'PatientDto' },
            preAuthorization: true,
        },
    ]);
