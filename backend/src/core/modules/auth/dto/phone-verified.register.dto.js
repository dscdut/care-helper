import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('PhoneVerifiedRegisterDto', {
    token: SwaggerDocument.ApiProperty({ type: 'string', required: true }),
    password: SwaggerDocument.ApiProperty({ type: 'string', required: true }),
});

export const PhoneVerifiedRegisterDto = body => ({
    token: body.token,
    password: body.password,
});
