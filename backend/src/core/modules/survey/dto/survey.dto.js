import { FormStatus } from 'core/common/enum';
import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('SurveyDto', {
    id: SwaggerDocument.ApiProperty({ type: 'int' }),
    form: SwaggerDocument.ApiProperty({ type: 'string' }),
    status: SwaggerDocument.ApiProperty({ type: 'enum', model: FormStatus }),
    patient: SwaggerDocument.ApiProperty({
        type: 'model',
        model: 'IdFullNameDto',
    }),
    doctor: SwaggerDocument.ApiProperty({
        type: 'model',
        model: 'IdFullNameDto',
    }),
    createdAt: SwaggerDocument.ApiProperty({ type: 'dateTime' }),
    updatedAt: SwaggerDocument.ApiProperty({ type: 'dateTime' }),
});

ApiDocument.addModel('IdFullNameDto', {
    id: SwaggerDocument.ApiProperty({ type: 'int' }),
    fullName: SwaggerDocument.ApiProperty({ type: 'string' }),
});

export const SurveyDto = survey => ({
    id: survey.id,
    form: survey.form,
    status: survey.status,
    patient: { id: survey.patientId, fullName: survey.patientFullName },
    doctor: { id: survey.doctorId, fullName: survey.doctorFullName },
    createdAt: survey.createdAt,
    updatedAt: survey.updatedAt,
});
