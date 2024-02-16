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
                'examinations.advice',
                { detailDiagnose: 'examinations.detail_diagnose' },
                { doctorId: 'examinations.doctor_id' },
                { patientId: 'examinations.patient_id' },
                { hospitalId: 'examinations.hospital_id' },
                { hospitalAddress: 'hospitals.address' },
                { hospitalName: 'hospitals.name' },
                { createdAt: 'examinations.created_at' },
            ).leftJoin('hospitals', 'hospitals.id', 'examinations.hospital_id');
    }

    findJoinHospitalByDoctorIdAndKeyword(doctorId, offset, pageSize, keyword) {
        return this.query()
            .where('examinations.doctor_id', '=', doctorId)
            .andWhereRaw(`(patients.phone ilike '%${keyword}%' or patients.full_name ilike '%${keyword}%')`)
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
                { doctorName: 'doctors.full_name' },
                { doctorPhone: 'doctors.phone' },
                { patientName: 'patients.full_name' },
                { patientPhone: 'patients.phone' },
            )
            .leftJoin('hospitals', 'hospitals.id', 'examinations.hospital_id')
            .leftJoin('patients', 'patients.id', 'examinations.patient_id')
            .leftJoin('doctors', 'doctors.id', 'examinations.doctor_id')
            .orderBy('examinations.created_at', 'desc')
            .offset(offset)
            .limit(pageSize);
    }

    findJoinHospitalByPatientIdAndKeyword(patientId, offset, pageSize, keyword) {
        return this.query()
            .where('examinations.patient_id', '=', patientId)
            .andWhereRaw(`(doctors.phone ilike '%${keyword}%' or doctors.full_name ilike '%${keyword}%' 
            or hospitals.name ilike '%${keyword}%')`)
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
                { doctorName: 'doctors.full_name' },
                { doctorPhone: 'doctors.phone' },
                { patientName: 'patients.full_name' },
                { patientPhone: 'patients.phone' },
            )
            .leftJoin('hospitals', 'hospitals.id', 'examinations.hospital_id')
            .leftJoin('patients', 'patients.id', 'examinations.patient_id')
            .leftJoin('doctors', 'doctors.id', 'examinations.doctor_id')
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
                { doctorName: 'doctors.full_name' },
                { doctorPhone: 'doctors.phone' },
            )
            .leftJoin('hospitals', 'hospitals.id', 'examinations.hospital_id')
            .leftJoin('doctors', 'doctors.id', 'examinations.doctor_id')
            .orderBy('examinations.created_at', 'desc')
            .offset(offset)
            .limit(pageSize);
    }

    countByPatientId(patientId) {
        return this.query()
            .where('examinations.patient_id', '=', patientId)
            .count('examinations.id')
            .first();
    }

    countByPatientIdAndKeyword(patientId, keyword) {
        return this.query()
            .where('examinations.patient_id', '=', patientId)
            .leftJoin('patients', 'patients.id', 'examinations.patient_id')
            .leftJoin('doctors', 'doctors.id', 'examinations.doctor_id')
            .leftJoin('hospitals', 'hospitals.id', 'examinations.hospital_id')
            .andWhereRaw(`(doctors.phone ilike '%${keyword}%' or doctors.full_name ilike '%${keyword}%' 
            or hospitals.name ilike '%${keyword}%')`)
            .count('examinations.id')
            .first();
    }

    countByDoctorIdAndKeyword(doctorId, keyword) {
        return this.query()
            .where('examinations.doctor_id', '=', doctorId)
            .leftJoin('patients', 'patients.id', 'examinations.patient_id')
            .leftJoin('doctors', 'doctors.id', 'examinations.doctor_id')
            .andWhereRaw(`(patients.phone ilike '%${keyword}%' or patients.full_name ilike '%${keyword}%')`)
            .count('examinations.id')
            .first();
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

    existByDoctorIdAndPatientId(doctorId, patientId) {
        return this.query()
            .from('examinations')
            .where('examinations.doctor_id', '=', doctorId)
            .andWhere('examinations.patient_id', '=', patientId)
            .count('examinations.id')
            .first();
    }
}

export const ExaminationRepository = new Repository('examinations');
