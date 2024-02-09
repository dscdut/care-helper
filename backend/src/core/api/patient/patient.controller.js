import { ValidHttpResponse } from 'packages/handler/response/validHttp.response';
import { PatientUpdateDto, UserService } from 'core/modules/user';
import { DEFAULT_KEYWORD, DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from 'core/common/constants';
import { PatientService } from 'core/modules/patient';

class Controller {
    constructor() {
        this.service = UserService;
        this.patientService = PatientService;
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

    searchPatient = async req => {
        const page = req.query.page || DEFAULT_PAGE;
        const size = req.query.size || DEFAULT_PAGE_SIZE;
        const keyword = req.query.keyword || DEFAULT_KEYWORD;

        const data = await this.patientService.searchPatient(page, size, keyword);
        return ValidHttpResponse.toOkResponse(data);
    };
}

export const PatientController = new Controller();
