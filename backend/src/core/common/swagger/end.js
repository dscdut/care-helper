import { SwaggerDocument } from '../../../packages/swagger';

export const end = SwaggerDocument.ApiParams({
    name: 'end',
    paramsIn: 'query',
    required: false,
    type: 'date',
    description: 'end date',
});
