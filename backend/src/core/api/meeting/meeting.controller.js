import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from 'core/common/constants';
import { MessageDto } from 'core/common/dto';
import { Role } from 'core/common/enum';
import { MeetingService } from 'core/modules/meeting';
import { ValidHttpResponse } from 'packages/handler/response/validHttp.response';
import { BadRequestException, ForbiddenException } from 'packages/httpException';

class Controller {
    constructor() {
        this.meetingService = MeetingService;
    }

    createMeeting = async req => {
        if (req.body.startTime >= req.body.endTime) {
            throw new BadRequestException('Invalid data. The start time must be less than the end time');
        }
        const data = await this.meetingService.createMeeting(
            req.body,
            req.user.payload.id,
        );
        return ValidHttpResponse.toOkResponse(data);
    };

    updateMeeting = async req => {
        if (req.body.startTime >= req.body.endTime) {
            throw new BadRequestException('Invalid data. The start time must be less than the end time');
        }
        const doctorId = req.user.payload.id;
        await this.meetingService.updateMeetingByDoctor(req.body, doctorId);
        return ValidHttpResponse.toOkResponse(
            MessageDto({ message: 'Update meeting successfully!' }),
        );
    };

    deleteMeeting = async req => {
        const doctorId = req.user.payload.id;
        await this.meetingService.deleteMeeting(req.params.id, doctorId);
        return ValidHttpResponse.toOkResponse(
            MessageDto({ message: 'Delete meeting successfully!' }),
        );
    };

    getDetailMyMeeting = async req => {
        const data = await this.meetingService.getOneById(req.params.id);
        const userId = req.user.payload.id;
        const userRole = req.user.payload.role;

        if (
            (userRole === Role.PATIENT && data.patientId !== userId)// Patients cannot access other people's meetings
            || (userRole === Role.DOCTOR && data.doctorId !== userId)// Doctors cannot access other people's meetings
        ) {
            throw new ForbiddenException();
        }
        return ValidHttpResponse.toOkResponse(data);
    };

    getMeetingCalendar = async req => {
        const userId = req.user.payload.id;
        const userRole = req.user.payload.role;
        // format date to date time
        // convert date format to date time format at the start of a day
        const startTime = req.query.start ? new Date(req.query.start) : new Date();
        startTime.setHours(0, 0, 0, 0);
        // convert date format to date time format at the end of a day
        const endTime = req.query.start ? new Date(req.query.end) : new Date();
        endTime.setHours(23, 59, 59, 999);
        let data;
        if (userRole === Role.PATIENT) {
            data = await this.meetingService.getMyMeetingsCalendarByPatient(
                startTime, endTime, userId
            );
        }

        if (userRole === Role.DOCTOR) {
            data = await this.meetingService.getMyMeetingsCalendarByDoctor(
                startTime, endTime, userId
            );
        }

        return ValidHttpResponse.toOkResponse(data);
    };

    getMyMeeting = async req => {
        const userId = req.user.payload.id;
        const userRole = req.user.payload.role;
        const page = req.query.page || DEFAULT_PAGE;
        const size = req.query.size || DEFAULT_PAGE_SIZE;

        let data;
        if (userRole === Role.PATIENT) {
            data = await this.meetingService.getMyMeetingsNotCompletedByPatient(
                userId, page, size,
            );
        }

        if (userRole === Role.DOCTOR) {
            data = await this.meetingService.getMyMeetingsNotCompletedByDoctor(
                userId, page, size,
            );
        }

        return ValidHttpResponse.toOkResponse(data);
    };
}

export const MeetingController = new Controller();
