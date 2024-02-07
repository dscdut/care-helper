import { DefaultValidatorInterceptor } from 'core/infrastructure/interceptor';
import { JoiUtils } from 'core/utils';
import Joi from 'joi';

export const MedicalTestInterceptor = new DefaultValidatorInterceptor(
    Joi.object({
        id: JoiUtils.positiveNumber().required(),
        testRows: JoiUtils.requiredString(),
        examinationId: JoiUtils.positiveNumber().required(),
    }),
);
