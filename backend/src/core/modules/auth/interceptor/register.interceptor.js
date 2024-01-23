import Joi from 'joi';
import { DefaultValidatorInterceptor } from 'core/infrastructure/interceptor';
import { JoiUtils } from '../../../utils';

export const RegisterInterceptor = new DefaultValidatorInterceptor(
    Joi.object({
        email: JoiUtils.email().optional(),
        phone: JoiUtils.phone().required(),
        fullName: JoiUtils.requiredString().min(1),
        password: JoiUtils.password().required(),
        role: JoiUtils.role().required(),
    }),
);
