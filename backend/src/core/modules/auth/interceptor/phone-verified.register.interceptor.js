import Joi from 'joi';
import { DefaultValidatorInterceptor } from 'core/infrastructure/interceptor';
import { JoiUtils } from '../../../utils';

export const PhoneVerifiedRegisterInterceptor = new DefaultValidatorInterceptor(
    Joi.object({
        token: JoiUtils.requiredString(),
        password: JoiUtils.password().required(),
    }),
);
