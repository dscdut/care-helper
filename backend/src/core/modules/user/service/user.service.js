import { Role } from 'core/common/enum';
import { UserRepository } from 'core/modules/user/repository/user.repository';
import { Optional, logger } from 'core/utils';
import { getTransaction } from 'core/database';
import {
    DuplicateException,
    InternalServerException,
} from 'packages/httpException';
import { DoctorRepository, PatientRepository } from '../repository';

class Service {
    constructor() {
        this.userRepository = UserRepository;
        this.patientRepository = PatientRepository;
        this.doctorRepository = DoctorRepository;
    }

    async findDoctorByEmail(email) {
        try {
            const data = await this.userRepository.findDoctorByEmail(email);
            return data[0];
        } catch (error) {
            logger.error(error.message);
            throw new InternalServerException();
        }
    }

    async findPatientByPhone(phoneNumber) {
        try {
            const data = await this.userRepository.findPatientByPhone(
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
        doctorRegisterDto.role = Role.DOCTOR;
        try {
            const {
                quota_code,
                expertise,
                experience,
                work_unit,
                certificate,
                ...user
            } = doctorRegisterDto;
            let doctor = {
                quota_code,
                expertise,
                experience,
                work_unit,
                certificate,
            };
            const returnData = await this.userRepository.createUser(user, trx);
            doctor = { user_id: returnData[0].id, ...doctor };
            await this.doctorRepository.upsertDoctor(doctor, trx);
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
        patientRegisterDto.role = Role.PATIENT;
        try {
            const { national_id_card, insurance, profesion, ...user } =
                patientRegisterDto;
            let patient = { national_id_card, insurance, profesion };
            const returnData = await this.userRepository.createUser(user, trx);
            patient = { user_id: returnData[0].id, ...patient };
            await this.patientRepository.upsertPatient(patient, trx);
        } catch (error) {
            await trx.rollback();
            logger.error(error.message);
            throw new InternalServerException();
        }
        trx.commit();
    }
}

export const UserService = new Service();
