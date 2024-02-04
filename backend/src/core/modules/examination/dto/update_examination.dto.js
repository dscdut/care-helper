import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('UpdateExaminationDto', {
    id: SwaggerDocument.ApiProperty({ type: 'int' }),
    diagnose: SwaggerDocument.ApiProperty({ type: 'string' }),
    detailDiagnose: SwaggerDocument.ApiProperty({ type: 'string', required: false }),
    advice: SwaggerDocument.ApiProperty({ type: 'string', required: false }),
    hospitalId: SwaggerDocument.ApiProperty({ type: 'int' }),
});

export const UpdateExaminationDto = body => ({
    ...body,
});
