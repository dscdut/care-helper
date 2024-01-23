import { DataRepository } from 'packages/restBuilder/core/dataHandler/data.repository';

class Repository extends DataRepository {
    findByEmail(email) {
        return this.query()
            .whereNull('users.deleted_at')
            .where('users.email', '=', email)
            .select(
                'users.id',
                { fullName: 'users.full_name' },
                'users.gender',
                'users.email',
                'users.password',
                { phone: 'users.phone' },
                'users.birthday',
                'users.avatar',
                'users.address',
                'users.role',
            );
    }

    findByPhone(phone) {
        return this.query()
            .whereNull('users.deleted_at')
            .where('users.phone', '=', phone)
            .select(
                'users.id',
                { fullName: 'users.full_name' },
                'users.gender',
                'users.email',
                'users.password',
                { phone: 'users.phone' },
                'users.birthday',
                'users.avatar',
                'users.address',
                'users.role',
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

    createUser(user) {
        return this.query().insert(user).into('users');
    }
}

export const UserRepository = new Repository('users');
