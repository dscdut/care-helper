import { Optional, logger } from 'core/utils';
import { getTransaction } from 'core/database';
import {
    DuplicateException,
    InternalServerException,
    NotFoundException,
} from 'packages/httpException';
import { MessageDto } from 'core/common/dto/message.dto';
import { MESSAGE } from 'core/modules/auth/service/message.enum';
import { DoctorRepository, PatientRepository } from '../repository';

class Service {
    constructor() {
        this.patientRepository = PatientRepository;
        this.doctorRepository = DoctorRepository;
    }

    async findDoctorByEmail(email) {
        try {
            const data = await this.doctorRepository.findByEmail(email);
            return data[0];
        } catch (error) {
            logger.error(error.message);
            throw new InternalServerException();
        }
    }

    async findDoctorById(id) {
        try {
            const data = await this.doctorRepository.findById(id);
            if (data.length > 0) return data[0];
        } catch (error) {
            logger.error(error.message);
            throw new InternalServerException();
        }
        throw new NotFoundException(`Cannot find doctor with id ${id}`);
    }

    async findPatientById(id) {
        try {
            const data = await this.patientRepository.findById(id);
            if (data.length > 0) return data[0];
        } catch (error) {
            logger.error(error.message);
            throw new InternalServerException();
        }
        throw new NotFoundException(`Cannot find patient with id ${id}`);
    }

    async findPatientByPhone(phoneNumber) {
        try {
            const data = await this.patientRepository.findByPhone(phoneNumber);
            return data[0];
        } catch (error) {
            logger.error(error.message);
            throw new InternalServerException();
        }
    }

    async addDoctor(doctorRegisterDto) {
        if (doctorRegisterDto.email) {
            Optional.of(
                await this.findDoctorByEmail(doctorRegisterDto.email),
            ).throwIfPresent(
                new DuplicateException('This email is already existed'),
            );
        }
        const trx = await getTransaction();
        let doctorId;
        try {
            const returnData = await this.doctorRepository.upsertDoctor(
                doctorRegisterDto,
                trx,
            );
            doctorId = returnData[0].id;
        } catch (error) {
            await trx.rollback();
            logger.error(error.message);
            throw new InternalServerException();
        }
        trx.commit();
        return doctorId;
    }

    async updateDoctor(doctorUpdate) {
        const doctor = await this.doctorRepository.findById(doctorUpdate.id);
        if (doctor.length === 0) {
            throw new NotFoundException('Cannot find your account');
        }
        const trx = await getTransaction();
        try {
            await this.doctorRepository.upsertDoctor(doctorUpdate, trx);
        } catch (error) {
            await trx.rollback();
            logger.error(error.message);
            throw new InternalServerException();
        }
        trx.commit();
        return MessageDto({
            message: MESSAGE.VERIFY_SUCCESS,
        });
    }

    async addPatient(patientRegisterDto) {
        if (patientRegisterDto.phone) {
            Optional.of(
                await this.findPatientByPhone(patientRegisterDto.phone),
            ).throwIfPresent(
                new DuplicateException('This phone number is already existed'),
            );
        }
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

    async updatePatient(patientVerifyDto, id) {
        const patient = await this.patientRepository.findById(id);
        if (patient.length === 0) {
            throw new NotFoundException('Cannot find your account');
        }
        const trx = await getTransaction();
        try {
            await this.patientRepository.upsertPatient(
                { id, ...patientVerifyDto },
                trx,
            );
        } catch (error) {
            await trx.rollback();
            logger.error(error.message);
            throw new InternalServerException();
        }
        trx.commit();
        return MessageDto({
            message: MESSAGE.VERIFY_SUCCESS,
        });
    }
}

export const UserService = new Service();
