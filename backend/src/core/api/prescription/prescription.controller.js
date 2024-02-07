import { Role } from 'core/common/enum';
import { ExaminationService } from 'core/modules/examination';
import { CreatePrescriptionDto } from 'core/modules/prescription';
import { PrescriptionService } from 'core/modules/prescription/service/prescription.service';
import { ValidHttpResponse } from 'packages/handler/response/validHttp.response';
import { ForbiddenException, NotFoundException } from 'packages/httpException';

class Controller {
    constructor() {
        this.service = PrescriptionService;
        this.examinationService = ExaminationService;
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

    getPrescriptionsByExamination = async req => {
        const userId = req.user.payload.id;
        const userRole = req.user.payload.role;

        if (userRole === Role.PATIENT) {
            if (this.examinationService.checkMyExaminationByPatient(req.params.id, userId)) {
                throw new ForbiddenException();
            }
        }
        const data = await this.service.getPrescriptionsByExaminationId(req.params.id);
        return ValidHttpResponse.toOkResponse(data);
    };
}

export const PrescriptionController = new Controller();
