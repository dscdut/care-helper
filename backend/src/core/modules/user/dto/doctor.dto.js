import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('DoctorDto', {
    id: SwaggerDocument.ApiProperty({ type: 'number' }),
    email: SwaggerDocument.ApiProperty({ type: 'string' }),
    fullName: SwaggerDocument.ApiProperty({ type: 'string' }),
    phone: SwaggerDocument.ApiProperty({ type: 'string' }),
    quotaCode: SwaggerDocument.ApiProperty({ type: 'string' }),
    expertise: SwaggerDocument.ApiProperty({ type: 'string' }),
    experience: SwaggerDocument.ApiProperty({ type: 'string' }),
    workUnit: SwaggerDocument.ApiProperty({ type: 'string' }),
    certificateName: SwaggerDocument.ApiProperty({ type: 'string' }),
    certificateNumber: SwaggerDocument.ApiProperty({ type: 'string' }),
    certificateProvider: SwaggerDocument.ApiProperty({ type: 'string' }),
    active: SwaggerDocument.ApiProperty({ type: 'bool' }),
});

export const DoctorDto = doctor => ({
    id: doctor.id,
    email: doctor.email,
    fullName: doctor.fullName,
    phone: doctor.phone,
    quotaCode: doctor.quotaCode,
    expertise: doctor.expertise,
    experience: doctor.experience,
    workUnit: doctor.workUnit,
    certificateName: doctor.certificateName,
    certificateNumber: doctor.certificateNumber,
    certificateProvider: doctor.certificateProvider,
    active: doctor.active,
});
