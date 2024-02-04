import { Gender } from 'core/common/enum/gender.enum';
import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('PatientUpdateDto', {
    fullName: SwaggerDocument.ApiProperty({ type: 'string' }),
    gender: SwaggerDocument.ApiProperty({ type: 'enum', example: Gender.MALE }),
    birthday: SwaggerDocument.ApiProperty({ type: 'dateTime' }),
    address: SwaggerDocument.ApiProperty({ type: 'string' }),
    nationalIdCard: SwaggerDocument.ApiProperty({ type: 'string' }),
    insurance: SwaggerDocument.ApiProperty({ type: 'string' }),
    profesion: SwaggerDocument.ApiProperty({ type: 'string' }),
    height: SwaggerDocument.ApiProperty({ type: 'string', example: '160 cm' }),
    weight: SwaggerDocument.ApiProperty({ type: 'string', example: '60 kg' }),
});

export const PatientUpdateDto = body => ({
    full_name: body.fullName,
    gender: body.gender,
    birthday: body.birthday,
    address: body.address,
    national_id_card: body.nationalIdCard,
    insurance: body.insurance,
    profesion: body.profesion,
    height: body.height,
    weight: body.weight,
});
