import { SwaggerDocument } from '../../../packages/swagger';

export const patientId = SwaggerDocument.ApiParams({
    name: 'patientId',
    paramsIn: 'path',
    type: 'integer',
    description: 'Id of patient to find',
});
