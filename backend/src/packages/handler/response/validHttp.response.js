import { CREATED, NO_CONTENT, OK } from 'http-status';
import { HttpResponse } from './http.response';

export class ValidHttpResponse extends HttpResponse {
    static payloadWrap(data) {
        return {
            success: true,
            ...data,
        };
    }

    static toOkResponse(data) {
        return new HttpResponse(OK, ValidHttpResponse.payloadWrap(data));
    }

    static toNoContentResponse() {
        return new HttpResponse(NO_CONTENT);
    }

    static toCreatedResponse(data) {
        return new HttpResponse(CREATED, ValidHttpResponse.payloadWrap(data));
    }
}
