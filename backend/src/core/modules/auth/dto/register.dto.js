import { Role } from 'core/common/enum';
import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('RegisterDto', {
    email: SwaggerDocument.ApiProperty({ type: 'string' }),
    phone: SwaggerDocument.ApiProperty({ type: 'string' }),
    fullName: SwaggerDocument.ApiProperty({ type: 'string' }),
    password: SwaggerDocument.ApiProperty({ type: 'string' }),
    role: SwaggerDocument.ApiProperty({
        model: Role,
        type: 'enum',
    }),
});

export const RegisterDto = body => ({
    email: body.email,
    full_name: body.fullName,
    phone: body.phone,
    password: body.password,
    role: body.role,
});
