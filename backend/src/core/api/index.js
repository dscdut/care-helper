import { MediaResolver } from 'core/api/media';
// import { UserResolver } from 'core/api/user/user.resolver';
import { ApiDocument } from 'core/config/swagger.config';
import { HandlerResolver } from '../../packages/handler/HandlerResolver';
import { AuthResolver } from './auth/auth.resolver';
import { PrescriptionResolver } from './prescription/prescription.resolver';
import { ExaminationResolver } from './examination/examination.resolver';
import { HospitalResolver } from './hospital/hospital.resolver';
import { DoctorResolver } from './doctor/doctor.resolver';
import { PatientResolver } from './patient/patient.resolver';
import { MedicalTestResolver } from './medicalTest/medical_test.resolver';
import { DrugResolver } from './drug/drug.resolver';
import { MedicalHistoryResolver } from './medicalHistory/medical-history.resolver';
import { SurveyResolver } from './survey/survey.resolver';
import { MeetingResolver } from './meeting/meeting.resolver';

export const ModuleResolver = HandlerResolver.builder()
    .addSwaggerBuilder(ApiDocument)
    .addModule([
        AuthResolver,
        // UserResolver,
        MediaResolver,
        PrescriptionResolver,
        ExaminationResolver,
        HospitalResolver,
        DoctorResolver,
        PatientResolver,
        MedicalTestResolver,
        DrugResolver,
        MedicalHistoryResolver,
        SurveyResolver,
        MeetingResolver
    ]);
