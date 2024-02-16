import {
    BadRequestException,
    InternalServerException,
    NotFoundException,
} from 'packages/httpException';
import { getTransaction } from 'core/database';
import { logger } from 'packages/logger';
// import { ForbiddenException } from 'packages/httpException/ForbiddenException';
import {
    CreateMeetingDto, LazyMeetingDto, MeetingDto, PaginationMeetingDto, UpdateMeetingDto
} from './dto';
import { MeetingRepository } from './meeting.repository';
import { PatientRepository } from '../patient/patient.repository';

class Service {
    constructor() {
        this.meetingRepository = MeetingRepository;
        this.patientRepository = PatientRepository;
    }

    async createMeeting(meetingDto, doctorId) {
        const exist = await this.patientRepository.findById(meetingDto.patientId);
        if (exist.length === 0) {
            throw new BadRequestException(
                `Could not find patient with id = ${meetingDto.patientId} to create a meeting`,
            );
        }
        const trx = await getTransaction();
        try {
            const createdMeeting = await this.meetingRepository.createMeeting(
                {
                    ...CreateMeetingDto(meetingDto),
                    doctor_id: doctorId,
                },
                trx,
            );

            trx.commit();

            return LazyMeetingDto(createdMeeting);
        } catch (error) {
            trx.rollback();
            logger.error(error.message);
            throw new InternalServerException(error.message);
        }
    }

    async deleteMeeting(meetingId, doctorId) {
        const trx = await getTransaction();
        let deletedMeeting;
        try {
            deletedMeeting = await this.meetingRepository.deleteByIdAndDoctorId(
                meetingId,
                doctorId,
                trx,
            );
            trx.commit();
        } catch (error) {
            trx.rollback();
            logger.error(error.message);
            throw new InternalServerException(error.message);
        }

        if (deletedMeeting === 0) {
            throw new NotFoundException(
                `No meeting of you found with id = ${meetingId} to delete`,
            );
        }
    }

    async updateMeetingByDoctor(meetingDto, doctorId) {
        const trx = await getTransaction();
        let updatedMeeting;
        try {
            updatedMeeting = await this.meetingRepository.updateMeetingByDoctor(
                UpdateMeetingDto(meetingDto),
                doctorId,
                trx,
            );
            trx.commit();
        } catch (error) {
            trx.rollback();
            logger.error(error.message);
            throw new InternalServerException(error.message);
        }
        if (updatedMeeting === 0) {
            throw new BadRequestException(
                `No Meeting of you found with id = ${meetingDto.id} to update`,
            );
        }
    }

    async getOneById(meetingId) {
        const data = await this.meetingRepository.findById(
            meetingId
        );
        if (!data) {
            throw new NotFoundException(
                `Cannot find meeting with id ${meetingId}`,
            );
        }

        return MeetingDto(data);
    }

    async getMyMeetingsCalendarByDoctor(start, end, doctorId) {
        const data = await this.meetingRepository.findByDoctorIdAndStartTimeBetween(
            doctorId, start, end
        );

        return data.map(meeting => MeetingDto(meeting));
    }

    async getMyMeetingsCalendarByPatient(start, end, patientId) {
        const data = await this.meetingRepository.findByPatientIdAndStartTimeBetween(
            patientId, start, end
        );
        return data.map(meeting => MeetingDto(meeting));
    }

    async getMyMeetingsNotCompletedByPatient(patientId, page = 1, pageSize = 10) {
        const offset = (page - 1) * pageSize;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const total = await this.meetingRepository.countByPatientIdAndStartTimeGreaterEqual(
            patientId, today
        );

        const data = await this.meetingRepository.findByPatientIdAndStartTimeGreaterEqual(
            patientId, offset, pageSize, today
        );
        return PaginationMeetingDto({
            content: data.map(e => MeetingDto(e)),
            pageSize,
            total: total.count,
        });
    }

    async getMyMeetingsNotCompletedByDoctor(doctorId, page = 1, pageSize = 10) {
        const offset = (page - 1) * pageSize;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const total = await this.meetingRepository.countByDoctorIdAndStartTimeGreaterEqual(
            doctorId, today
        );
        const data = await this.meetingRepository.findByDoctorIdAndStartTimeGreaterEqual(
            doctorId, offset, pageSize, today
        );
        return PaginationMeetingDto({
            content: data.map(e => MeetingDto(e)),
            pageSize,
            total: total.count,
        });
    }
}

export const MeetingService = new Service();
