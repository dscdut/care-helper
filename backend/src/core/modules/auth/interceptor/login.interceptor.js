import { DefaultValidatorInterceptor } from 'core/infrastructure/interceptor';
import { JoiUtils } from 'core/utils';
import Joi from 'joi';

export const EmailLoginInterceptor = new DefaultValidatorInterceptor(
    Joi.object({
        email: JoiUtils.email().required(),
        password: JoiUtils.requiredString(),
    }),
);

export const PhoneLoginInterceptor = new DefaultValidatorInterceptor(
    Joi.object({
        phone: JoiUtils.phone().required(),
        password: JoiUtils.requiredString(),
    }),
);
