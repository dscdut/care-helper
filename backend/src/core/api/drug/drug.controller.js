import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from 'core/common/constants';
import { DrugService } from 'core/modules/drug';
import { ValidHttpResponse } from 'packages/handler/response/validHttp.response';

class Controller {
    constructor() {
        this.service = DrugService;
    }

    getPaginationDrugs = async req => {
        const page = req.query.page || DEFAULT_PAGE;
        const size = req.query.size || DEFAULT_PAGE_SIZE;
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
