import { SearchDto } from 'core/common/dto';
import { HospitalDto } from '../dto';
import { HospitalRepository } from '../hospital.repository';

class Service {
    constructor() {
        this.hospitalRepository = HospitalRepository;
    }

    async getPaginationHospitals(page = 1, pageSize = 10) {
        const offset = (page - 1) * pageSize;
        const hospitals = await this.hospitalRepository.findAll(offset,pageSize);
        return hospitals.map(e => HospitalDto({ hospital: e }));
    }

    async listHospitalName(keyword) {
        const hospitals = await this.hospitalRepository.findAllByName(
            keyword || '',
        );
        return hospitals.map(e => SearchDto({ objectDto: e }));
    }
}

export const HospitalService = new Service();
