import { ValidHttpResponse } from 'packages/handler/response/validHttp.response';
import { UserService } from 'core/modules/user';

class Controller {
    constructor() {
        this.service = UserService;
    }

    getPatientById = async req => {
        const data = await this.service.findPatientById(req.params.id);
        return ValidHttpResponse.toOkResponse(data);
    };
}

export const PatientController = new Controller();
