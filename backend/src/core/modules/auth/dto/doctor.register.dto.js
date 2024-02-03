import { Gender } from 'core/common/enum/gender.enum';
import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('DoctorRegisterDto', {
    email: SwaggerDocument.ApiProperty({ type: 'string' }),
    phone: SwaggerDocument.ApiProperty({ type: 'string' }),
    fullName: SwaggerDocument.ApiProperty({ type: 'string' }),
    password: SwaggerDocument.ApiProperty({ type: 'string' }),
    gender: SwaggerDocument.ApiProperty({ type: 'enum', example: Gender.MALE }),
    birthday: SwaggerDocument.ApiProperty({ type: 'dateTime' }),
    avatar: SwaggerDocument.ApiProperty({ type: 'string' }),
    address: SwaggerDocument.ApiProperty({ type: 'string' }),
    quotaCode: SwaggerDocument.ApiProperty({ type: 'string' }),
    expertise: SwaggerDocument.ApiProperty({ type: 'string' }),
    experience: SwaggerDocument.ApiProperty({ type: 'string' }),
    workUnit: SwaggerDocument.ApiProperty({ type: 'string' }),
    certificate: SwaggerDocument.ApiProperty({ type: 'string' }),
});

export const DoctorRegisterDto = body => ({
    full_name: body.fullName,
    email: body.email,
    phone: body.phone,
    password: body.password,
    gender: body.gender,
    birthday: body.birthday,
    avatar: body.avatar,
    address: body.address,
    quota_code: body.quotaCode,
    expertise: body.expertise,
    experience: body.experience,
    work_unit: body.workUnit,
    certificate: body.certificate,
});
