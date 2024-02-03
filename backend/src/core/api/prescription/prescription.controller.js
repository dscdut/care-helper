import { CreatePrescriptionDto } from 'core/modules/prescription';
import { PrescriptionService } from 'core/modules/prescription/service/prescription.service';
import { ValidHttpResponse } from 'packages/handler/response/validHttp.response';
import { NotFoundException } from 'packages/httpException';

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
        const { id } = req.params;
        const data = await this.service.getPrescriptionById(id);
        if (data) return ValidHttpResponse.toOkResponse(data);
        throw new NotFoundException(`Cannot find prescription with id ${id}`);
    };
}

export const PrescriptionController = new Controller();
