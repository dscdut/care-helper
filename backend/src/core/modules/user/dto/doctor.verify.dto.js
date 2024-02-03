import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('DoctorVerifyDto', {
    phone: SwaggerDocument.ApiProperty({ type: 'string' }),
    fullName: SwaggerDocument.ApiProperty({ type: 'string' }),
    quotaCode: SwaggerDocument.ApiProperty({ type: 'string' }),
    expertise: SwaggerDocument.ApiProperty({ type: 'string' }),
    experience: SwaggerDocument.ApiProperty({ type: 'string' }),
    workUnit: SwaggerDocument.ApiProperty({ type: 'string' }),
    certificateName: SwaggerDocument.ApiProperty({ type: 'string' }),
    certificateNumber: SwaggerDocument.ApiProperty({ type: 'string' }),
    certificateProvider: SwaggerDocument.ApiProperty({ type: 'string' }),
});

export const DoctorVerifyDto = body => ({
    full_name: body.fullName,
    phone: body.phone,
    quota_code: body.quotaCode,
    expertise: body.expertise,
    experience: body.experience,
    work_unit: body.workUnit,
    certificate_name: body.certificateName,
    certificate_number: body.certificateNumber,
    certificate_provider: body.certificateProvider,
});
