import { SwaggerDocument } from '../../../packages/swagger';

export const examinationId = SwaggerDocument.ApiParams({
    name: 'examinationId',
    paramsIn: 'path',
    type: 'integer',
    description: 'Examination Id to find',
});
