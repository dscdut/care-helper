import { DefaultValidatorInterceptor } from 'core/infrastructure/interceptor';
import { JoiUtils } from 'core/utils';
import Joi from 'joi';

export const CreateTestInterceptor = new DefaultValidatorInterceptor(
    Joi.object({
        testRows: JoiUtils.requiredString(),
        examinationId: JoiUtils.positiveNumber().required(),
    }),
);
