import { ValidHttpResponse } from 'packages/handler/response/validHttp.response';
import { UserService } from 'core/modules/user';
import { DoctorVerifyDto } from 'core/modules/user/dto/doctor.verify.dto';
import {
    DEFAULT_KEYWORD,
    DEFAULT_PAGE,
    DEFAULT_PAGE_SIZE,
} from 'core/common/constants';
import { DoctorService } from 'core/modules/doctor';
import { CreateSurveyDto, SurveyService } from 'core/modules/survey';
import { MessageDto } from 'core/common/dto';
import { NotFoundException } from 'packages/httpException';
import { SurveyDto } from 'core/modules/survey/dto/survey.dto';

class Controller {
    constructor() {
        this.service = UserService;
        this.doctorService = DoctorService;
        this.surveyService = SurveyService;
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

    createSurvey = async req => {
        const { form, patientId } = CreateSurveyDto(req.body);
        await this.surveyService.createSurvey(
            patientId,
            form,
            req.user.payload.id,
        );
        return ValidHttpResponse.toOkResponse(
            MessageDto({ message: 'Survey created' }),
        );
    };

    getSurveyById = async req => {
        const { id } = req.params;
        const data = await this.surveyService.getSurveyById(id);
        if (data) {
            return ValidHttpResponse.toOkResponse(SurveyDto(data));
        }
        throw new NotFoundException(`Survey with id ${id} not exist`);
    };

    deleteSurveyById = async req => {
        const { id } = req.params;
        await this.surveyService.deleteSurveyById(id);
        return ValidHttpResponse.toOkResponse(
            MessageDto({ message: 'Survey deleted' }),
        );
    };

    // getDoneSurveyAnswersByTimeDesc = async req => {
    //     const data = await this.service.findDoctorById(req.params.id);
    //     return ValidHttpResponse.toOkResponse(data);
    // };

    // getSurveyAnswersOfPatient = async req => {
    //     const data = await this.service.findDoctorById(req.params.id);
    //     return ValidHttpResponse.toOkResponse(data);
    // };

    // getSurveyAnswerById = async req => {
    //     const data = await this.service.findDoctorById(req.params.id);
    //     return ValidHttpResponse.toOkResponse(data);
    // };
}

export const DoctorController = new Controller();
