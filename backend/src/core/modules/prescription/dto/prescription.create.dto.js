import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';
import { PrescriptionDetailsDto } from './prescription.details.dto';

ApiDocument.addModel('CreatePrescriptionDto', {
    note: SwaggerDocument.ApiProperty({ type: 'string' }),
    details: SwaggerDocument.ApiProperty({
        type: 'array',
        model: 'PrescriptionDetailsDto',
    }),
    startTime: SwaggerDocument.ApiProperty({ type: 'dateTime' }),
    endTime: SwaggerDocument.ApiProperty({ type: 'dateTime' }),
    prescriptionFilename: SwaggerDocument.ApiProperty({
        type: 'string',
        required: false,
    }),
    examinationId: SwaggerDocument.ApiProperty({ type: 'int' }),
});

export const CreatePrescriptionDto = body => ({
    note: body.note,
    details: JSON.stringify(PrescriptionDetailsDto(body.details)),
    start_time: body.startTime,
    end_time: body.endTime,
    prescription_filename: body.prescriptionFilename,
    examination_id: body.examinationId,
});
