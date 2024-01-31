import { Role } from 'core/common/enum';
import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('DoctorDto', {
    id: SwaggerDocument.ApiProperty({ type: 'number' }),
    email: SwaggerDocument.ApiProperty({ type: 'string' }),
    fullName: SwaggerDocument.ApiProperty({ type: 'string' }),
    gender: SwaggerDocument.ApiProperty({ type: 'string' }),
    phone: SwaggerDocument.ApiProperty({ type: 'string' }),
    birthday: SwaggerDocument.ApiProperty({ type: 'dateTime' }),
    avatar: SwaggerDocument.ApiProperty({ type: 'string' }),
    address: SwaggerDocument.ApiProperty({ type: 'string' }),
    role: SwaggerDocument.ApiProperty({ type: 'string', example: Role.DOCTOR }),
    profession: SwaggerDocument.ApiProperty({ type: 'string' }),
});

export const DoctorDto = ({ password, ...doctor }) => ({
    ...doctor,
});