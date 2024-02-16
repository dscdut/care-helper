import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('PaginationPatientDto', {
    data: SwaggerDocument.ApiProperty({
        type: 'array',
        model: 'LessPatientDto',
    }),
    totalPages: SwaggerDocument.ApiProperty({ type: 'int', readOnly: true }),
    totalElements: SwaggerDocument.ApiProperty({ type: 'int', readOnly: true })
});

export const PaginationPatientDto = pageable => ({
    data: pageable.content,
    totalPages: Math.ceil(pageable.total / pageable.pageSize),
    totalElements: pageable.total
});
