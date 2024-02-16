import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('UpdateMedicalHistoryDto', {
    history: SwaggerDocument.ApiProperty({
        type: 'string',
    }),
});

export const UpdateMedicalHistoryDto = body => ({
    history: body.history,
});
