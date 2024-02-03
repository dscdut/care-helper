import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('RegisterResponseDto', {
    authToken: SwaggerDocument.ApiProperty({ type: 'string' }),
});

export const RegisterResponseDto = ({ authToken }) => ({
    authToken,
});
