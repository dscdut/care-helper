import { DefaultValidatorInterceptor } from 'core/infrastructure/interceptor';
import { JoiUtils } from 'core/utils';
import Joi from 'joi';

export const CreateMedicalHistoryInterceptor = new DefaultValidatorInterceptor(
    Joi.object({
        history: JoiUtils.requiredString(),
    }),
);
