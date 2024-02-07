import { DrugRepository } from './drug.repository';

class Service {
    constructor() {
        this.drugRepository = DrugRepository;
    }

    async getPaginationDrugs(keyword, page = 1, pageSize = 100) {
        const offset = (page - 1) * pageSize;
        const drugs = await this.drugRepository.findLazyByName(keyword || '', offset, pageSize);
        return drugs.map(e => e.name);
    }

    async listDrugsName(keyword) {
        const drugs = await this.drugRepository.findAllByName(
            keyword || '',
        );
        return drugs.map(e => e.name);
    }
}

export const DrugService = new Service();
