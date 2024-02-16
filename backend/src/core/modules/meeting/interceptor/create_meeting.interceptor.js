import { DefaultValidatorInterceptor } from 'core/infrastructure/interceptor';
import { JoiUtils } from 'core/utils';
import Joi from 'joi';

export const CreateMeetingInterceptor = new DefaultValidatorInterceptor(
    Joi.object({
        startTime: JoiUtils.dateTime(),
        endTime: JoiUtils.dateTime(),
        place: JoiUtils.requiredString(),
        note: JoiUtils.optionalString(),
        patientId: JoiUtils.positiveNumber().required(),
    }),
);
