import {
    BadRequestException,
    InternalServerException,
    NotFoundException,
} from 'packages/httpException';
import { getTransaction } from 'core/database';
import { logger } from 'packages/logger';
import { ExaminationRepository } from 'core/modules/examination/examination.repository';
import { ForbiddenException } from 'packages/httpException/ForbiddenException';
import { CreateTestDto, MedicalTestDto, UpdateTestDto } from '../dto';
import { TestRepository } from '../medical_test.repository';

class Service {
    constructor() {
        this.medicalTestRepository = TestRepository;
        this.examinationRepository = ExaminationRepository;
    }

    async createMedicalTest(medicalTestDto, doctorId) {
        const existExamination = await this.examinationRepository.findById(
            medicalTestDto.examinationId,
        );
        if (existExamination.length === 0) {
            throw new BadRequestException(
                `No examination found with id = ${medicalTestDto.examinationId} to create a medical test`,
            );
        } else if (existExamination[0].doctorId !== doctorId) {
            throw new ForbiddenException(`You do not have access to this examination id = ${medicalTestDto.examinationId} to create a medical test`);
        }
        const trx = await getTransaction();
        try {
            const createdTest = await this.medicalTestRepository.createTest(
                CreateTestDto(medicalTestDto),
                trx,
            );

            trx.commit();

            return MedicalTestDto(createdTest);
        } catch (error) {
            trx.rollback();
            logger.error(error.message);
            throw new InternalServerException(error.message);
        }
    }

    async deleteMedicalTest(testId, doctorId) {
        const trx = await getTransaction();
        let deletedTest;
        try {
            deletedTest = await this.medicalTestRepository.deleteByIdAndExaminationDoctorId(
                testId,
                doctorId,
                trx,
            );
        } catch (error) {
            trx.rollback();
            logger.error(error.message);
            throw new InternalServerException(error.message);
        }

        if (deletedTest === 0) {
            throw new NotFoundException(
                `No medical test of you found with id = ${testId} to delete`,
            );
        }
    }

    async updateMedicalTestByDoctor(medicalTestDto, doctorId) {
        const trx = await getTransaction();
        let updatedTest;
        try {
            updatedTest = await this.medicalTestRepository.updateByIdAndDoctorId(
                UpdateTestDto(medicalTestDto),
                doctorId,
                trx,
            );
            trx.commit();
        } catch (error) {
            trx.rollback();
            logger.error(error.message);
            throw new InternalServerException(error.message);
        }
        if (updatedTest === 0) {
            throw new BadRequestException(
                `No medical test of you found with id = ${medicalTestDto.id} to update`,
            );
        }
    }

    async getPaginationByDoctorId(doctorId, page = 1, pageSize = 10) {
        const offset = (page - 1) * pageSize;
        const dataExaminations = await this.medicalTestRepository.findByExaminationDoctorId(
            doctorId,
            offset,
            pageSize,
        );
        return dataExaminations.map(e => MedicalTestDto(e));
    }

    async getPaginationByPatientId(patientId, page = 1, pageSize = 10) {
        const offset = (page - 1) * pageSize;
        const dataExaminations = await this.medicalTestRepository.findByExaminationPatientId(
            patientId,
            offset,
            pageSize,
        );
        return dataExaminations.map(e => MedicalTestDto(e));
    }

    async getOneById(testId) {
        const dataTests = await this.medicalTestRepository.findJoinExaminationPatientIdAndDoctorIdById(testId);
        if (dataTests.length < 1) {
            throw new NotFoundException(
                `Cannot find Medical Test with id ${testId}`,
            );
        }

        return MedicalTestDto(dataTests[0]);
    }
}

export const MedicalTestService = new Service();
