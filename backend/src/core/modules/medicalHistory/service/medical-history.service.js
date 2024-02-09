import {
    DuplicateException,
    InternalServerException,
    NotFoundException,
} from 'packages/httpException';
import { getTransaction } from 'core/database';
import { logger } from 'packages/logger';
import { MessageDto } from 'core/common/dto';
import { Optional } from 'core/utils';
import { MedicalHistoryRepository } from '../repository';
import { MedicalHistoryDto } from '../dto';

class Service {
    constructor() {
        this.medicalHistoryRepository = MedicalHistoryRepository;
    }

    async createMedicalHistory(createMedicalHistoryDto, patientId) {
        Optional.of(
            await this.medicalHistoryRepository.findByPatientId(patientId),
        ).throwIfPresent(
            new DuplicateException(
                'Medical history for this patient is already existed',
            ),
        );
        const trx = await getTransaction();
        try {
            await this.medicalHistoryRepository.upsert(
                { patient_id: patientId, ...createMedicalHistoryDto },
                trx,
            );
        } catch (error) {
            trx.rollback();
            logger.error(error.message);
            throw new InternalServerException();
        }
        await trx.commit();
        return MessageDto({
            message: 'Medical history created',
        });
    }

    async updateMedicalHistory(updateMedicalHistoryDto, patientId) {
        const trx = await getTransaction();
        try {
            await this.medicalHistoryRepository.upsert(
                { patient_id: patientId, ...updateMedicalHistoryDto },
                trx,
            );
        } catch (error) {
            trx.rollback();
            logger.error(error.message);
            throw new InternalServerException();
        }
        await trx.commit();
        return MessageDto({
            message: 'Medical history updated',
        });
    }

    async getMedicalHistoryByPatientId(patientId) {
        const medicalHistories = await this.medicalHistoryRepository.findByPatientId(patientId);
        if (medicalHistories.length > 0) {
            return MedicalHistoryDto({ medicalHistory: medicalHistories[0] });
        }
        throw new NotFoundException(
            'Cannot found medical history for this patient',
        );
    }
}

export const MedicalHistoryService = new Service();
