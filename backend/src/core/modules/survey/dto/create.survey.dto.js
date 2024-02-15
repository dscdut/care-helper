import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('CreateSurveyDto', {
    form: SwaggerDocument.ApiProperty({ type: 'string' }),
    patientId: SwaggerDocument.ApiProperty({ type: 'int' }),
});

export const CreateSurveyDto = body => ({
    form: body.form,
    patientId: body.patientId,
});
