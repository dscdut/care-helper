import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('LessPatientDto', {
    id: SwaggerDocument.ApiProperty({ type: 'int' }),
    fullname: SwaggerDocument.ApiProperty({ type: 'string' }),
    phone: SwaggerDocument.ApiProperty({ type: 'string' }),
});

export const LessPatientDto = data => ({
    id: data.patientId,
    fullname: data.patientName,
    phone: data.patientPhone,
});
