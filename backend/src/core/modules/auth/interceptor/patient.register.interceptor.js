import Joi from 'joi';
import { DefaultValidatorInterceptor } from 'core/infrastructure/interceptor';
import { JoiUtils } from '../../../utils';

export const PatientRegisterInterceptor = new DefaultValidatorInterceptor(
    Joi.object({
        phone: JoiUtils.phone().required(),
        fullName: JoiUtils.requiredString().min(1),
        password: JoiUtils.password().required(),
        gender: JoiUtils.gender().optional(),
        birthday: JoiUtils.date().optional(),
        avatar: JoiUtils.optionalString(),
        address: JoiUtils.optionalString(),
        nationalIdCard: JoiUtils.optionalString(),
        insurance: JoiUtils.optionalString(),
        profesion: JoiUtils.optionalString(),
    }),
);
