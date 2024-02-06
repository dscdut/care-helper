import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('PatientDto', {
    id: SwaggerDocument.ApiProperty({ type: 'number' }),
    email: SwaggerDocument.ApiProperty({ type: 'string' }),
    fullName: SwaggerDocument.ApiProperty({ type: 'string' }),
    gender: SwaggerDocument.ApiProperty({ type: 'string' }),
    phone: SwaggerDocument.ApiProperty({ type: 'string' }),
    birthday: SwaggerDocument.ApiProperty({ type: 'date' }),
    avatar: SwaggerDocument.ApiProperty({ type: 'string' }),
    address: SwaggerDocument.ApiProperty({ type: 'string' }),
    nationalIdCard: SwaggerDocument.ApiProperty({ type: 'string' }),
    insurance: SwaggerDocument.ApiProperty({ type: 'string' }),
    profesion: SwaggerDocument.ApiProperty({ type: 'string' }),
    active: SwaggerDocument.ApiProperty({ type: 'bool' }),
});

export const PatientDto = patient => ({
    id: patient.id,
    email: patient.email,
    fullName: patient.fullName,
    gender: patient.gender,
    phone: patient.phone,
    birthday: patient.birthday,
    avatar: patient.avatar,
    address: patient.address,
    nationalIdCard: patient.nationalIdCard,
    insurance: patient.insurance,
    profesion: patient.profesion,
    active: patient.active,
});
