import { LessPatientDto, PaginationPatientDto } from './dto';
import { PatientRepository } from './patient.repository';

class Service {
    constructor() {
        this.patientRepository = PatientRepository;
    }

    async searchPatient(page = 1, pageSize = 10, keyword = '') {
        const offset = (page - 1) * pageSize;
        const total = await this.patientRepository.countByPhoneOrEmailOrFullnameOrAddressOrNationalIdCardOrInsurance(
            keyword
        );
        const dataPatients = await this.patientRepository.findByPhoneOrEmailOrFullnameOrAddressOrNationalIdCardOrInsurance(
            offset,
            pageSize,
            keyword
        );
        return PaginationPatientDto({
            content: dataPatients.map(e => LessPatientDto(e)),
            pageSize,
            total: total.count,
        });
    }
}

export const PatientService = new Service();
