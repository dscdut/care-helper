import {
    DuplicateException,
    InternalServerException,
} from 'packages/httpException';
import { getTransaction } from 'core/database';
import { logger } from 'packages/logger';
import { SurveyRepository } from '../repository';

class Service {
    constructor() {
        this.surveyRepository = SurveyRepository;
    }

    async createSurvey(patientId, surveyForm, doctorId) {
        const trx = await getTransaction();
        try {
            await this.surveyRepository.createSurvey(
                {
                    patient_id: patientId,
                    form: surveyForm,
                    doctor_id: doctorId,
                },
                trx,
            );
        } catch (error) {
            trx.rollback();
            logger.error(error.message);
            throw new InternalServerException();
        }
        trx.commit();
    }

    // async getPrescriptionById(prescriptionId) {
    //     const prescriptions = await this.prescriptionRepository.findById(
    //         prescriptionId,
    //     );
    //     return PrescriptionDto({ prescription: prescriptions[0] });
    // }

    // async getPrescriptionsByExaminationId(examinationId) {
    //     const prescriptions =
    //         await this.prescriptionRepository.findByExaminationId(
    //             examinationId,
    //         );
    //     return prescriptions.map(e => PrescriptionDto({ prescription: e }));
    // }
}

export const SurveyService = new Service();
