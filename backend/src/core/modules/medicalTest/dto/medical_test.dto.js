import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('MedicalTestDto', {
    id: SwaggerDocument.ApiProperty({ type: 'int' }),
    test_rows: SwaggerDocument.ApiProperty({ type: 'string' }),
    examinationId: SwaggerDocument.ApiProperty({ type: 'number' }),
});

export const MedicalTest = details => details;
