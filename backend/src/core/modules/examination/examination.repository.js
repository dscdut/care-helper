import { DataRepository } from 'packages/restBuilder/core/dataHandler/data.repository';

class Repository extends DataRepository {
    createExamination(examination, trx) {
        let queryBuilder = this.query();

        if (trx) {
            queryBuilder = queryBuilder.transacting(trx);
        }

        const createdExamination = queryBuilder.insert(examination).returning('*')
            .then(([result]) => ({
                id: result.id,
                diagnose: result.diagnose,
                detailDiagnose: result.detail_diagnose,
                advice: result.advice,
                doctorId: result.doctor_id,
                patientId: result.patient_id,
                hospitalId: result.hospital_id,
                createdAt: result.created_at,
            }));

        return createdExamination;
    }

    updateByIdAndDoctorId(examination, id, doctorId, trx) {
        return this.query()
            .where('examinations.id', '=', id)
            .andWhere('examinations.doctor_id', doctorId)
            .transacting(trx || undefined)
            .update(examination);
    }

    deleteByIdAndDoctorId(id, doctorId, trx) {
        return this.query()
            .where('examinations.id', '=', id)
            .andWhere('examinations.doctor_id', '=', doctorId)
            .transacting(trx || undefined)
            .del(); // Use the del() method for deletion
    }

    findJoinHospitalById(id) {
        return this.query()
            .where('examinations.id', '=', id)
            .select(
                'examinations.id',
                'examinations.diagnose',
                'examinations.detail_diagnose',
                'examinations.advice',
                { doctorId: 'examinations.doctor_id' },
                { patientId: 'examinations.patient_id' },
                { hospitalId: 'examinations.hospital_id' },
                { hospitalAddress: 'hospitals.address' },
                { hospitalName: 'hospitals.name' },
                { createdAt: 'examinations.created_at' },
            ).leftJoin('hospitals', 'hospitals.id', 'examinations.hospital_id');
    }

    findJoinHospitalByDoctorId(doctorId, offset, pageSize) {
        return this.query()
            .where('examinations.doctor_id', '=', doctorId)
            .select(
                'examinations.id',
                'examinations.diagnose',
                { detailDiagnose: 'examinations.detail_diagnose' },
                'examinations.advice',
                { doctorId: 'examinations.doctor_id' },
                { patientId: 'examinations.patient_id' },
                { hospitalId: 'examinations.hospital_id' },
                { hospitalAddress: 'hospitals.address' },
                { hospitalName: 'hospitals.name' },
                { createdAt: 'examinations.created_at' },
            ).leftJoin('hospitals', 'hospitals.id', 'examinations.hospital_id')
            .orderBy('examinations.created_at', 'desc')
            .offset(offset)
            .limit(pageSize);
    }

    findJoinHospitalByPatientId(patientId, offset, pageSize) {
        return this.query()
            .where('examinations.patient_id', '=', patientId)
            .select(
                'examinations.id',
                'examinations.diagnose',
                'examinations.detail_diagnose',
                'examinations.advice',
                { doctorId: 'examinations.doctor_id' },
                { patientId: 'examinations.patient_id' },
                { hospitalId: 'examinations.hospital_id' },
                { hospitalAddress: 'hospitals.address' },
                { hospitalName: 'hospitals.name' },
                { createdAt: 'examinations.created_at' },
            ).leftJoin('hospitals', 'hospitals.id', 'examinations.hospital_id')
            .orderBy('examinations.created_at', 'desc')
            .offset(offset)
            .limit(pageSize);
    }

    countByPatientId(patientId) {
        return this.query()
            .where('examinations.patient_id', '=', patientId)
            .count('id').first();
    }

    countByDoctorId(doctorId) {
        return this.query()
            .where('examinations.doctor_id', '=', doctorId)
            .count('id').first();
    }

    findById(id) {
        return this.query()
            .where('examinations.id', '=', id)
            .select(
                'examinations.id',
                'examinations.diagnose',
                'examinations.detail_diagnose',
                'examinations.advice',
                { doctorId: 'examinations.doctor_id' },
                { patientId: 'examinations.patient_id' },
                { createdAt: 'examinations.created_at' },
            );
    }

    existByIdAndPatientId(id, patientId) {
        return this.query()
            .from('examinations')
            .where('examinations.id', '=', id)
            .andWhere('examinations.patient_id', '=', patientId)
            .first();
    }
}

export const ExaminationRepository = new Repository('examinations');
