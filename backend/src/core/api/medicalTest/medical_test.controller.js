import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from 'core/common/constants';
import { MessageDto } from 'core/common/dto';
import { Role } from 'core/common/enum';
import { MedicalTestService } from 'core/modules/medicalTest';
import { ValidHttpResponse } from 'packages/handler/response/validHttp.response';
import { ForbiddenException } from 'packages/httpException';

class Controller {
    constructor() {
        this.service = MedicalTestService;
    }

    createMedicalTest = async req => {
        const data = await this.service.createMedicalTest(
            req.body,
            req.user.payload.id,
        );
        return ValidHttpResponse.toOkResponse(data);
    };

    updateMedicalTest = async req => {
        const doctorId = req.user.payload.id;
        await this.service.updateMedicalTestByDoctor(req.body, doctorId);
        return ValidHttpResponse.toOkResponse(
            MessageDto({ message: 'Update examination successfully!' }),
        );
    };

    deleteMedicalTest = async req => {
        const doctorId = req.user.payload.id;
        await this.service.deleteMedicalTest(req.params.id, doctorId);
        return ValidHttpResponse.toOkResponse(
            MessageDto({ message: 'Delete examination successfully!' }),
        );
    };

    getPaginationMyTest = async req => {
        let data;
        const userId = req.user.payload.id;
        const userRole = req.user.payload.role;
        const page = req.query.page || DEFAULT_PAGE;
        const size = req.query.size || DEFAULT_PAGE_SIZE;

        if (userRole === Role.PATIENT) {
            data = await this.service.getPaginationByPatientId(
                userId,
                page,
                size,
            );
        }
        if (userRole === Role.DOCTOR) {
            data = await this.service.getPaginationByDoctorId(
                userId,
                page,
                size,
            );
        }
        return ValidHttpResponse.toOkResponse(data);
    };

    getDetailMyTest = async req => {
        const data = await this.service.getOneById(req.params.id);
        const userId = req.user.payload.id;
        const userRole = req.user.payload.role;

        if (userRole === Role.PATIENT) {
            if (data.patientId !== userId) {
                throw new ForbiddenException();
            }
        }
        return ValidHttpResponse.toOkResponse(data);
    };
}

export const MedicalTestController = new Controller();
