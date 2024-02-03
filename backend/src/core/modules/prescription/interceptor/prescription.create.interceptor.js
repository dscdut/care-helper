import { DefaultValidatorInterceptor } from 'core/infrastructure/interceptor';
import { JoiUtils } from 'core/utils';
import Joi from 'joi';

export const CreatePrescriptionInterceptor = new DefaultValidatorInterceptor(
    Joi.object({
        note: JoiUtils.optionalString(),
        details: JoiUtils.medicineRecord(),
        startTime: JoiUtils.dateTime().required(),
        endTime: JoiUtils.dateTime().required(),
        prescriptionFilename: JoiUtils.optionalString(),
        examinationId: JoiUtils.positiveNumber().required(),
    }),
);
