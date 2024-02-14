import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('PaginationSurveyDto', {
    data: SwaggerDocument.ApiProperty({
        type: 'array',
        model: 'SurveyDto',
    }),
    totalPages: SwaggerDocument.ApiProperty({ type: 'int', readOnly: true }),
    totalElements: SwaggerDocument.ApiProperty({ type: 'int', readOnly: true }),
});

export const PaginationSurveyDto = pageable => ({
    data: pageable.content,
    totalPages: Math.ceil(pageable.total / pageable.pageSize),
    totalElements: pageable.total,
});
