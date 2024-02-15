import { FormStatus } from 'core/common/enum';
import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('SurveyDto', {
    id: SwaggerDocument.ApiProperty({ type: 'int' }),
    form: SwaggerDocument.ApiProperty({ type: 'string' }),
    status: SwaggerDocument.ApiProperty({ type: 'enum', model: FormStatus }),
    patientId: SwaggerDocument.ApiProperty({ type: 'int' }),
    doctorId: SwaggerDocument.ApiProperty({ type: 'int' }),
    createdAt: SwaggerDocument.ApiProperty({ type: 'dateTime' }),
    updatedAt: SwaggerDocument.ApiProperty({ type: 'dateTime' }),
});

export const SurveyDto = survey => ({
    id: survey.id,
    form: survey.form,
    status: survey.status,
    patientId: survey.patientId,
    doctorId: survey.doctorId,
    createdAt: survey.createdAt,
    updatedAt: survey.updatedAt,
});
