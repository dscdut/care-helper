import { DataRepository } from 'packages/restBuilder/core/dataHandler/data.repository';

class Repository extends DataRepository {
    createTest(medicalTest, trx) {
        let queryBuilder = this.query();

        if (trx) {
            queryBuilder = queryBuilder.transacting(trx);
        }

        const createdMedicalTest = queryBuilder.insert(medicalTest).returning('*')
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

        return createdMedicalTest;
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
            .offset(offset)
            .limit(pageSize);
    }
}

export const TestRepository = new Repository('tests');