import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('CreateMedicalHistoryDto', {
    history: SwaggerDocument.ApiProperty({
        type: 'string',
    }),
});

export const CreateMedicalHistoryDto = body => ({
    history: body.history,
});
