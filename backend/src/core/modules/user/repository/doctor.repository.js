import { DataRepository } from 'packages/restBuilder/core/dataHandler/data.repository';

class Repository extends DataRepository {
    upsertDoctor(doctor, trx = null) {
        const queryBuilder = this.query()
            .insert(doctor)
            .onConflict('id')
            .merge();
        if (trx) return queryBuilder.transacting(trx);
        return queryBuilder;
    }

    findDoctorByEmail(email) {
        return this.query()
            .whereNull('doctors.deleted_at')
            .where('doctors.email', '=', email)
            .select(
                'doctors.id',
                { fullName: 'doctors.full_name' },
                'doctors.gender',
                'doctors.email',
                'doctors.password',
                'doctors.phone',
                'doctors.birthday',
                'doctors.avatar',
                'doctors.address',
                { quotaCode: 'doctors.quota_code' },
                'doctors.expertise',
                'doctors.experience',
                { workUnit: 'doctors.work_unit' },
                'doctors.certificate',
            );
    }
}

export const DoctorRepository = new Repository('doctors');
