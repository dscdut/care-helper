import { ValidHttpResponse } from 'packages/handler/response/validHttp.response';
import { PatientUpdateDto, UserService } from 'core/modules/user';
import {
    DEFAULT_KEYWORD,
    DEFAULT_PAGE,
    DEFAULT_PAGE_SIZE,
} from 'core/common/constants';
import { PatientService } from 'core/modules/patient';
import { ExaminationService } from 'core/modules/examination';
import { Role } from 'core/common/enum';
import { ForbiddenException } from 'packages/httpException';
import { SurveyService } from 'core/modules/survey';
import { MessageDto } from 'core/common/dto';
import { FillSurveyDto } from 'core/modules/survey/dto/fill.survey.dto';
import { PaginationSurveyDto } from 'core/modules/survey/dto/pagination-survey.dto';

class Controller {
    constructor() {
        this.service = UserService;
        this.patientService = PatientService;
        this.examinationService = ExaminationService;
        this.surveyService = SurveyService;
    }

    getPatientById = async req => {
        const userId = req.user.payload.id;
        const userRole = req.user.payload.role;
        const patientId = req.params.id;
        if (userRole === Role.PATIENT && userId !== patientId) {
            throw new ForbiddenException(
                `You do not have access to the patient id = ${patientId} `,
            );
        }
        const data = await this.service.findPatientById(patientId);
        return ValidHttpResponse.toOkResponse(data);
    };

    updatePatient = async req => {
        const data = await this.service.updatePatient({
            ...PatientUpdateDto(req.body),
            id: req.user.payload.id,
            active: true,
        });
        return ValidHttpResponse.toOkResponse(data);
    };

    listExaminations = async req => {
        const page = req.query.page || DEFAULT_PAGE;
        const size = req.query.size || DEFAULT_PAGE_SIZE;
        const data = await this.examinationService.findExaminationsByPatient(
            req.params.patientId,
            page,
            size,
        );
        return ValidHttpResponse.toOkResponse(data);
    };

    searchPatient = async req => {
        const page = req.query.page || DEFAULT_PAGE;
        const size = req.query.size || DEFAULT_PAGE_SIZE;
        const keyword = req.query.keyword || DEFAULT_KEYWORD;

        const data = await this.patientService.searchPatient(
            page,
            size,
            keyword,
        );
        return ValidHttpResponse.toOkResponse(data);
    };

    getMySurveys = async req => {
        const page = req.query.page || DEFAULT_PAGE;
        const size = req.query.size || DEFAULT_PAGE_SIZE;

        const data = await this.surveyService.getSurveyPaginationByPatientId(
            req.user.payload.id,
            page,
            size,
        );
        return ValidHttpResponse.toOkResponse(PaginationSurveyDto(data));
    };

    fillSurvey = async req => {
        const { form } = FillSurveyDto(req.body);
        await this.surveyService.fillSurvey(req.params.id, form);
        return ValidHttpResponse.toOkResponse(
            MessageDto({ message: 'You have filled survey' }),
        );
    };
}

export const PatientController = new Controller();
