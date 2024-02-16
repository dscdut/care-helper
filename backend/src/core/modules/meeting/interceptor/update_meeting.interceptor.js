import { DefaultValidatorInterceptor } from 'core/infrastructure/interceptor';
import { JoiUtils } from 'core/utils';
import Joi from 'joi';

export const UpdateMeetingInterceptor = new DefaultValidatorInterceptor(
    Joi.object({
        id: JoiUtils.positiveNumber().required(),
        startTime: JoiUtils.dateTime(),
        endTime: JoiUtils.dateTime(),
        place: JoiUtils.requiredString(),
        note: JoiUtils.optionalString(),
    }),
);
