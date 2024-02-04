import { Role } from 'core/common/enum';
import { Gender } from 'core/common/enum/gender.enum';
import Joi from 'joi';

const MONGOOSE_ID_OBJECT_FORMAT = /^[0-9a-fA-F]{24}$/;

const DATE_YYYY_MM_DD_FORMAT = /^\d{4}-\d{2}-\d{2}$/;

const DATETIME_YYYY_MM_DD_HH_MM_SS_FORMAT = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

// Required from 6-30 char, contains special char
const PWD_FORMAT = /^[a-zA-Z0-9\d@$!%*?&]{6,30}$/;

const NUMBER_FORMAT = /^[0-9]+$/;

export class JoiUtils {
    static objectId() {
        return Joi.string().regex(MONGOOSE_ID_OBJECT_FORMAT);
    }

    static dateTime(custom = false) {
        return custom
            ? Joi.string().regex(DATETIME_YYYY_MM_DD_HH_MM_SS_FORMAT)
            : Joi.string()
                .regex(DATETIME_YYYY_MM_DD_HH_MM_SS_FORMAT)
                .message(
                    'Invalid date format. Should be YYYY-MM-DD HH:MM:SS',
                );
    }

    static #PrescriptionDetailSchema = Joi.object({
        medicineName: Joi.string().required(),
        usage: Joi.string().required(),
        quantity: Joi.string().required(),
    });

    static medicineRecord() {
        return Joi.array().items(this.#PrescriptionDetailSchema).optional();
    }

    static role() {
        return Joi.string().valid(...Object.values(Role));
    }

    static otp() {
        return Joi.string().length(6);
    }

    static gender() {
        return Joi.string().valid(...Object.values(Gender));
    }

    static optionalString() {
        return Joi.string().optional();
    }

    static requiredString() {
        return Joi.string().trim().required();
    }

    static password() {
        return Joi.string().regex(PWD_FORMAT);
    }

    static phone = () => Joi.string().regex(NUMBER_FORMAT);

    static numberString = () => Joi.string().regex(NUMBER_FORMAT);

    static email = () => Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
    });

    static date(custom = false) {
        return custom
            ? Joi.string().regex(DATE_YYYY_MM_DD_FORMAT)
            : Joi.string()
                .regex(DATE_YYYY_MM_DD_FORMAT)
                .message('Invalid date format. Should be YYYY-MM-DD');
    }

    static positiveNumber() {
        return Joi.number().positive().greater(0);
    }

    static optionalStrings() {
        return Joi.array().items(JoiUtils.optionalString()).min(1);
    }

    static ObjectIds() {
        return Joi.array().items(this.objectId());
    }
}
