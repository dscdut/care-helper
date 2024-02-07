import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('ExaminationDto', {
    id: SwaggerDocument.ApiProperty({ type: 'int', readOnly: true }),
    diagnose: SwaggerDocument.ApiProperty({ type: 'string', readOnly: true }),
    detailDiagnose: SwaggerDocument.ApiProperty({ type: 'string', readOnly: true }),
    advice: SwaggerDocument.ApiProperty({ type: 'string', readOnly: true }),
    doctorId: SwaggerDocument.ApiProperty({ type: 'int', readOnly: true }),
    patientId: SwaggerDocument.ApiProperty({ type: 'int', readOnly: true }),
    createdAt: SwaggerDocument.ApiProperty({ type: 'dateTime', readOnly: true }),
    hospital: SwaggerDocument.ApiProperty({
        type: 'model',
        model: 'HospitalDto',
        readOnly: true
    }),
});

export const ExaminationDto = ({ examination, hospital }) => ({
    id: examination.id,
    diagnose: examination.diagnose,
    detailDiagnose: examination.detailDiagnose,
    advice: examination.advice,
    doctorId: examination.doctorId,
    patientId: examination.patientId,
    createdAt: examination.createdAt,
    hospital: hospital || {
        id: examination.hospitalId,
        name: examination.hospitalName,
        address: examination.hospitalAddress,
    },
});
