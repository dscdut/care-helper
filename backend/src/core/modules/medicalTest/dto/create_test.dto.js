import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('CreateTestDto', {
    testRows: SwaggerDocument.ApiProperty({ type: 'string' }),
    examinationId: SwaggerDocument.ApiProperty({ type: 'int' }),
});

export const CreateTestDto = body => ({
    test_rows: typeof body.testRows === 'string' ? body.testRows : JSON.stringify(body.testRows),
    examination_id: body.examinationId,
});
