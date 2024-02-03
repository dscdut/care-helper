import { DataRepository } from 'packages/restBuilder/core/dataHandler/data.repository';

class Repository extends DataRepository {
    findById(id) {
        return this.query()
            .whereNull('patients.deleted_at')
            .where('patients.phone', '=', id)
            .select(
                'patients.id',
                { fullName: 'patients.full_name' },
                'patients.gender',
                'patients.email',
                'patients.locked',
                'patients.active',
                'patients.phone',
                'patients.birthday',
                'patients.avatar',
                'patients.address',
                { nationalIdCard: 'patients.national_id_card' },
                'patients.insurance',
                'patients.profesion',
            );
    }
}

export const PatientRepository = new Repository('patients');
