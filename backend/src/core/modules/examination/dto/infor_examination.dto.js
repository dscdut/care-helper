import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';
import { LessPatientDto } from './less_patient.dto';
import { LessDoctorDto } from './less_doctor.dto';

ApiDocument.addModel('InforExaminationDto', {
    id: SwaggerDocument.ApiProperty({ type: 'int', readOnly: true }),
    diagnose: SwaggerDocument.ApiProperty({ type: 'string', readOnly: true }),
    detailDiagnose: SwaggerDocument.ApiProperty({
        type: 'string',
        readOnly: true,
    }),
    advice: SwaggerDocument.ApiProperty({ type: 'string', readOnly: true }),
    createdAt: SwaggerDocument.ApiProperty({
        type: 'dateTime',
        readOnly: true,
    }),
    doctor: SwaggerDocument.ApiProperty({
        type: 'model',
        model: 'LessDoctorDto',
        readOnly: true,
    }),
    patient: SwaggerDocument.ApiProperty({
        type: 'model',
        model: 'LessPatientDto',
        readOnly: true,
    }),
    hospital: SwaggerDocument.ApiProperty({
        type: 'model',
        model: 'HospitalDto',
        readOnly: true,
    }),
});

export const InforExaminationDto = data => ({
    id: data.id,
    diagnose: data.diagnose,
    detailDiagnose: data.detailDiagnose,
    advice: data.advice,
    createdAt: data.createdAt,
    doctor: LessDoctorDto(data),
    patient: LessPatientDto(data),
    hospital: {
        id: data.hospitalId,
        name: data.hospitalName,
        address: data.hospitalAddress,
    },
});
