import { AuthService } from 'core/modules/auth/service/auth.service';
import { EmailLoginDto, PhoneLoginDto } from 'core/modules/auth';
import { RegisterDto } from 'core/modules/auth/dto/register.dto';
import { ValidHttpResponse } from 'packages/handler/response/validHttp.response';

class Controller {
    constructor() {
        this.service = AuthService;
    }

    emailLogin = async req => {
        const data = await this.service.emailLogin(EmailLoginDto(req.body));
        return ValidHttpResponse.toOkResponse(data);
    };

    phoneLogin = async req => {
        const data = await this.service.phoneLogin(PhoneLoginDto(req.body));
        return ValidHttpResponse.toOkResponse(data);
    };

    register = async req => {
        const data = await this.service.register(RegisterDto(req.body));
        return ValidHttpResponse.toOkResponse(data);
    };
}

export const AuthController = new Controller();
