import { DefaultValidatorInterceptor } from 'core/infrastructure/interceptor';
import { JoiUtils } from 'core/utils';
import Joi from 'joi';

export const CreatePrescriptionInterceptor = new DefaultValidatorInterceptor(
    Joi.object({
        note: JoiUtils.optionalString(),
        details: JoiUtils.medicineRecord(),
        startDate: JoiUtils.date().required(),
        endDate: JoiUtils.date().required(),
        prescriptionFilename: JoiUtils.optionalString(),
        examinationId: JoiUtils.positiveNumber().required(),
    }),
);
