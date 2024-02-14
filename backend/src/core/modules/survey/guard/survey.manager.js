import { DeleteSurveyGuard } from './delete.survey.guard';
import { GetSurveyGuard } from './get.survey.guard';

export const canGetSurvey = new GetSurveyGuard();

export const canDeleteSurvey = new DeleteSurveyGuard();
