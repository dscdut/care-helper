import { DataRepository } from 'packages/restBuilder/core/dataHandler/data.repository';

class Repository extends DataRepository {
    upsertPatient(patient, trx = null) {
        const queryBuilder = this.query()
            .insert(patient)
            .onConflict('id')
            .merge();
        if (trx) return queryBuilder.transacting(trx);
        return queryBuilder;
    }

    findByPhone(phone) {
        return this.query()
            .whereNull('patients.deleted_at')
            .where('patients.phone', '=', phone)
            .select(
                'patients.id',
                { fullName: 'patients.full_name' },
                'patients.gender',
                'patients.email',
                'patients.password',
                'patients.phone',
                'patients.birthday',
                'patients.avatar',
                'patients.address',
                { nationalIdCard: 'patients.national_id_card' },
                'patients.insurance',
                'patients.profesion',
                'patients.active',
                'patients.height',
                'patients.weight'
            );
    }

    findById(id) {
        return this.query()
            .whereNull('patients.deleted_at')
            .where('patients.id', '=', id)
            .select(
                'patients.id',
                { fullName: 'patients.full_name' },
                'patients.gender',
                'patients.email',
                'patients.password',
                'patients.phone',
                'patients.birthday',
                'patients.avatar',
                'patients.address',
                { nationalIdCard: 'patients.national_id_card' },
                'patients.insurance',
                'patients.profesion',
                'patients.active',
                'patients.height',
                'patients.weight'
            );
    }

    findByDoctorHasExamination(doctorId) {
        return this.query()
            .whereNull('patients.deleted_at')
            .innerJoin('examinations', 'examinations.doctor_id', '=', doctorId)
            .distinct()
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
                'patients.active',
                'patients.weight',
                'patients.height',
            );
    }
}

export const PatientRepository = new Repository('patients');
