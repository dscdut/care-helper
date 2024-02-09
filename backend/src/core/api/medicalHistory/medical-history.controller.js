import {
    CreateMedicalHistoryDto,
    MedicalHistoryService,
    UpdateMedicalHistoryDto,
} from 'core/modules/medicalHistory';
import { ValidHttpResponse } from 'packages/handler/response/validHttp.response';

class Controller {
    constructor() {
        this.service = MedicalHistoryService;
    }

    createMedicalHistory = async req => {
        const data = await this.service.createMedicalHistory(
            CreateMedicalHistoryDto(req.body),
            req.user.payload.id,
        );
        return ValidHttpResponse.toOkResponse(data);
    };

    updateMedicalHistory = async req => {
        const data = await this.service.updateMedicalHistory(
            UpdateMedicalHistoryDto(req.body),
            req.user.payload.id,
        );
        return ValidHttpResponse.toOkResponse(data);
    };

    getMedicalHistoryByPatientId = async req => {
        const data = await this.service.getMedicalHistoryByPatientId(
            req.params.id,
        );
        return ValidHttpResponse.toOkResponse(data);
    };
}

export const MedicalHistoryController = new Controller();
