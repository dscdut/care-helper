import { SwaggerDocument } from '../../../packages/swagger';

export const start = SwaggerDocument.ApiParams({
    name: 'start',
    paramsIn: 'query',
    required: false,
    type: 'date',
    description: 'start date',
});
