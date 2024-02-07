import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('CreateExaminationDto', {
    patientId: SwaggerDocument.ApiProperty({ type: 'int' }),
    hospitalId: SwaggerDocument.ApiProperty({ type: 'int' }),
});

export const CreateExaminationDto = body => ({
    patient_id: body.patientId,
    hospital_id: body.hospitalId,
});
