import Joi from 'joi';
import { DefaultValidatorInterceptor } from 'core/infrastructure/interceptor';
import { JoiUtils } from '../../../utils';

export const DoctorVerifyInterceptor = new DefaultValidatorInterceptor(
    Joi.object({
        phone: JoiUtils.phone().required(),
        fullName: JoiUtils.requiredString(),
        quotaCode: JoiUtils.numberString().required(),
        expertise: JoiUtils.requiredString(),
        experience: JoiUtils.requiredString(),
        workUnit: JoiUtils.requiredString(),
        certificateName: JoiUtils.requiredString(),
        certificateNumber: JoiUtils.numberString().required(),
        certificateProvider: JoiUtils.requiredString(),
    }),
);
