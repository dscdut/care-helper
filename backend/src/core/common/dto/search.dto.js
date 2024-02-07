import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('SearchDto', {
    id: SwaggerDocument.ApiProperty({ type: 'int' }),
    name: SwaggerDocument.ApiProperty({ type: 'string' }),

});

export const SearchDto = ({ objectDto }) => ({
    id: objectDto.id,
    name: objectDto.name
});
