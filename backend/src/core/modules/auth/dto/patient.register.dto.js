import { Gender } from 'core/common/enum/gender.enum';
import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('PatientRegisterDto', {
    phone: SwaggerDocument.ApiProperty({ type: 'string' }),
    fullName: SwaggerDocument.ApiProperty({ type: 'string' }),
    password: SwaggerDocument.ApiProperty({ type: 'string' }),
    gender: SwaggerDocument.ApiProperty({ type: 'enum', example: Gender.MALE }),
    birthday: SwaggerDocument.ApiProperty({ type: 'dateTime' }),
    avatar: SwaggerDocument.ApiProperty({ type: 'string' }),
    address: SwaggerDocument.ApiProperty({ type: 'string' }),
    nationalIdCard: SwaggerDocument.ApiProperty({ type: 'string' }),
    insurance: SwaggerDocument.ApiProperty({ type: 'string' }),
    profesion: SwaggerDocument.ApiProperty({ type: 'string' }),
});

export const PatientRegisterDto = body => ({
    full_name: body.fullName,
    phone: body.phone,
    password: body.password,
    gender: body.gender,
    birthday: body.birthday,
    avatar: body.avatar,
    address: body.address,
    national_id_card: body.nationalIdCard,
    insurance: body.insurance,
    profesion: body.profesion,
});
