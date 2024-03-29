import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('CreateMeetingDto', {
    title: SwaggerDocument.ApiProperty({ type: 'string' }),
    startTime: SwaggerDocument.ApiProperty({ type: 'dateTime' }),
    endTime: SwaggerDocument.ApiProperty({ type: 'dateTime' }),
    place: SwaggerDocument.ApiProperty({ type: 'string' }),
    note: SwaggerDocument.ApiProperty({ type: 'string', required: false }),
    patientId: SwaggerDocument.ApiProperty({ type: 'int' }),
});

export const CreateMeetingDto = body => ({
    title: body.title,
    start_time: body.startTime,
    end_time: body.endTime,
    place: body.place,
    note: body.note,
    patient_id: body.patientId,
});
