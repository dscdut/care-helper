import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('PrescriptionDetailsDto', {
    medicineName: SwaggerDocument.ApiProperty({ type: 'string' }),
    usage: SwaggerDocument.ApiProperty({ type: 'string' }),
    quantity: SwaggerDocument.ApiProperty({ type: 'string' }),
});

export const PrescriptionDetailsDto = details => details;
