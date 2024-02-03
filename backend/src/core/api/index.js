import { MediaResolver } from 'core/api/media';
// import { UserResolver } from 'core/api/user/user.resolver';
import { ApiDocument } from 'core/config/swagger.config';
import { HandlerResolver } from '../../packages/handler/HandlerResolver';
import { AuthResolver } from './auth/auth.resolver';
import { PrescriptionResolver } from './prescription/prescription.resolver';
import { ExaminationResolver } from './examination/examiniation.resolver';
import { HospitalResolver } from './hospital/hospital.resolver';
import { DoctorResolver } from './doctor/doctor.resolver';
import { PatientResolver } from './patient/patient.resolver';

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
    ]);
