import { DataRepository } from 'packages/restBuilder/core/dataHandler/data.repository';

class Repository extends DataRepository {
    findById(id) {
        return this.query()
            .where('hospitals.id', '=', id)
            .select(
                'hospitals.id',
                'hospitals.name',
                'hospitals.address',
            );
    }

    findAll(offset, pageSize) {
        return this.query()
            .select(
                'hospitals.id',
                'hospitals.name',
                'hospitals.address',
            )
            .offset(offset)
            .limit(pageSize);
    }

    findAllByName(keyword) {
        return this.query()
            .where('hospitals.name', 'ilike', `%${keyword}%`)
            .select(
                'hospitals.id',
                'hospitals.name'
            );
    }
}

export const HospitalRepository = new Repository('hospitals');
