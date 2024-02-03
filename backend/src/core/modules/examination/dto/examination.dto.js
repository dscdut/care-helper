import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('ExaminationDto', {
    id: SwaggerDocument.ApiProperty({ type: 'int' }),
    diagnose: SwaggerDocument.ApiProperty({ type: 'string' , required: true}),
    detailDiagnose: SwaggerDocument.ApiProperty({ type: 'string' }),
    advice: SwaggerDocument.ApiProperty({ type: 'string' }),
    doctorId: SwaggerDocument.ApiProperty({ type: 'int' }),
    patientId: SwaggerDocument.ApiProperty({ type: 'int' }),
    hospital: {
        type: 'object',
        model: 'HospitalDto'
    },
});

export const ExaminationDto = ({ examination, hospital }) => ({
    ...examination,
    hopital:hospital || {
        id : examination.hospitalId,
        name : examination.hospitalName,
        address : examination.hospitalAddress
    }
});
