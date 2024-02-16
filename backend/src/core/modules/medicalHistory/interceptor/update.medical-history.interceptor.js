import { DefaultValidatorInterceptor } from 'core/infrastructure/interceptor';
import { JoiUtils } from 'core/utils';
import Joi from 'joi';

export const UpdateMedicalHistoryInterceptor = new DefaultValidatorInterceptor(
    Joi.object({
        history: JoiUtils.requiredString(),
    }),
);
