import { DataRepository } from 'packages/restBuilder/core/dataHandler/data.repository';

class Repository extends DataRepository {
    createSurvey(survey, trx) {
        if (trx) return this.query().insert(survey).transacting(trx);
        return this.query().insert(survey);
    }

    findById(id) {
        return this.query()
            .where('surveys.id', '=', id)
            .innerJoin('patients', 'patients.id', '=', 'surveys.patient_id')
            .innerJoin('doctors', 'doctors.id', '=', 'surveys.doctor_id')
            .select(
                'surveys.id',
                { doctorId: 'surveys.doctor_id' },
                { doctorFullName: 'doctors.full_name' },
                { patientId: 'surveys.patient_id' },
                { patientFullName: 'patients.full_name' },
                'surveys.form',
                'surveys.status',
                { createdAt: 'surveys.created_at' },
                { updatedAt: 'surveys.updated_at' },
            );
    }

    deleteById(id) {
        return this.query().where('surveys.id', '=', id).del();
    }

    countByPatientId(patientId) {
        return this.query()
            .where('surveys.patient_id', '=', patientId)
            .count()
            .first();
    }

    findByPatientId(patientId, offset, pageSize) {
        return this.query()
            .where('surveys.patient_id', '=', patientId)
            .innerJoin('patients', 'patients.id', '=', 'surveys.patient_id')
            .innerJoin('doctors', 'doctors.id', '=', 'surveys.doctor_id')
            .orderBy('surveys.created_at', 'desc')
            .select(
                'surveys.id',
                { doctorId: 'surveys.doctor_id' },
                { doctorFullName: 'doctors.full_name' },
                { patientId: 'surveys.patient_id' },
                { patientFullName: 'patients.full_name' },
                'surveys.form',
                'surveys.status',
                { createdAt: 'surveys.created_at' },
                { updatedAt: 'surveys.updated_at' },
            )
            .offset(offset)
            .limit(pageSize);
    }

    update(id, data = {}, trx = null) {
        const queryBuilder = this.query().where({ id }).update(data);
        if (trx) queryBuilder.transacting(trx);
        return queryBuilder;
    }

    countByDoctorId(doctorId) {
        return this.query()
            .where('surveys.doctor_id', '=', doctorId)
            .count()
            .first();
    }

    findByDoctorId(doctorId, offset, pageSize) {
        return this.query()
            .where('surveys.doctor_id', '=', doctorId)
            .innerJoin('patients', 'patients.id', '=', 'surveys.patient_id')
            .innerJoin('doctors', 'doctors.id', '=', 'surveys.doctor_id')
            .orderBy('surveys.created_at', 'desc')
            .select(
                'surveys.id',
                { doctorId: 'surveys.doctor_id' },
                { doctorFullName: 'doctors.full_name' },
                { patientId: 'surveys.patient_id' },
                { patientFullName: 'patients.full_name' },
                'surveys.form',
                'surveys.status',
                { createdAt: 'surveys.created_at' },
                { updatedAt: 'surveys.updated_at' },
            )
            .offset(offset)
            .limit(pageSize);
    }
}

export const SurveyRepository = new Repository('surveys');
