import { DataRepository } from 'packages/restBuilder/core/dataHandler/data.repository';

class Repository extends DataRepository {
    upsert(medicalHistory, trx = null) {
        medicalHistory.deleted_at = null;
        const queryBuilder = this.query()
            .insert(medicalHistory)
            .onConflict('patient_id')
            .merge()
            .returning('id');
        if (trx) return queryBuilder.transacting(trx);
        return queryBuilder;
    }

    findByPatientId(patientId) {
        return this.query()
            .whereNull('medical_histories.deleted_at')
            .where('medical_histories.patient_id', '=', patientId)
            .select('medical_histories.id', 'medical_histories.history', {
                patientId: 'medical_histories.patient_id',
            });
    }
}

export const MedicalHistoryRepository = new Repository('medical_histories');
