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

    findByPhoneOrEmailOrFullnameOrQuotaCodeOrWorkUnitOrExpertise(offset, pageSize, keyword) {
        return this.query()
            .where('doctors.phone', 'ilike', `%${keyword}%`)
            .orWhere('doctors.email', 'ilike', `%${keyword}%`)
            .orWhere('doctors.full_name', 'ilike', `%${keyword}%`)
            .orWhere('doctors.quota_code', 'ilike', `%${keyword}%`)
            .orWhere('doctors.work_unit', 'ilike', `%${keyword}%`)
            .orWhere('doctors.expertise', 'ilike', `%${keyword}%`)
            .select(
                'doctors.id',
                { fullName: 'doctors.full_name' },
                'doctors.email',
                'doctors.phone',
                { quotaCode: 'doctors.quota_code' },
                'doctors.expertise',
                { workUnit: 'doctors.work_unit' },
            )
            .offset(offset)
            .limit(pageSize);
    }

    countByPhoneOrEmailOrFullnameOrQuotaCodeOrWorkUnitOrExpertise(keyword) {
        return this.query()
            .where('doctors.phone', 'ilike', `%${keyword}%`)
            .orWhere('doctors.email', 'ilike', `%${keyword}%`)
            .orWhere('doctors.full_name', 'ilike', `%${keyword}%`)
            .orWhere('doctors.quota_code', 'ilike', `%${keyword}%`)
            .orWhere('doctors.work_unit', 'ilike', `%${keyword}%`)
            .orWhere('doctors.expertise', 'ilike', `%${keyword}%`)
            .count('doctors.id')
            .first();
    }
}

export const DoctorRepository = new Repository('doctors');
