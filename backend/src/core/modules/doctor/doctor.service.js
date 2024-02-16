import { LessDoctorDto, PaginationDoctorDto } from './dto';
import { DoctorRepository } from './doctor.repository';

class Service {
    constructor() {
        this.doctorRepository = DoctorRepository;
    }

    async searchDoctor(page = 1, pageSize = 10, keyword = '') {
        const offset = (page - 1) * pageSize;
        const total = await this.doctorRepository.countByPhoneOrEmailOrFullnameOrQuotaCodeOrWorkUnitOrExpertise(
            keyword
        );
        const dataDoctors = await this.doctorRepository.findByPhoneOrEmailOrFullnameOrQuotaCodeOrWorkUnitOrExpertise(
            offset,
            pageSize,
            keyword
        );
        return PaginationDoctorDto({
            content: dataDoctors.map(e => LessDoctorDto(e)),
            pageSize,
            total: total.count,
        });
    }
}

export const DoctorService = new Service();
