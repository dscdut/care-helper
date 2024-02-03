import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('HospitalDto', {
    id: SwaggerDocument.ApiProperty({ type: 'int' }),
    name: SwaggerDocument.ApiProperty({ type: 'string' }),
    address: SwaggerDocument.ApiProperty({ type: 'string' }),
});

export const HospitalDto = ({ hospital }) => ({
    id: hospital.id,
    name: hospital.name,
    address: hospital.address,
});
