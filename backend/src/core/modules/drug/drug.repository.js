import { DataRepository } from 'packages/restBuilder/core/dataHandler/data.repository';

class Repository extends DataRepository {
    findLazyByName(keyword, offset, pageSize) {
        return this.query()
            .where('drugs.name', 'ilike', `%${keyword}%`)
            .select(
                'drugs.name',
            )
            .offset(offset)
            .limit(pageSize);
    }

    findAllByName(keyword) {
        return this.query()
            .where('drugs.name', 'ilike', `%${keyword}%`)
            .select(
                'drugs.name'
            );
    }
}

export const DrugRepository = new Repository('drugs');
