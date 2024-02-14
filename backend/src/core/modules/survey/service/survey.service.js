import {
    InternalServerException,
    NotFoundException,
} from 'packages/httpException';
import { getTransaction } from 'core/database';
import { logger } from 'packages/logger';
import { Optional } from 'core/utils';
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

    async getSurveyById(id) {
        const survey = await this.surveyRepository.findById(id);
        return survey[0];
    }

    async deleteSurveyById(id) {
        Optional.of(await this.getSurveyById(id)).throwIfNotPresent(
            new NotFoundException(`Servey with id ${id} does not exist`),
        );
        const trx = await getTransaction();
        try {
            await this.surveyRepository.deleteById(id);
        } catch (error) {
            trx.rollback();
            logger.error(error.message);
            throw new InternalServerException();
        }
        trx.commit();
    }

    // async getPrescriptionsByExaminationId(examinationId) {
    //     const prescriptions =
    //         await this.prescriptionRepository.findByExaminationId(
    //             examinationId,
    //         );
    //     return prescriptions.map(e => PrescriptionDto({ prescription: e }));
    // }
}

export const SurveyService = new Service();
