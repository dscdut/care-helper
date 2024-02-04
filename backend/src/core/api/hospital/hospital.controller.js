import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from 'core/common/constants';
import { HospitalService } from 'core/modules/hospital';
import { ValidHttpResponse } from 'packages/handler/response/validHttp.response';

class Controller {
    constructor() {
        this.service = HospitalService;
    }

    getAllHospitals = async req => {
        const page = req.query.page || DEFAULT_PAGE;
        const size = req.query.size || DEFAULT_PAGE_SIZE;
        const data = await this.service.getPaginationHospitals(page, size);
        return ValidHttpResponse.toOkResponse(data);
    };

    listHospitalName = async req => {
        const data = await this.service.listHospitalName(
            req.query.keyword,
        );
        return ValidHttpResponse.toOkResponse(data);
    };
}

export const HospitalController = new Controller();
