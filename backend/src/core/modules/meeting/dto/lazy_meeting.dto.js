import { ApiDocument } from 'core/config/swagger.config';
import { TinyDoctorDto } from 'core/modules/doctor/dto/tiny_doctor.dto';
import { TinyPatientDto } from 'core/modules/patient/dto/tiny_patient.dto';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('LazyMeetingDto', {
    id: SwaggerDocument.ApiProperty({ type: 'int', readOnly: true }),
    startTime: SwaggerDocument.ApiProperty({ type: 'dateTime', readOnly: true }),
    endTime: SwaggerDocument.ApiProperty({ type: 'dateTime', readOnly: true }),
    place: SwaggerDocument.ApiProperty({ type: 'string', readOnly: true }),
    note: SwaggerDocument.ApiProperty({ type: 'string', required: false, readOnly: true }),
    createdAt: SwaggerDocument.ApiProperty({ type: 'dateTime', readOnly: true }),
    doctorId: SwaggerDocument.ApiProperty({ type: 'int', readOnly: true }),
    patientId: SwaggerDocument.ApiProperty({ type: 'int', readOnly: true }),
});

export const LazyMeetingDto = meeting => ({
    id: meeting.id,
    startTime: meeting.startTime,
    endTime: meeting.endTime,
    place: meeting.place,
    note: meeting.note,
    patientId: meeting.patientId,
    doctorId: meeting.doctorId,
    createdAt: meeting.createdAt,
});
