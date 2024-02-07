import { Role } from 'core/common/enum';
import { SpecificRoleGuard } from './specificRole.guard';
import { UnionRoleGuard } from './unionRole.guard';

export const hasDoctorRole = new SpecificRoleGuard(Role.DOCTOR);

export const hasPatientRole = new SpecificRoleGuard(Role.PATIENT);
export const hasDoctorOrPatientRole = new UnionRoleGuard(
    Role.DOCTOR,
    Role.PATIENT,
);
