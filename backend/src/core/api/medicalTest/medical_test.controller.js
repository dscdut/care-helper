import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from 'core/common/constants';
import { MessageDto } from 'core/common/dto';
import { Role } from 'core/common/enum';
import { ExaminationService } from 'core/modules/examination';
import { MedicalTestService } from 'core/modules/medicalTest';
import { ValidHttpResponse } from 'packages/handler/response/validHttp.response';
import { ForbiddenException } from 'packages/httpException';

class Controller {
    constructor() {
        this.medicalTestService = MedicalTestService;
        this.examinationService = ExaminationService;
    }

    createMedicalTest = async req => {
        const data = await this.medicalTestService.createMedicalTest(
            req.body,
            req.user.payload.id,
        );
        return ValidHttpResponse.toOkResponse(data);
    };

    updateMedicalTest = async req => {
        const doctorId = req.user.payload.id;
        await this.medicalTestService.updateMedicalTestByDoctor(req.body, doctorId);
        return ValidHttpResponse.toOkResponse(
            MessageDto({ message: 'Update medical test successfully!' }),
        );
    };

    deleteMedicalTest = async req => {
        const doctorId = req.user.payload.id;
        await this.medicalTestService.deleteMedicalTest(req.params.id, doctorId);
        return ValidHttpResponse.toOkResponse(
            MessageDto({ message: 'Delete medical test successfully!' }),
        );
    };

    getPaginationMyTest = async req => {
        let data;
        const userId = req.user.payload.id;
        const userRole = req.user.payload.role;
        const page = req.query.page || DEFAULT_PAGE;
        const size = req.query.size || DEFAULT_PAGE_SIZE;

        if (userRole === Role.PATIENT) {
            data = await this.medicalTestService.getPaginationByPatientId(
                userId,
                page,
                size,
            );
        }
        if (userRole === Role.DOCTOR) {
            data = await this.medicalTestService.getPaginationByDoctorId(
                userId,
                page,
                size,
            );
        }
        return ValidHttpResponse.toOkResponse(data);
    };

    getDetailMyTest = async req => {
        const data = await this.medicalTestService.getOneById(req.params.id);
        const userId = req.user.payload.id;
        const userRole = req.user.payload.role;

        if (userRole === Role.PATIENT) {
            if (data.patientId !== userId) {
                throw new ForbiddenException();
            }
        }
        return ValidHttpResponse.toOkResponse(data);
    };

    getTestsByExamination = async req => {
        const userId = req.user.payload.id;
        const userRole = req.user.payload.role;

        if (userRole === Role.PATIENT) {
            if (this.examinationService.checkMyExaminationByPatient(req.params.id, userId)) {
                throw new ForbiddenException();
            }
        }
        const data = await this.medicalTestService.getTestsByExaminationId(req.params.id);
        return ValidHttpResponse.toOkResponse(data);
    };
}

export const MedicalTestController = new Controller();
