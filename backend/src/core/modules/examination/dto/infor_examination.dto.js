import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';
import { TinyPatientDto } from '../../patient/dto/tiny_patient.dto';
import { TinyDoctorDto } from '../../doctor/dto/tiny_doctor.dto';

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
        model: 'TinyDoctorDto',
        readOnly: true,
    }),
    patient: SwaggerDocument.ApiProperty({
        type: 'model',
        model: 'TinyPatientDto',
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
    doctor: TinyDoctorDto(data),
    patient: TinyPatientDto(data),
    hospital: {
        id: data.hospitalId,
        name: data.hospitalName,
        address: data.hospitalAddress,
    },
});
