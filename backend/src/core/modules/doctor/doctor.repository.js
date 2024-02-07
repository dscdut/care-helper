import { DataRepository } from 'packages/restBuilder/core/dataHandler/data.repository';

class Repository extends DataRepository {
    findById(id) {
        return this.query()
            .whereNull('doctors.deleted_at')
            .where('doctors.email', '=', id)
            .select(
                'doctors.id',
                { fullName: 'doctors.full_name' },
                'doctors.gender',
                'doctors.email',
                'doctors.locked',
                'doctors.active',
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
