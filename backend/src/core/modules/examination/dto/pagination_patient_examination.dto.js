import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('PaginationPatientExaminationDto', {
    data: SwaggerDocument.ApiProperty({
        type: 'array',
        model: 'PatientExaminationDto',
    }),
    totalPages: SwaggerDocument.ApiProperty({ type: 'int', readOnly: true }),
    totalElements: SwaggerDocument.ApiProperty({ type: 'int', readOnly: true })
});

export const PaginationPatientExaminationDto = pageable => ({
    data: pageable.content,
    totalPages: Math.ceil(pageable.total / pageable.pageSize),
    totalElements: pageable.total
});
