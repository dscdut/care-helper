import { DefaultValidatorInterceptor } from 'core/infrastructure/interceptor';
import { JoiUtils } from 'core/utils';
import Joi from 'joi';

export const CalendarParamsInterceptor = new DefaultValidatorInterceptor(
    Joi.object({
        start: JoiUtils.date(),
        end: JoiUtils.date(),
    }),
);
