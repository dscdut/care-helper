import { ApiDocument } from 'core/config/swagger.config';
import { PatientDto } from 'core/modules/user/dto/patient.dto';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('PatientLoginResponseDto', {
    user: SwaggerDocument.ApiProperty({ type: 'model', model: 'PatientDto' }),
    accessToken: SwaggerDocument.ApiProperty({ type: 'string' }),
    refreshToken: SwaggerDocument.ApiProperty({ type: 'string' }),
});

export const PatientLoginResponseDto = ({
    user,
    accessToken,
    refreshToken,
}) => ({
    user: PatientDto(user),
    accessToken,
    refreshToken,
});
