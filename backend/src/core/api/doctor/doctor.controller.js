import { ValidHttpResponse } from 'packages/handler/response/validHttp.response';
import { UserService } from 'core/modules/user';
import { NotFoundException } from 'packages/httpException';

class Controller {
    constructor() {
        this.service = UserService;
    }

    getDoctorById = async req => {
        const { id } = req.params;
        const data = await this.service.findDoctorById(id);
        if (data) return ValidHttpResponse.toOkResponse(data);
        throw new NotFoundException(`Cannot find doctor with id ${id}`);
    };
}

export const DoctorController = new Controller();
