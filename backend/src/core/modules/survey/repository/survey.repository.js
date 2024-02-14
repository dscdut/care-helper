import { DataRepository } from 'packages/restBuilder/core/dataHandler/data.repository';

class Repository extends DataRepository {
    createSurvey(survey, trx) {
        if (trx) return this.query().insert(survey).transacting(trx);
        return this.query().insert(survey);
    }

    findById(id) {
        return this.query()
            .where('surveys.id', '=', id)
            .select(
                'surveys.id',
                { doctorId: 'surveys.doctor_id' },
                { patientId: 'surveys.patient_id' },
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
        return this.query().count('surveys.patient_id', '=', patientId).first();
    }

    findByPatientId(patientId, offset, pageSize) {
        return this.query()
            .where('surveys.patient_id', '=', patientId)
            .orderBy('surveys.created_at', 'desc')
            .select(
                'surveys.id',
                { doctorId: 'surveys.doctor_id' },
                { patientId: 'surveys.patient_id' },
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
