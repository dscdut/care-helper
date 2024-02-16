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

    findByPhoneOrEmailOrFullnameOrAddressOrNationalIdCardOrInsurance(offset, pageSize, keyword) {
        return this.query()
            .where('patients.phone', 'ilike', `%${keyword}%`)
            .orWhere('patients.email', 'ilike', `%${keyword}%`)
            .orWhere('patients.full_name', 'ilike', `%${keyword}%`)
            .orWhere('patients.address', 'ilike', `%${keyword}%`)
            .orWhere('patients.national_id_card', 'ilike', `%${keyword}%`)
            .orWhere('patients.insurance', 'ilike', `%${keyword}%`)
            .select(
                'patients.id',
                { fullName: 'patients.full_name' },
                'patients.gender',
                'patients.email',
                'patients.phone',
                'patients.birthday',
                'patients.avatar',
                'patients.address',
                { nationalIdCard: 'patients.national_id_card' },
                'patients.insurance',
                'patients.profesion',
            )
            .offset(offset)
            .limit(pageSize);
    }

    countByPhoneOrEmailOrFullnameOrAddressOrNationalIdCardOrInsurance(keyword) {
        return this.query()
            .where('patients.phone', 'ilike', `%${keyword}%`)
            .orWhere('patients.email', 'ilike', `%${keyword}%`)
            .orWhere('patients.full_name', 'ilike', `%${keyword}%`)
            .orWhere('patients.address', 'ilike', `%${keyword}%`)
            .orWhere('patients.national_id_card', 'ilike', `%${keyword}%`)
            .orWhere('patients.insurance', 'ilike', `%${keyword}%`)
            .count('patients.id')
            .first();
    }
}

export const PatientRepository = new Repository('patients');
