import { Role } from 'core/common/enum';
import { DataRepository } from 'packages/restBuilder/core/dataHandler/data.repository';

class Repository extends DataRepository {
    findDoctorByEmail(email) {
        return this.query()
            .innerJoin('doctors', 'users.id', '=', 'doctors.user_id')
            .whereNull('users.deleted_at')
            .where('users.email', '=', email)
            .where('users.role', '=', Role.DOCTOR)
            .select(
                'users.id',
                { fullName: 'users.full_name' },
                'users.gender',
                'users.email',
                'users.password',
                'users.phone',
                'users.birthday',
                'users.avatar',
                'users.address',
                'users.role',
                { quotaCode: 'doctors.quota_code' },
                'doctors.expertise',
                'doctors.experience',
                { workUnit: 'doctors.work_unit' },
                'doctors.certificate',
            );
    }

    findPatientByPhone(phone) {
        return this.query()
            .innerJoin('patients', 'users.id', '=', 'patients.user_id')
            .whereNull('users.deleted_at')
            .where('users.phone', '=', phone)
            .where('users.role', '=', Role.PATIENT)
            .select(
                'users.id',
                { fullName: 'users.full_name' },
                'users.gender',
                'users.email',
                'users.password',
                'users.phone',
                'users.birthday',
                'users.avatar',
                'users.address',
                'users.role',
                { nationalIdCard: 'patients.national_id_card' },
                'patients.insurance',
                'patients.profesion',
            );
    }

    findById(id) {
        return this.query()
            .whereNull('users.deleted_at')
            .where('users.id', '=', id)
            .select(
                'users.id',
                'users.email',
                { fullName: 'users.full_name' },
                'users.role',
                { createdAt: 'users.created_at' },
                { updatedAt: 'users.updated_at' },
                { deletedAt: 'users.deleted_at' },
            );
    }

    createUser(user, trx = null) {
        const queryBuilder = this.query().insert(user, ['id']);
        if (trx) return queryBuilder.transacting(trx);
        return queryBuilder;
    }
}

export const UserRepository = new Repository('users');
