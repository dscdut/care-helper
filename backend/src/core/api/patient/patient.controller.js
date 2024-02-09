import { ValidHttpResponse } from 'packages/handler/response/validHttp.response';
import { PatientUpdateDto, UserService } from 'core/modules/user';

class Controller {
    constructor() {
        this.service = UserService;
    }

    getPatientById = async req => {
        const data = await this.service.findPatientById(req.params.id);
        return ValidHttpResponse.toOkResponse(data);
    };

    updatePatient = async req => {
        const data = await this.service.updatePatient(
            PatientUpdateDto({
                id: req.user.payload.id,
                active: true,
                ...req.body,
            }),
        );
        return ValidHttpResponse.toOkResponse(data);
    };

    getPatientsOfDoctor = async req => {
        const data = await this.service.findPatientsByDoctorId(
            req.user.payload.id,
        );
        return ValidHttpResponse.toOkResponse(data);
    };
}

export const PatientController = new Controller();
