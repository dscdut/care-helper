import { DefaultValidatorInterceptor } from 'core/infrastructure/interceptor';
import { JoiUtils } from 'core/utils';
import Joi from 'joi';

export const PhoneInterceptor = new DefaultValidatorInterceptor(
    Joi.object({
        phone: JoiUtils.phone().required(),
    }),
);
