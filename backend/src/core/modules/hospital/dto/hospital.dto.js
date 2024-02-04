import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('HospitalDto', {
    id: SwaggerDocument.ApiProperty({ type: 'int', readOnly: true }),
    name: SwaggerDocument.ApiProperty({ type: 'string', readOnly: true }),
    address: SwaggerDocument.ApiProperty({ type: 'string', readOnly: true }),
});

export const HospitalDto = ({ hospital }) => ({
    id: hospital.id,
    name: hospital.name,
    address: hospital.address,
});
