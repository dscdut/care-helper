import { DataRepository } from 'packages/restBuilder/core/dataHandler/data.repository';

class Repository extends DataRepository {
    createMeeting(meeting, doctorId, trx) {
        let queryBuilder = this.query();

        if (trx) {
            queryBuilder = queryBuilder.transacting(trx);
        }

        const createdMeeting = queryBuilder
            .insert(meeting)
            .returning('*')
            .then(([result]) => ({
                id: result.id,
                startTime: result.start_time,
                endTime: result.end_time,
                place: result.place,
                note: result.note,
                patientId: result.patient_id,
                doctorId: result.doctor_id,
                createdAt: result.created_at,
            }));

        return createdMeeting;
    }

    updateMeetingByDoctor(meeting, doctorId, trx) {
        return this.query()
            .update(meeting)
            .where('meetings.id', '=', meeting.id)
            .andWhere('meetings.doctor_id', '=', doctorId)
            .transacting(trx || undefined);
    }

    deleteByIdAndDoctorId(id, doctorId, trx) {
        return this.query()
            .where('meetings.id', '=', id)
            .andWhere('meetings.doctor_id', '=', doctorId)
            .transacting(trx || undefined)
            .del();
    }

    findByDoctorIdAndStartTimeBetween(doctorId, start, end) {
        return this.query()
            .where('meetings.doctor_id', '=', doctorId)
            .andWhereBetween('meetings.start_time', [start, end])
            .select(
                'meetings.id',
                'meetings.note',
                'meetings.place',
                { startTime: 'meetings.start_time' },
                { endTime: 'meetings.end_time' },
                { doctorId: 'meetings.doctor_id' },
                { patientId: 'meetings.patient_id' },
                { createdAt: 'meetings.created_at' },
            )
            .leftJoin('patients', 'patients.id', 'meetings.patient_id')
            .leftJoin('doctors', 'doctors.id', 'meetings.doctor_id')
            .orderBy('meetings.start_time', 'asc');
    }

    findByPatientIdAndStartTimeBetween(patientId, start, end) {
        return this.query()
            .where('meetings.patient_id', '=', patientId)
            .andWhereBetween('meetings.start_time', [start, end])
            .select(
                'meetings.id',
                'meetings.note',
                'meetings.place',
                { startTime: 'meetings.start_time' },
                { endTime: 'meetings.end_time' },
                { doctorId: 'meetings.doctor_id' },
                { patientId: 'meetings.patient_id' },
                { createdAt: 'meetings.created_at' },
                { doctorName: 'doctors.full_name' },
                { doctorPhone: 'doctors.phone' },
                { patientName: 'patients.full_name' },
                { patientPhone: 'patients.phone' },
            )
            .leftJoin('patients', 'patients.id', 'meetings.patient_id')
            .leftJoin('doctors', 'doctors.id', 'meetings.doctor_id')
            .orderBy('meetings.start_time', 'asc');
    }

    findById(id) {
        return this.query()
            .where('meetings.id', '=', id)
            .select(
                'meetings.id',
                'meetings.note',
                'meetings.place',
                { startTime: 'meetings.start_time' },
                { endTime: 'meetings.end_time' },
                { doctorId: 'meetings.doctor_id' },
                { patientId: 'meetings.patient_id' },
                { createdAt: 'meetings.created_at' },
            )
            .first();
    }

    findByIdAndPatientId(id, patientId) {
        return this.query()
            .where('meetings.id', '=', id)
            .andWhere('meetings.patient_id', '=', patientId)
            .select(
                'meetings.id',
                'meetings.note',
                'meetings.place',
                { startTime: 'meetings.start_time' },
                { endTime: 'meetings.end_time' },
                { doctorId: 'meetings.doctor_id' },
                { patientId: 'meetings.patient_id' },
                { createdAt: 'meetings.created_at' },
            )
            .first();
    }

    findByDoctorIdAndStartTimeGreaterEqual(doctorId, offset, pageSize, today) {
        return this.query()
            .where('meetings.doctor_id', '=', doctorId)
            .andWhere('meetings.start_time', '>=', today)
            .select(
                'meetings.id',
                'meetings.note',
                'meetings.place',
                { startTime: 'meetings.start_time' },
                { endTime: 'meetings.end_time' },
                { doctorId: 'meetings.doctor_id' },
                { patientId: 'meetings.patient_id' },
                { createdAt: 'meetings.created_at' },
                { doctorName: 'doctors.full_name' },
                { doctorPhone: 'doctors.phone' },
                { patientName: 'patients.full_name' },
                { patientPhone: 'patients.phone' },
            )
            .leftJoin('patients', 'patients.id', 'meetings.patient_id')
            .leftJoin('doctors', 'doctors.id', 'meetings.doctor_id')
            .orderBy('meetings.start_time', 'asc')
            .offset(offset)
            .limit(pageSize);
    }

    countByDoctorIdAndStartTimeGreaterEqual(doctorId, today) {
        return this.query()
            .where('meetings.doctor_id', '=', doctorId)
            .andWhere('meetings.start_time', '>=', today)
            .count('meetings.id')
            .first();
    }

    findByPatientIdAndStartTimeGreaterEqual(patientId, offset, pageSize, today) {
        return this.query()
            .where('meetings.patient_id', '=', patientId)
            .andWhere('meetings.start_time', '>=', today)
            .select(
                'meetings.id',
                'meetings.note',
                'meetings.place',
                { startTime: 'meetings.start_time' },
                { endTime: 'meetings.end_time' },
                { doctorId: 'meetings.doctor_id' },
                { patientId: 'meetings.patient_id' },
                { createdAt: 'meetings.created_at' },
                { doctorName: 'doctors.full_name' },
                { doctorPhone: 'doctors.phone' },
                { patientName: 'patients.full_name' },
                { patientPhone: 'patients.phone' },
            )
            .leftJoin('patients', 'patients.id', 'meetings.patient_id')
            .leftJoin('doctors', 'doctors.id', 'meetings.doctor_id')
            .orderBy('meetings.start_time', 'asc')
            .offset(offset)
            .limit(pageSize);
    }

    countByPatientIdAndStartTimeGreaterEqual(patientId, today) {
        return this.query()
            .where('meetings.patient_id', '=', patientId)
            .andWhere('meetings.start_time', '>=', today)
            .count('meetings.id')
            .first();
    }
}

export const MeetingRepository = new Repository('meetings');
