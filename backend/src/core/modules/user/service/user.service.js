import { Optional, logger } from 'core/utils';
import { getTransaction } from 'core/database';
import {
    DuplicateException,
    InternalServerException,
} from 'packages/httpException';
import { DoctorRepository, PatientRepository } from '../repository';

class Service {
    constructor() {
        this.patientRepository = PatientRepository;
        this.doctorRepository = DoctorRepository;
    }

    async findDoctorByEmail(email) {
        try {
            const data = await this.doctorRepository.findDoctorByEmail(email);
            return data[0];
        } catch (error) {
            logger.error(error.message);
            throw new InternalServerException();
        }
    }

    async findPatientByPhone(phoneNumber) {
        try {
            const data = await this.patientRepository.findPatientByPhone(
                phoneNumber,
            );
            return data[0];
        } catch (error) {
            logger.error(error.message);
            throw new InternalServerException();
        }
    }

    async addDoctor(doctorRegisterDto) {
        if (doctorRegisterDto.email)
            Optional.of(
                await this.findDoctorByEmail(doctorRegisterDto.email),
            ).throwIfPresent(
                new DuplicateException('This email is already existed'),
            );
        const trx = await getTransaction();
        try {
            await this.doctorRepository.upsertDoctor(doctorRegisterDto, trx);
        } catch (error) {
            await trx.rollback();
            logger.error(error.message);
            throw new InternalServerException();
        }
        trx.commit();
    }

    async addPatient(patientRegisterDto) {
        if (patientRegisterDto.phone)
            Optional.of(
                await this.findPatientByPhone(patientRegisterDto.phone),
            ).throwIfPresent(
                new DuplicateException('This phone number is already existed'),
            );
        const trx = await getTransaction();
        try {
            await this.patientRepository.upsertPatient(patientRegisterDto, trx);
        } catch (error) {
            await trx.rollback();
            logger.error(error.message);
            throw new InternalServerException();
        }
        trx.commit();
    }
}

export const UserService = new Service();
