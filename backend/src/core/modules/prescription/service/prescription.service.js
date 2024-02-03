import { InternalServerException } from 'packages/httpException';
import { getTransaction } from 'core/database';
import { logger } from 'packages/logger';
import { MESSAGE } from './message.enum';
import { PrescriptonRepository } from '../repository';
import { PrescriptionDto } from '../dto/prescription.dto';
import { CreatePrescriptionResponseDto } from '../dto/prescription.create.response.dto';

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
        return CreatePrescriptionResponseDto({
            message: MESSAGE.PRESCRIPTION_CREATED,
        });
    }

    async getPrescriptionById(prescriptionId) {
        const prescriptions = await this.prescriptionRepository.findById(
            prescriptionId,
        );
        return PrescriptionDto({ prescription: prescriptions[0] });
    }
}

export const PrescriptionService = new Service();
