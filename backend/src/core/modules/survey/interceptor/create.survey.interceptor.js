import { DefaultValidatorInterceptor } from 'core/infrastructure/interceptor';
import { JoiUtils } from 'core/utils';
import Joi from 'joi';

export const CreateSurveyInterceptor = new DefaultValidatorInterceptor(
    Joi.object({
        form: JoiUtils.requiredString(),
        patientId: JoiUtils.positiveNumber().required(),
    }),
);
