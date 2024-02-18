import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('LazyMeetingDto', {
    id: SwaggerDocument.ApiProperty({ type: 'int', readOnly: true }),
    title: SwaggerDocument.ApiProperty({ type: 'string', readOnly: true }),
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
    title: meeting.title,
    startTime: meeting.startTime,
    endTime: meeting.endTime,
    place: meeting.place,
    note: meeting.note,
    patientId: meeting.patientId,
    doctorId: meeting.doctorId,
    createdAt: meeting.createdAt,
});
