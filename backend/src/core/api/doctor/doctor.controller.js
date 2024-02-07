import { ValidHttpResponse } from 'packages/handler/response/validHttp.response';
import { UserService } from 'core/modules/user';
import { DoctorVerifyDto } from 'core/modules/user/dto/doctor.verify.dto';

class Controller {
    constructor() {
        this.service = UserService;
    }

    getDoctorById = async req => {
        const data = await this.service.findDoctorById(req.params.id);
        return ValidHttpResponse.toOkResponse(data);
    };

    verifyDoctor = async req => {
        const data = await this.service.updateDoctor({
            id: req.user.payload.id,
            active: true,
            ...DoctorVerifyDto(req.body),
        });
        return ValidHttpResponse.toOkResponse(data);
    };
}

export const DoctorController = new Controller();
