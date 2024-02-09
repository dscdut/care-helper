import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('LessDoctorDto', {
    id: SwaggerDocument.ApiProperty({ type: 'number' }),
    email: SwaggerDocument.ApiProperty({ type: 'string' }),
    fullName: SwaggerDocument.ApiProperty({ type: 'string' }),
    phone: SwaggerDocument.ApiProperty({ type: 'string' }),
    quotaCode: SwaggerDocument.ApiProperty({ type: 'string' }),
    expertise: SwaggerDocument.ApiProperty({ type: 'string' }),
    workUnit: SwaggerDocument.ApiProperty({ type: 'string' }),
});

export const LessDoctorDto = doctor => ({
    id: doctor.id,
    email: doctor.email,
    fullName: doctor.fullName,
    phone: doctor.phone,
    quotaCode: doctor.quotaCode,
    expertise: doctor.expertise,
    workUnit: doctor.workUnit,
});
