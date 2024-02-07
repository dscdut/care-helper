import { DefaultValidatorInterceptor } from 'core/infrastructure/interceptor';
import { JoiUtils } from 'core/utils';
import Joi from 'joi';

export const CreateExaminationInterceptor = new DefaultValidatorInterceptor(
    Joi.object({
        hospitalId: JoiUtils.positiveNumber().required(),
        patientId: JoiUtils.positiveNumber().required(),
    }),
);
