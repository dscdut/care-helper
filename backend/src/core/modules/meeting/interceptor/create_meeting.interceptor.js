import { DefaultValidatorInterceptor } from 'core/infrastructure/interceptor';
import { JoiUtils } from 'core/utils';
import Joi from 'joi';

export const CreateMeetingInterceptor = new DefaultValidatorInterceptor(
    Joi.object({
        startTime: JoiUtils.isoDateTime(),
        title: JoiUtils.requiredString(),
        endTime: JoiUtils.isoDateTime(),
        place: JoiUtils.requiredString(),
        note: JoiUtils.optionalString(),
        patientId: JoiUtils.positiveNumber().required(),
    }),
);
