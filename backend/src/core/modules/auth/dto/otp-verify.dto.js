import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('OtpVerifyDto', {
    token: SwaggerDocument.ApiProperty({ type: 'string' }),
    otp: SwaggerDocument.ApiProperty({ type: 'string' }),
});

export const OtpVerifyDto = body => ({
    token: body.token,
    otp: body.otp,
});
