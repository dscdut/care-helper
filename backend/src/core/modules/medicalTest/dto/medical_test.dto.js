import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('MedicalTestDto', {
    id: SwaggerDocument.ApiProperty({ type: 'int', readOnly: true }),
    testRows: SwaggerDocument.ApiProperty({ type: 'string', readOnly: true }),
    examinationId: SwaggerDocument.ApiProperty({ type: 'int', readOnly: true }),
    createdAt: SwaggerDocument.ApiProperty({ type: 'dateTime', readOnly: true }),
});

export const MedicalTestDto = medicalTest => ({
    id: medicalTest.id,
    testRows: JSON.parse(medicalTest.testRows),
    examinationId: medicalTest.examinationId,
    createdAt: medicalTest.createdAt
});
