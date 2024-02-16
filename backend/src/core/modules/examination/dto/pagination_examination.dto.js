import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('PaginationExaminationDto', {
    data: SwaggerDocument.ApiProperty({
        type: 'array',
        model: 'InforExaminationDto',
    }),
    totalPages: SwaggerDocument.ApiProperty({ type: 'int', readOnly: true }),
    totalElements: SwaggerDocument.ApiProperty({ type: 'int', readOnly: true })
});

export const PaginationExaminationDto = pageable => ({
    data: pageable.content,
    totalPages: Math.ceil(pageable.total / pageable.pageSize),
    totalElements: pageable.total
});
