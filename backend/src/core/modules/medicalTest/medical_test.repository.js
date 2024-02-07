import { DataRepository } from 'packages/restBuilder/core/dataHandler/data.repository';

class Repository extends DataRepository {
    createTest(medicalTest, trx) {
        let queryBuilder = this.query();

        if (trx) {
            queryBuilder = queryBuilder.transacting(trx);
        }

        const createdMedicalTest = queryBuilder
            .insert(medicalTest)
            .returning('*')
            .then(([result]) => ({
                id: result.id,
                testRows: result.test_rows,
                examinationId: result.examination_id,
                createdAt: result.created_at,
            }));

        return createdMedicalTest;
    }

    updateByIdAndDoctorId(test, doctorId, trx) {
        return this.query()
            .update({
                test_rows: test.test_rows
            })
            .where('tests.id', '=', test.id)
            .whereIn(
                'tests.examination_id',
                this.query()
                    .select('id')
                    .from('examinations')
                    .where('examinations.doctor_id', '=', doctorId)
            )
            .transacting(trx || undefined);
    }

    deleteByIdAndExaminationDoctorId(id, doctorId, trx) {
        return this.query()
            .where('tests.id', '=', id)
            .join(
                'examinations',
                'examinations.id',
                '=',
                'tests.examination_id',
            )
            .andWhere('examinations.doctor_id', '=', doctorId)
            .transacting(trx || undefined)
            .del(); // Use the del() method for deletion
    }

    findByExaminationDoctorId(doctorId, offset, pageSize) {
        return this.query()
            .leftJoin('examinations', 'examinations.id', 'tests.examination_id')
            .where('examinations.doctor_id', '=', doctorId)
            .select(
                'tests.id',
                { testRows: 'tests.test_rows' },
                { examinationId: 'tests.examination_id' },
                { createdAt: 'tests.created_at' },
            )
            .orderBy('tests.created_at', 'desc')
            .offset(offset)
            .limit(pageSize);
    }

    countByExaminationDoctorId(doctorId) {
        return this.query()
            .leftJoin('examinations', 'examinations.id', 'tests.examination_id')
            .where('examinations.doctor_id', '=', doctorId)
            .count('tests.id')
            .first();
    }

    findByExaminationPatientId(patientId, offset, pageSize) {
        return this.query()
            .leftJoin('examinations', 'examinations.id', 'tests.examination_id')
            .where('examinations.patient_id', '=', patientId)
            .select(
                'tests.id',
                { testRows: 'tests.test_rows' },
                { examinationId: 'tests.examination_id' },
                { createdAt: 'tests.created_at' },
            )
            .orderBy('tests.created_at', 'desc')
            .offset(offset)
            .limit(pageSize);
    }

    countByExaminationPatientId(patientId) {
        return this.query()
            .leftJoin('examinations', 'examinations.id', 'tests.examination_id')
            .where('examinations.patient_id', '=', patientId)
            .count('tests.id')
            .first();
    }

    findJoinExaminationPatientIdAndDoctorIdById(id) {
        return this.query()
            .leftJoin('examinations', 'examinations.id', 'tests.examination_id')
            .where('tests.id', '=', id)
            .select(
                'tests.id',
                { testRows: 'tests.test_rows' },
                { examinationId: 'tests.examination_id' },
                { createdAt: 'tests.created_at' },
                { patientId: 'examinations.patient_id' },
                { doctorId: 'examinations.doctor_id' },
            );
    }

    findByExaminationId(examinationId) {
        return this.query()
            .where('tests.examination_id', '=', examinationId)
            .select(
                'tests.id',
                { testRows: 'tests.test_rows' },
                { examinationId: 'tests.examination_id' },
                { createdAt: 'tests.created_at' },
            );
    }
}

export const TestRepository = new Repository('tests');
