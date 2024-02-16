import { ApiDocument } from 'core/config/swagger.config';
import { TinyDoctorDto } from 'core/modules/doctor/dto/tiny_doctor.dto';
import { TinyPatientDto } from 'core/modules/patient/dto/tiny_patient.dto';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('MeetingDto', {
    id: SwaggerDocument.ApiProperty({ type: 'int', readOnly: true }),
    startTime: SwaggerDocument.ApiProperty({ type: 'dateTime', readOnly: true }),
    endTime: SwaggerDocument.ApiProperty({ type: 'dateTime', readOnly: true }),
    place: SwaggerDocument.ApiProperty({ type: 'string', readOnly: true }),
    note: SwaggerDocument.ApiProperty({ type: 'string', required: false, readOnly: true }),
    createdAt: SwaggerDocument.ApiProperty({ type: 'dateTime', readOnly: true }),
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
});

export const MeetingDto = meeting => ({
    id: meeting.id,
    startTime: meeting.startTime,
    endTime: meeting.endTime,
    place: meeting.place,
    note: meeting.note,
    patient: TinyPatientDto(meeting),
    doctor: TinyDoctorDto(meeting),
    createdAt: meeting.createdAt,
});
