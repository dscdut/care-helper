import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('FillSurveyDto', {
    form: SwaggerDocument.ApiProperty({ type: 'string' }),
});

export const FillSurveyDto = body => ({
    form: body.form,
});
