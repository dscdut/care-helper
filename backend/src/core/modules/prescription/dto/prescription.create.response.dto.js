import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('CreatePrescriptionResponseDto', {
    message: SwaggerDocument.ApiProperty({ type: 'string' }),
});

export const CreatePrescriptionResponseDto = ({ message }) => ({
    message,
});
