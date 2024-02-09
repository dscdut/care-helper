import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('MedicalHistoryDto', {
    id: SwaggerDocument.ApiProperty({ type: 'int' }),
    history: SwaggerDocument.ApiProperty({
        type: 'string',
    }),
    patientId: SwaggerDocument.ApiProperty({ type: 'int' }),
});

export const MedicalHistoryDto = ({ medicalHistory }) => ({
    id: medicalHistory.id,
    history: medicalHistory.history,
    patientId: medicalHistory.patientId,
});
