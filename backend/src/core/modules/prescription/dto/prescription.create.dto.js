import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';
import { PrescriptionDetailsDto } from './prescription.details.dto';

ApiDocument.addModel('CreatePrescriptionDto', {
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

export const CreatePrescriptionDto = body => ({
    note: body.note,
    details: JSON.stringify(PrescriptionDetailsDto(body.details)),
    start_date: body.startDate,
    end_date: body.endDate,
    prescription_filename: body.prescriptionFilename,
    examination_id: body.examinationId,
});
