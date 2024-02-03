import { MessageDto } from 'core/common/dto';
import { Role } from 'core/common/enum';
import { CreateExaminationDto, UpdateExaminationDto, MedicalTestService } from 'core/modules/medicalTest';
import { ValidHttpResponse } from 'packages/handler/response/validHttp.response';
import { ForbiddenException } from 'packages/httpException';

class Controller {
    constructor() {
        this.service = MedicalTestService;
    }

    createMedicalTest = async req => {
        const data = await this.service.createExamination({
            ...CreateExaminationDto(req.body),
            doctor_id: req.user.payload.id,
        });
        return ValidHttpResponse.toOkResponse(data);
    };

    updateMedicalTest = async req => {
        const doctorId = req.user.payload.id;
        await this.service.updateExaminationByDoctor({
            ...UpdateExaminationDto(req.body),
            doctorId,
        });
        return ValidHttpResponse.toOkResponse(MessageDto({ message: 'Update examination successfully!' }));
    };

    deleteMedicalTest = async req => {
        const doctorId = req.user.payload.id;
        await this.service.deleteEmptyExamination(
            req.params.examinationId,
            doctorId,
        );
        return ValidHttpResponse.toOkResponse(MessageDto({ message: 'Delete examination successfully!' }));
    };

    getPaginationMyTest = async req => {
        let data;
        const userId = req.user.payload.id;
        const userRole = req.user.payload.role;
        const page = req.query.page || 1;
        const size = req.query.size || 10;

        if (userRole === Role.PATIENT) {
            data = await this.service.getPaginationByPatientId(
                userId, page, size
            );
        }
        if (userRole === Role.DOCTOR) {
            data = await this.service.getPaginationByDoctorId(
                userId, page, size
            );
        }
        return ValidHttpResponse.toOkResponse(data);
    };

    getDetailMyTest = async req => {
        const data = await this.service.getOneById(
            req.params.examinationId,
        );
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
