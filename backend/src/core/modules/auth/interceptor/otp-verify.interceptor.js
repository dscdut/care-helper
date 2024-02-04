import { DefaultValidatorInterceptor } from 'core/infrastructure/interceptor';
import { JoiUtils } from 'core/utils';
import Joi from 'joi';

export const OtpVerifyInterceptor = new DefaultValidatorInterceptor(
    Joi.object({
        token: JoiUtils.requiredString(),
        otp: JoiUtils.otp().required(),
    }),
);
