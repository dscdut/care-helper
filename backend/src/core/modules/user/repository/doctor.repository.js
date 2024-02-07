import { DataRepository } from 'packages/restBuilder/core/dataHandler/data.repository';

class Repository extends DataRepository {
    upsertDoctor(doctor, trx = null) {
        const queryBuilder = this.query()
            .insert(doctor)
            .onConflict('id')
            .merge()
            .returning('id');
        if (trx) return queryBuilder.transacting(trx);
        return queryBuilder;
    }

    findByEmail(email) {
        return this.query()
            .whereNull('doctors.deleted_at')
            .where('doctors.email', '=', email)
            .select(
                'doctors.id',
                { fullName: 'doctors.full_name' },
                'doctors.email',
                'doctors.active',
                'doctors.password',
                'doctors.phone',
                { quotaCode: 'doctors.quota_code' },
                'doctors.expertise',
                'doctors.experience',
                { workUnit: 'doctors.work_unit' },
                { certificateName: 'doctors.certificate_name' },
                { certificateNumber: 'doctors.certificate_name' },
                { certificateProvider: 'doctors.certificate_name' },
            );
    }

    findById(id) {
        return this.query()
            .whereNull('doctors.deleted_at')
            .where('doctors.id', '=', id)
            .select(
                'doctors.id',
                { fullName: 'doctors.full_name' },
                'doctors.email',
                'doctors.password',
                'doctors.phone',
                'doctors.active',
                { quotaCode: 'doctors.quota_code' },
                'doctors.expertise',
                'doctors.experience',
                { workUnit: 'doctors.work_unit' },
                { certificateName: 'doctors.certificate_name' },
                { certificateNumber: 'doctors.certificate_name' },
                { certificateProvider: 'doctors.certificate_name' },
            );
    }
}

export const DoctorRepository = new Repository('doctors');
