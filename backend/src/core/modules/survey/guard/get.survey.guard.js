import { getUserContext } from 'packages/authModel/module/user';
import { Role } from 'core/common/enum';
import { SurveyService } from '../service';

export class GetSurveyGuard {
    constructor() {
        this.surveyService = SurveyService;
    }

    async canActive(req) {
        const { id, role } = getUserContext(req).payload;
        const survey = await this.surveyService.getSurveyById(req.params.id);
        return (
            !survey
            || (role === Role.DOCTOR
                ? survey.doctorId === id
                : survey.patientId === id)
        );
    }
}
