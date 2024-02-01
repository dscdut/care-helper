import { SwaggerDocument } from '../../../packages/swagger';

export const prescriptionId = SwaggerDocument.ApiParams({
    name: 'prescriptionId',
    paramsIn: 'path',
    type: 'integer',
    description: 'Prescription Id to find',
});
