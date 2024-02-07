import {
    InternalServerException,
    NotFoundException,
} from 'packages/httpException';
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
        trx.commit();
        return CreatePrescriptionResponseDto({
            message: MESSAGE.PRESCRIPTION_CREATED,
        });
    }

    async getPrescriptionById(prescriptionId) {
        const prescriptions = await this.prescriptionRepository.findById(
            prescriptionId,
        );
        if (prescriptions.length > 0)
            return PrescriptionDto({ prescription: prescriptions[0] });
        throw new NotFoundException(
            `Cannot find prescription with id ${prescriptionId}`,
        );
    }
}

export const PrescriptionService = new Service();
