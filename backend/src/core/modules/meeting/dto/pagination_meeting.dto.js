import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('PaginationMeetingDto', {
    data: SwaggerDocument.ApiProperty({
        type: 'array',
        model: 'MeetingDto',
    }),
    totalPages: SwaggerDocument.ApiProperty({ type: 'int', readOnly: true }),
    totalElements: SwaggerDocument.ApiProperty({ type: 'int', readOnly: true })
});

export const PaginationMeetingDto = pageable => ({
    data: pageable.content,
    totalPages: Math.ceil(pageable.total / pageable.pageSize),
    totalElements: pageable.total
});
