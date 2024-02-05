import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('PrescriptionDto', {
    note: SwaggerDocument.ApiProperty({ type: 'string' }),
    details: SwaggerDocument.ApiProperty({
        type: 'array',
        model: 'PrescriptionDetailsDto',
    }),
    startDate: SwaggerDocument.ApiProperty({ type: 'date' }),
    endDate: SwaggerDocument.ApiProperty({ type: 'date' }),
    prescriptionFilename: SwaggerDocument.ApiProperty({
        type: 'string',
        required: false,
    }),
    examinationId: SwaggerDocument.ApiProperty({ type: 'int' }),
});

export const PrescriptionDto = ({ prescription }) => ({
    ...prescription,
    details: JSON.parse(prescription.details),
});
