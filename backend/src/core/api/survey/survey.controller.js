import { ValidHttpResponse } from 'packages/handler/response/validHttp.response';
import {
    DEFAULT_KEYWORD,
    DEFAULT_PAGE,
    DEFAULT_PAGE_SIZE,
} from 'core/common/constants';
import { CreateSurveyDto, SurveyService } from 'core/modules/survey';
import { MessageDto } from 'core/common/dto';
import { NotFoundException } from 'packages/httpException';
import { SurveyDto } from 'core/modules/survey/dto/survey.dto';
import { PaginationSurveyDto } from 'core/modules/survey/dto/pagination-survey.dto';

class Controller {
    constructor() {
        this.surveyService = SurveyService;
    }

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

    getSurveysOfPatient = async req => {
        const patientId = req.params.id;
        const page = req.query.page || DEFAULT_PAGE;
        const size = req.query.size || DEFAULT_PAGE_SIZE;

        const data = await this.surveyService.getSurveyPaginationByPatientId(
            patientId,
            page,
            size,
        );

        return ValidHttpResponse.toOkResponse(PaginationSurveyDto(data));
    };
}

export const SurveyController = new Controller();
