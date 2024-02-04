import { HospitalService } from 'core/modules/hospital';
import { ValidHttpResponse } from 'packages/handler/response/validHttp.response';

class Controller {
    constructor() {
        this.service = HospitalService;
    }

    getAllHospitals = async req => {
        const page = req.query.page || 1;
        const size = req.query.size || 10;
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
