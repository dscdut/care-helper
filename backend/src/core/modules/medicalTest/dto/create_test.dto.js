import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('CreateTestDto', {
    testRows: SwaggerDocument.ApiProperty({ type: 'string' }),
    examinationId: SwaggerDocument.ApiProperty({ type: 'int' }),
});

export const CreateTestDto = body => ({
    test_rows: JSON.stringify(body.testRows),
    examination_id: body.examinationId,
});
