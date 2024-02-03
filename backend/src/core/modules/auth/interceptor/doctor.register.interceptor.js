import Joi from 'joi';
import { DefaultValidatorInterceptor } from 'core/infrastructure/interceptor';
import { JoiUtils } from '../../../utils';

export const DoctorRegisterInterceptor = new DefaultValidatorInterceptor(
    Joi.object({
        email: JoiUtils.email().required(),
        phone: JoiUtils.phone().optional(),
        fullName: JoiUtils.requiredString().min(1),
        password: JoiUtils.password().required(),
        gender: JoiUtils.gender().optional(),
        birthday: JoiUtils.date().optional(),
        avatar: JoiUtils.optionalString(),
        address: JoiUtils.optionalString(),
        quotaCode: JoiUtils.optionalString(),
        expertise: JoiUtils.optionalString(),
        experience: JoiUtils.optionalString(),
        workUnit: JoiUtils.optionalString(),
        certificate: JoiUtils.optionalString(),
    }),
);
