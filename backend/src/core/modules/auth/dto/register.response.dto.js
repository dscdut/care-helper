import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('RegisterResponseDto', {
    message: SwaggerDocument.ApiProperty({ type: 'string' }),
});

export const RegisterResponseDto = ({ message }) => ({
    message,
});
