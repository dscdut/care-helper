import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('LessPatientDto', {
    id: SwaggerDocument.ApiProperty({ type: 'int' }),
    email: SwaggerDocument.ApiProperty({ type: 'string' }),
    fullName: SwaggerDocument.ApiProperty({ type: 'string' }),
    phone: SwaggerDocument.ApiProperty({ type: 'string' }),
    avatar: SwaggerDocument.ApiProperty({ type: 'string' }),
    address: SwaggerDocument.ApiProperty({ type: 'string' }),
    nationalIdCard: SwaggerDocument.ApiProperty({ type: 'string' }),
    insurance: SwaggerDocument.ApiProperty({ type: 'string' }),
    profesion: SwaggerDocument.ApiProperty({ type: 'string' }),
});

export const LessPatientDto = patient => ({
    id: patient.id,
    email: patient.email,
    fullName: patient.fullName,
    phone: patient.phone,
    avatar: patient.avatar,
    address: patient.address,
    nationalIdCard: patient.nationalIdCard,
    insurance: patient.insurance,
    profesion: patient.profesion,
});
