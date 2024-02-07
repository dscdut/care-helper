import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('PhoneDto', {
    phone: SwaggerDocument.ApiProperty({ type: 'string' }),
});

export const PhoneDto = ({ phone }) => ({ phone });
