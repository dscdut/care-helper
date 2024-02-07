import { ApiDocument } from 'core/config/swagger.config';
import { DoctorDto } from 'core/modules/user/dto/doctor.dto';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('DoctorLoginResponseDto', {
    user: SwaggerDocument.ApiProperty({ type: 'model', model: 'DoctorDto' }),
    accessToken: SwaggerDocument.ApiProperty({ type: 'string' }),
    refreshToken: SwaggerDocument.ApiProperty({ type: 'string' }),
});

export const DoctorLoginResponseDto = ({ user, accessToken, refreshToken }) => ({
    user: DoctorDto(user),
    accessToken,
    refreshToken,
});
