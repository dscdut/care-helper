import { DataRepository } from 'packages/restBuilder/core/dataHandler/data.repository';

class Repository extends DataRepository {
    createSurvey(survey, trx) {
        if (trx) return this.query().insert(survey).transacting(trx);
        return this.query().insert(survey);
    }

    findById(id) {
        return this.query()
            .where('surveys.id', '=', id)
            .select(
                'surveys.id',
                { doctorId: 'surveys.doctor_id' },
                { patientId: 'surveys.patient_id' },
                'surveys.form',
                'surveys.status',
                { createdAt: 'surveys.created_at' },
                { updatedAd: 'surveys.updated_at' },
            );
    }

    deleteById(id) {
        return this.query().where('surveys.id', '=', id).del();
    }

    // findByExaminationId(examinationId) {
    //     return this.query()
    //         .where('prescriptions.examination_id', '=', examinationId)
    //         .select(
    //             'prescriptions.id',
    //             { examinationId: 'prescriptions.examination_id' },
    //             'prescriptions.details',
    //             'prescriptions.note',
    //             { startDate: 'prescriptions.start_date' },
    //             { endDate: 'prescriptions.end_date' },
    //             {
    //                 prescriptionFilename: 'prescriptions.prescription_filename',
    //             },
    //         );
    // }
}

export const SurveyRepository = new Repository('surveys');
