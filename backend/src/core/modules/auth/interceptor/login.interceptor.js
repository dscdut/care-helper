import { DefaultValidatorInterceptor } from 'core/infrastructure/interceptor';
import { JoiUtils } from 'core/utils';
import Joi from 'joi';

export const DoctorLoginInterceptor = new DefaultValidatorInterceptor(
    Joi.object({
        email: JoiUtils.email().required(),
        password: JoiUtils.requiredString(),
    }),
);

export const PatientLoginInterceptor = new DefaultValidatorInterceptor(
    Joi.object({
        phone: JoiUtils.phone().required(),
        password: JoiUtils.requiredString(),
    }),
);
