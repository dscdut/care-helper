import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('PhoneUnverifiedRegisterResponseDto', {
    token: SwaggerDocument.ApiProperty({ type: 'string' }),
});

export const PhoneUnverifiedRegisterResponseDto = token => ({ token });
