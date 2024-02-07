import { DataRepository } from 'packages/restBuilder/core/dataHandler/data.repository';

class Repository extends DataRepository {
    upsertPatient(patient, trx = null) {
        const queryBuilder = this.query()
            .insert(patient)
            .onConflict('user_id')
            .merge();
        if (trx) return queryBuilder.transacting(trx);
        return queryBuilder;
    }
}

export const PatientRepository = new Repository('patients');
