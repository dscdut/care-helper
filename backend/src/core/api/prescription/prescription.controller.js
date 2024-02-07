import { CreatePrescriptionDto } from 'core/modules/prescription';
import { PrescriptionService } from 'core/modules/prescription/service/prescription.service';
import { ValidHttpResponse } from 'packages/handler/response/validHttp.response';

class Controller {
    constructor() {
        this.service = PrescriptionService;
    }

    createPrescription = async req => {
        const data = await this.service.createPrescription(
            CreatePrescriptionDto(req.body),
            req.user.payload.id,
        );
        return ValidHttpResponse.toOkResponse(data);
    };

    getPrescriptionById = async req => {
        const data = await this.service.getPrescriptionById(
            req.params.prescriptionId,
        );
        return ValidHttpResponse.toOkResponse(data);
    };
}

export const PrescriptionController = new Controller();
