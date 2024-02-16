import { Module } from 'packages/handler/Module';
import { RecordId, page, size } from 'core/common/swagger';
import {
    CalendarParamsInterceptor,
    CreateMeetingInterceptor,
    UpdateMeetingInterceptor,
} from 'core/modules/meeting';
import { hasDoctorOrPatientRole, hasDoctorRole } from 'core/modules/auth/guard';
import { start } from 'core/common/swagger/start';
import { end } from 'core/common/swagger/end';
import { MeetingController } from './meeting.controller';

export const MeetingResolver = Module.builder()
    .addPrefix({
        prefixPath: '/meetings',
        tag: 'meetings',
        module: 'MeetingModule',
    })
    .register([
        {
            route: '/calendar',
            method: 'get',
            interceptors: [CalendarParamsInterceptor],
            params: [start, end],
            guards: [hasDoctorOrPatientRole],
            controller: MeetingController.getMeetingCalendar,
            model: {
                type: 'array',
                items: { $ref: 'MeetingDto' },
            },
            description:
                'Get all meetings of patient or doctor from start to end. By default, all meetings will be taken today',
            preAuthorization: true,
        },
        {
            route: '',
            method: 'get',
            params: [page, size],
            guards: [hasDoctorOrPatientRole],
            controller: MeetingController.getMyMeeting,
            model: { $ref: 'PaginationMeetingDto' },
            description:
                'Get a list of meetings in the following days, in ascending time order',
            preAuthorization: true,
        },
        {
            route: '/:id',
            method: 'get',
            params: [RecordId],
            guards: [hasDoctorOrPatientRole],
            controller: MeetingController.getDetailMyMeeting,
            model: { $ref: 'MeetingDto' },
            description: 'Get my meeting data as a patient or doctor.',
            preAuthorization: true,
        },
        {
            route: '',
            method: 'post',
            interceptors: [CreateMeetingInterceptor],
            body: 'CreateMeetingDto',
            guards: [hasDoctorRole],
            controller: MeetingController.createMeeting,
            model: { $ref: 'LazyMeetingDto' },
            preAuthorization: true,
            description: 'create a new meeting with all fields',
        },
        {
            route: '',
            method: 'put',
            interceptors: [UpdateMeetingInterceptor],
            body: 'UpdateMeetingDto',
            guards: [hasDoctorRole],
            controller: MeetingController.updateMeeting,
            model: { $ref: 'MessageDto' },
            preAuthorization: true,
            description:
                'Update meeting information with fields such as note, place, start time, end time',
        },
        {
            route: '/:id',
            method: 'delete',
            params: [RecordId],
            guards: [hasDoctorRole],
            controller: MeetingController.deleteMeeting,
            model: { $ref: 'MessageDto' },
            description:
                'As a doctor, a meeting that the doctor has created can only be deleted',
            preAuthorization: true,
        },
    ]);
