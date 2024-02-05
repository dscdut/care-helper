import {
    BadRequestException,
    ForbiddenException,
    InternalServerException,
    NotFoundException,
} from 'packages/httpException';
import { getTransaction } from 'core/database';
import { logger } from 'packages/logger';
import { FOREIGN_KEY_CONSTRAINT_VIOLATION } from 'core/common/exceptions/constants';
import { ExaminationRepository } from '../examination.repository';
import { HospitalRepository } from '../../hospital/hospital.repository';
import { ExaminationDto } from '../dto/examination.dto';

class Service {
    constructor() {
        this.examinationRepository = ExaminationRepository;
        this.hospitalRepository = HospitalRepository;
    }

    async createExamination(createExaminationDto) {
        const trx = await getTransaction();
        try {
            const createdExamination = await this.examinationRepository.createExamination(
                createExaminationDto,
                trx,
            );

            const dataHospitals = createdExamination.hospitalId
                ? await this.hospitalRepository.findById(
                    createdExamination.hospitalId,
                )
                : [undefined];
            trx.commit();

            return ExaminationDto({
                examination: createdExamination,
                hospital: dataHospitals[0],
            });
        } catch (error) {
            trx.rollback();
            logger.error(error.message);
            // Check if the error is a foreign key constraint violation
            if (error.code === FOREIGN_KEY_CONSTRAINT_VIOLATION) {
                // Handle foreign key constraint violation
                throw new BadRequestException(
                    error.message,
                );
            }
            throw new InternalServerException(error.message);
        }
    }

    async deleteEmptyExamination(examinationId, doctorId) {
        const trx = await getTransaction();
        let deletedExamination;
        try {
            deletedExamination = await this.examinationRepository.deleteByIdAndDoctorId(
                examinationId,
                doctorId,
                trx,
            );
        } catch (error) {
            trx.rollback();
            logger.error(error.message);
            throw new InternalServerException(error.message);
        }

        if (deletedExamination === 0) {
            throw new NotFoundException(`No examination of you found with id = ${examinationId} to delete`);
        }
    }

    async updateExaminationByDoctor(examinationDto) {
        const trx = await getTransaction();
        let updatedExamination;
        try {
            updatedExamination = await this.examinationRepository.updateByIdAndDoctorId(
                {
                    id: examinationDto.id,
                    diagnose: examinationDto.diagnose,
                    detail_diagnose: examinationDto.detailDiagnose,
                    advice: examinationDto.advice,
                    hospital_id: examinationDto.hospitalId,
                },
                examinationDto.id,
                examinationDto.doctorId,
                trx,
            );
        } catch (error) {
            trx.rollback();
            logger.error(error.message);
            throw new InternalServerException(error.message);
        }
        trx.commit();
        if (updatedExamination === 0) {
            throw new BadRequestException(`No examination of you found with id = ${examinationDto.id} to update`);
        }
    }

    async getPaginationByDoctorId(doctorId, page = 1, pageSize = 10) {
        const offset = (page - 1) * pageSize;
        const dataExaminations = await this.examinationRepository.findJoinHospitalByDoctorId(
            doctorId,
            offset,
            pageSize,
        );
        return dataExaminations.map(e => ExaminationDto({ examination: e }));
    }

    async getPaginationByPatientId(patientId, page = 1, pageSize = 10) {
        const offset = (page - 1) * pageSize;
        const dataExaminations = await this.examinationRepository.findJoinHospitalByPatientId(
            patientId,
            offset,
            pageSize,
        );
        return dataExaminations.map(e => ExaminationDto({ examination: e }));
    }

    async getOneById(examinationId) {
        const dataExaminations = await this.examinationRepository.findJoinHospitalById(
            examinationId,
        );
        if (dataExaminations.length < 1) {
            throw new NotFoundException(
                `Cannot find examination with id ${examinationId}`,
            );
        }

        return ExaminationDto({
            examination: dataExaminations[0],
        });
    }

    async checkMyExaminationByPatient(examinationId, patientId) {
        const result = await this.examinationRepository.existByIdAndPatientId(examinationId, patientId);
        return result;
    }
}

export const ExaminationService = new Service();
