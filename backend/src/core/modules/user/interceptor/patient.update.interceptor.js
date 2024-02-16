import Joi from 'joi';
import { DefaultValidatorInterceptor } from 'core/infrastructure/interceptor';
import { JoiUtils } from '../../../utils';

export const UpdatePatientInterceptor = new DefaultValidatorInterceptor(
    Joi.object({
        fullName: JoiUtils.requiredString(),
        gender: JoiUtils.requiredString(),
        birthday: JoiUtils.date().required(),
        address: JoiUtils.requiredString(),
        nationalIdCard: JoiUtils.numberString(),
        insurance: JoiUtils.requiredString(),
        profesion: JoiUtils.requiredString(),
        height: JoiUtils.requiredString(),
        weight: JoiUtils.requiredString(),
    }),
);
