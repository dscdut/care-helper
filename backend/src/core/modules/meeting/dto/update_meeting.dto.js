import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('UpdateMeetingDto', {
    id: SwaggerDocument.ApiProperty({ type: 'int' }),
    startTime: SwaggerDocument.ApiProperty({ type: 'dateTime' }),
    endTime: SwaggerDocument.ApiProperty({ type: 'dateTime' }),
    place: SwaggerDocument.ApiProperty({ type: 'string' }),
    note: SwaggerDocument.ApiProperty({ type: 'string', required: false }),
});

export const UpdateMeetingDto = body => ({
    id: body.id,
    start_time: body.startTime,
    end_time: body.endTime,
    place: body.place,
    note: body.note,
});
