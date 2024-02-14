import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('UpdateTestDto', {
    id: SwaggerDocument.ApiProperty({ type: 'int' }),
    testRows: SwaggerDocument.ApiProperty({ type: 'string' }),
    examinationId: SwaggerDocument.ApiProperty({ type: 'int' }),
});

export const UpdateTestDto = dto => ({
    id: dto.id,
    test_rows: typeof dto.testRows === 'string' ? dto.testRows : JSON.stringify(dto.testRows),
    examination_id: dto.examinationId,
});
