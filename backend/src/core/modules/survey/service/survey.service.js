import {
    InternalServerException,
    NotFoundException,
} from 'packages/httpException';
import { getTransaction } from 'core/database';
import { logger } from 'packages/logger';
import { Optional } from 'core/utils';
import { FormStatus } from 'core/common/enum';
import { SurveyRepository } from '../repository';
import { SurveyDto } from '../dto/survey.dto';

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

    async getSurveyPaginationByPatientId(patientId, page = 1, pageSize = 10) {
        const offset = (page - 1) * pageSize;
        const total = await this.surveyRepository.countByPatientId(patientId);
        const data = await this.surveyRepository.findByPatientId(
            patientId,
            offset,
            pageSize,
        );
        return {
            content: data.map(e => SurveyDto(e)),
            pageSize,
            total: parseInt(total.count, 10),
        };
    }

    async fillSurvey(id, form) {
        Optional.of(await this.getSurveyById(id)).throwIfNotPresent(
            new NotFoundException(`Servey with id ${id} does not exist`),
        );
        const trx = await getTransaction();
        try {
            await this.surveyRepository.update(
                id,
                { form, status: FormStatus.DONE },
                trx,
            );
        } catch (error) {
            trx.rollback();
            logger.error(error.message);
            throw new InternalServerException();
        }
        trx.commit();
    }

    async getSurveyPaginationByDoctorId(doctorId, page = 1, pageSize = 10) {
        const offset = (page - 1) * pageSize;
        const total = await this.surveyRepository.countByDoctorId(doctorId);
        const data = await this.surveyRepository.findByDoctorId(
            doctorId,
            offset,
            pageSize,
        );
        return {
            content: data.map(e => SurveyDto(e)),
            pageSize,
            total: parseInt(total.count, 10),
        };
    }
}

export const SurveyService = new Service();
