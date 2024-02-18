import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';
import { TinyDoctorDto } from '../../doctor/dto/tiny_doctor.dto';

ApiDocument.addModel('PatientExaminationDto', {
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
        model: 'TinyDoctorDto',
        readOnly: true,
    }),
    hospital: SwaggerDocument.ApiProperty({
        type: 'model',
        model: 'HospitalDto',
        readOnly: true,
    }),
});

export const PatientExaminationDto = data => ({
    id: data.id,
    diagnose: data.diagnose,
    detailDiagnose: data.detailDiagnose,
    advice: data.advice,
    createdAt: data.createdAt,
    patientId: data.patientId,
    doctor: TinyDoctorDto(data),
    hospital: {
        id: data.hospitalId,
        name: data.hospitalName,
        address: data.hospitalAddress,
    },
});
