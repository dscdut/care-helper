import { InternalServerException } from 'packages/httpException';
import { getTransaction } from 'core/database';
import { logger } from 'packages/logger';
import { MessageDto } from 'core/common/dto';
import { MESSAGE } from './message.enum';
import { PrescriptonRepository } from '../repository';
import { PrescriptionDto } from '../dto/prescription.dto';

class Service {
    constructor() {
        this.prescriptionRepository = PrescriptonRepository;
    }

    async createPrescription(createPrescriptionDto) {
        const trx = await getTransaction();
        try {
            await this.prescriptionRepository.createPrescription(
                createPrescriptionDto,
                trx,
            );
        } catch (error) {
            trx.rollback();
            logger.error(error.message);
            throw new InternalServerException();
        }
        await trx.commit();
        return MessageDto({
            message: MESSAGE.PRESCRIPTION_CREATED,
        });
    }

    async getPrescriptionById(prescriptionId) {
        const prescriptions = await this.prescriptionRepository.findById(
            prescriptionId,
        );
        return PrescriptionDto({ prescription: prescriptions[0] });
    }

    async getPrescriptionsByExaminationId(examinationId) {
        const prescriptions = await this.prescriptionRepository.findByExaminationId(
            examinationId,
        );
        return prescriptions.map(e => PrescriptionDto({ prescription: e }));
    }
}

export const PrescriptionService = new Service();
