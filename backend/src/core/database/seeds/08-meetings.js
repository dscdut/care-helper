/* eslint-disable import/no-extraneous-dependencies */
import { fakerEN } from '@faker-js/faker';
import { numPatients } from './02-patients';
import { numDoctors } from './02-doctors';

const tableName = 'meetings';
export const numMeetings = 1000; // You can adjust the number of meetings you want to create
/**
 * @param {import("knex")} knex
 */
function checkConflict(meeting, meetings) {
    const {
        start_time, end_time, doctor_id, patient_id
    } = meeting;

    // Kiểm tra xem có cuộc họp nào trong meetings xung đột với cuộc họp được cung cấp không
    return meetings.some(existingMeeting => {
        // Kiểm tra xem cuộc họp hiện tại liên quan đến cùng một bác sĩ hoặc bệnh nhân
        if (existingMeeting.doctor_id === doctor_id || existingMeeting.patient_id === patient_id) {
            // Kiểm tra xem có chồng lấp thời gian không
            return (
                (existingMeeting.start_time >= start_time && existingMeeting.start_time < end_time) // Thời gian bắt đầu của cuộc họp hiện tại nằm trong khoảng thời gian của cuộc họp mới
                || (existingMeeting.end_time > start_time && existingMeeting.end_time <= end_time) // Thời gian kết thúc của cuộc họp hiện tại nằm trong khoảng thời gian của cuộc họp mới
                || (existingMeeting.start_time < start_time && existingMeeting.end_time > end_time) // Cuộc họp hiện tại hoàn toàn chứa cuộc họp mới
            );
        }
        return false;
    });
}

exports.seed = async knex => {
    await knex(tableName).del();

    const meetings = [];
    const future90dayTotoday = new Date();
    future90dayTotoday.setDate(future90dayTotoday.getDate() + 90);
    const previous90dayTotoday = new Date();
    previous90dayTotoday.setDate(previous90dayTotoday.getDate() - 90);
    async function generateMeeting() {
        const startTime = fakerEN.date.between({ from: previous90dayTotoday.toString(), to: future90dayTotoday.toString() });
        startTime.setSeconds(0);
        startTime.setMilliseconds(0);
        const endTime = new Date(startTime);
        endTime.setHours(startTime.getHours() + fakerEN.number.int({ min: 1, max: 6 }), fakerEN.number.int({ min: 0, max: 60 }));

        const meeting = {
            title: fakerEN.lorem.words({ min: 1, max: 10 }),
            start_time: startTime,
            end_time: endTime,
            place: fakerEN.location.streetAddress(),
            note: fakerEN.lorem.lines({ max: 5 }),
            doctor_id: fakerEN.number.int({ min: 1, max: numDoctors }),
            patient_id: fakerEN.number.int({ min: 1, max: numPatients }),
            created_at: fakerEN.date.recent({ days: 30, refDate: startTime.toString() }),
        };

        const conflict = await checkConflict(meeting, meetings);
        if (!conflict) {
            meetings.push(meeting);
        } else {
            await generateMeeting(); // Retry if there's a conflict
        }
    }

    // Generate meetings asynchronously
    const generateMeetingPromises = Array.from({ length: numMeetings }, () => generateMeeting());
    await Promise.all(generateMeetingPromises);

    await knex(tableName).insert(meetings);
};
