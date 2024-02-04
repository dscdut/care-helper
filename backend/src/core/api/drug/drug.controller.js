import { DrugService } from 'core/modules/drug';
import { ValidHttpResponse } from 'packages/handler/response/validHttp.response';

class Controller {
    constructor() {
        this.service = DrugService;
    }

    getPaginationDrugs = async req => {
        const page = req.query.page || 1;
        const size = req.query.size || 100;
        const data = await this.service.getPaginationDrugs(req.query.keyword, page, size);
        return ValidHttpResponse.toOkResponse(data);
    };

    listDrugsName = async req => {
        const data = await this.service.listDrugsName(
            req.query.keyword,
        );
        return ValidHttpResponse.toOkResponse(data);
    };
}

export const DrugController = new Controller();
