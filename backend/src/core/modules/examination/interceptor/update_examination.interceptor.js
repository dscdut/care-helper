import { DefaultValidatorInterceptor } from 'core/infrastructure/interceptor';
import { JoiUtils } from 'core/utils';
import Joi from 'joi';

export const UpdateExaminationInterceptor = new DefaultValidatorInterceptor(
    Joi.object({
        id: JoiUtils.positiveNumber().required(),
        diagnose: JoiUtils.requiredString(),
        detailDiagnose: JoiUtils.optionalString(),
        advice: JoiUtils.optionalString(),
        note: JoiUtils.optionalString(),
        hospitalId: JoiUtils.positiveNumber().required(),
    }),
);
