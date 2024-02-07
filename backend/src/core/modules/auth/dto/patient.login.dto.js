import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('PatientLoginDto', {
    phone: SwaggerDocument.ApiProperty({ type: 'string' }),
    password: SwaggerDocument.ApiProperty({ type: 'string' }),
});

export const PatientLoginDto = body => ({
    phone: body.phone,
    password: body.password,
});
