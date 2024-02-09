import { Optional, logger } from 'core/utils';
import { getTransaction } from 'core/database';
import {
    DuplicateException,
    InternalServerException,
    NotFoundException,
} from 'packages/httpException';
import { DoctorRepository, PatientRepository } from '../repository';
import { DoctorDto } from '../dto/doctor.dto';
import { PatientDto } from '../dto/patient.dto';

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
            if (data.length > 0) return PatientDto(data[0]);
        } catch (error) {
            logger.error(error.message);
            throw new InternalServerException();
        }
        throw new NotFoundException(`Cannot find patient with id ${id}`);
    }

    async findPatientByPhone(phoneNumber) {
        try {
            const data = await this.patientRepository.findByPhone(phoneNumber);
            return PatientDto(data[0]);
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
        await trx.commit();
        return doctorId;
    }

    async updateDoctor(doctorUpdate) {
        let doctor = await this.doctorRepository.findById(doctorUpdate.id);
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
        await trx.commit();
        doctor = await this.doctorRepository.findById(doctorUpdate.id);
        return DoctorDto(doctor[0]);
    }

    async addPatient(patientRegisterDto) {
        const trx = await getTransaction();
        try {
            await this.patientRepository.upsertPatient(patientRegisterDto, trx);
        } catch (error) {
            await trx.rollback();
            logger.error(error.message);
            throw new InternalServerException();
        }
        await trx.commit();
    }

    async updatePatient(patientUpdate) {
        let patient = await this.patientRepository.findById(patientUpdate.id);
        if (patient.length === 0) {
            throw new NotFoundException('Cannot find your account');
        }
        const trx = await getTransaction();
        try {
            await this.patientRepository.upsertPatient(patientUpdate, trx);
        } catch (error) {
            await trx.rollback();
            logger.error(error.message);
            throw new InternalServerException();
        }
        await trx.commit();
        patient = await this.patientRepository.findById(patientUpdate.id);
        return PatientDto(patient[0]);
    }

    async findPatientsByDoctorId(id) {
        try {
            const data = await this.patientRepository.findByDoctorHasExamination(id);
            return data;
        } catch (error) {
            logger.error(error.message);
            throw new InternalServerException();
        }
    }
}

export const UserService = new Service();
