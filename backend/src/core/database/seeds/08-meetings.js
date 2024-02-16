/**
 * @param {import("knex")} knex
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import { fa, fakerEN } from '@faker-js/faker';
import { numPatients } from './02-patients';
import { numDoctors } from './02-doctors';

const tableName = 'meetings';
export const numMeetings = 1000;// You can adjust the number of meetings you want to create
exports.seed = async knex => {
    await knex(tableName).del();

    const meetings = [];

    const future90dayTotoday = new Date();
    future90dayTotoday.setDate(future90dayTotoday.getDate() + 90);

    const previous90dayTotoday = new Date();
    previous90dayTotoday.setDate(previous90dayTotoday.getDate() - 90);

    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= numMeetings; i++) {
        const startTime = fakerEN.date.between({ from: previous90dayTotoday.toString(), to: future90dayTotoday.toString() });
        startTime.setSeconds(0);
        const endTime = new Date(startTime);
        endTime.setHours(startTime.getHours() + fakerEN.number.int({ min: 1, max: 6 }), fakerEN.number.int({ min: 0, max: 60 }));

        const meeting = {
            start_time: startTime,
            end_time: endTime,
            place: fakerEN.location.streetAddress(),
            note: fakerEN.lorem.lines({ max: 5 }),
            doctor_id: fakerEN.number.int({ min: 1, max: numDoctors }),
            patient_id: fakerEN.number.int({ min: 1, max: numPatients }),
            created_at: fakerEN.date.recent({ days: 30, refDate: startTime.toString() }),
        };

        meetings.push(meeting);
    }

    await knex(tableName).insert(meetings);
};
