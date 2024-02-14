import { ValidHttpResponse } from 'packages/handler/response/validHttp.response';
import { UserService } from 'core/modules/user';
import { DoctorVerifyDto } from 'core/modules/user/dto/doctor.verify.dto';
import {
    DEFAULT_KEYWORD,
    DEFAULT_PAGE,
    DEFAULT_PAGE_SIZE,
} from 'core/common/constants';
import { DoctorService } from 'core/modules/doctor';
import { PaginationPatientDto } from 'core/modules/patient';

class Controller {
    constructor() {
        this.service = UserService;
        this.doctorService = DoctorService;
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

    searchDoctor = async req => {
        const page = req.query.page || DEFAULT_PAGE;
        const size = req.query.size || DEFAULT_PAGE_SIZE;
        const keyword = req.query.keyword || DEFAULT_KEYWORD;

        const data = await this.doctorService.searchDoctor(page, size, keyword);
        return ValidHttpResponse.toOkResponse(data);
    };

    getMyPatients = async req => {
        const page = req.query.page || DEFAULT_PAGE;
        const size = req.query.size || DEFAULT_PAGE_SIZE;
        const data = await this.service.findPatientsByDoctorId(
            req.user.payload.id,
            page,
            size,
        );
        return ValidHttpResponse.toOkResponse(PaginationPatientDto(data));
    };
}

export const DoctorController = new Controller();
