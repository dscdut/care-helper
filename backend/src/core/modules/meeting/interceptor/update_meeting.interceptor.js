import { DefaultValidatorInterceptor } from 'core/infrastructure/interceptor';
import { JoiUtils } from 'core/utils';
import Joi from 'joi';

export const UpdateMeetingInterceptor = new DefaultValidatorInterceptor(
    Joi.object({
        id: JoiUtils.positiveNumber().required(),
        title: JoiUtils.requiredString(),
        startTime: JoiUtils.isoDateTime(),
        endTime: JoiUtils.isoDateTime(),
        place: JoiUtils.requiredString(),
        note: JoiUtils.optionalString(),
    }),
);
