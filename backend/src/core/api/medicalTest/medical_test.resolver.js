import { Module } from 'packages/handler/Module';
import { RecordId, page, size } from 'core/common/swagger';
import { CreateTestInterceptor, MedicalTestInterceptor } from 'core/modules/medicalTest';
import { hasDoctorOrPatientRole, hasDoctorRole } from 'core/modules/auth/guard';
import { MedicalTestController } from './medical_test.controller';

export const MedicalTestResolver = Module.builder()
    .addPrefix({
        prefixPath: '/medical-tests',
        tag: 'medical tests',
        module: 'MedicalTestModule',
    })
    .register([
        {
            route: '',
            method: 'get',
            params: [page, size],
            guards: [hasDoctorOrPatientRole],
            controller: MedicalTestController.getPaginationMyTest,
            model: {
                type: 'array',
                name: 'MedicalTestDto',
            },
            preAuthorization: true,
        },
        {
            route: '/:id',
            method: 'get',
            params: [RecordId],
            guards: [hasDoctorOrPatientRole],
            controller: MedicalTestController.getDetailMyTest,
            model: 'MedicalTestDto',
            preAuthorization: true,
        },
        {
            route: '',
            method: 'post',
            interceptors: [CreateTestInterceptor],
            body: 'CreateTestDto',
            guards: [hasDoctorRole],
            controller: MedicalTestController.createMedicalTest,
            model: 'MedicalTestDto',
            preAuthorization: true,
            description: 'create a new medical test with filled data'
        },
        {
            route: '',
            method: 'put',
            interceptors: [MedicalTestInterceptor],
            body: 'UpdateTestDto',
            guards: [hasDoctorRole],
            controller: MedicalTestController.updateMedicalTest,
            model: 'MessageDto',
            preAuthorization: true,
            description: 'update a medical test with testRows field which is json type'
        },
        {
            route: '/:id',
            method: 'delete',
            params: [RecordId],
            guards: [hasDoctorRole],
            controller: MedicalTestController.deleteMedicalTest,
            model: 'MessageDto',
            description: 'As a doctor, a medical test that the doctor has created can only be deleted',
            preAuthorization: true,
        },

    ]);
