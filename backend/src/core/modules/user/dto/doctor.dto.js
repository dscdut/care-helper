import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('DoctorDto', {
    id: SwaggerDocument.ApiProperty({ type: 'number' }),
    email: SwaggerDocument.ApiProperty({ type: 'string' }),
    fullName: SwaggerDocument.ApiProperty({ type: 'string' }),
    gender: SwaggerDocument.ApiProperty({ type: 'string' }),
    phone: SwaggerDocument.ApiProperty({ type: 'string' }),
    birthday: SwaggerDocument.ApiProperty({ type: 'dateTime' }),
    address: SwaggerDocument.ApiProperty({ type: 'string' }),
    avatar: SwaggerDocument.ApiProperty({ type: 'string' }),
    quotaCode: SwaggerDocument.ApiProperty({ type: 'string' }),
    expertise: SwaggerDocument.ApiProperty({ type: 'string' }),
    experience: SwaggerDocument.ApiProperty({ type: 'string' }),
    workUnit: SwaggerDocument.ApiProperty({ type: 'string' }),
    certificate: SwaggerDocument.ApiProperty({ type: 'string' }),
});

export const DoctorDto = doctor => ({
    id: doctor.id,
    email: doctor.email,
    fullName: doctor.fullName,
    gender: doctor.gender,
    phone: doctor.phone,
    birthday: doctor.birthday,
    address: doctor.address,
    avatar: doctor.avatar,
    quotaCode: doctor.quotaCode,
    expertise: doctor.expertise,
    experience: doctor.experience,
    workUnit: doctor.workUnit,
    certificate: doctor.certificate,
});
