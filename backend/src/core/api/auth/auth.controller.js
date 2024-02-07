import { AuthService } from 'core/modules/auth/service/auth.service';
import { DoctorLoginDto, PatientLoginDto } from 'core/modules/auth';
import { ValidHttpResponse } from 'packages/handler/response/validHttp.response';
import { PatientRegisterDto } from 'core/modules/auth/dto/patient.register.dto';
import { DoctorRegisterDto } from 'core/modules/auth/dto/doctor.register.dto';

class Controller {
    constructor() {
        this.service = AuthService;
    }

    doctorLogin = async req => {
        const data = await this.service.doctorLogin(DoctorLoginDto(req.body));
        return ValidHttpResponse.toOkResponse(data);
    };

    patientLogin = async req => {
        const data = await this.service.patientLogin(PatientLoginDto(req.body));
        return ValidHttpResponse.toOkResponse(data);
    };

    patientRegister = async req => {
        const data = await this.service.patientRegister(
            PatientRegisterDto(req.body),
        );
        return ValidHttpResponse.toOkResponse(data);
    };

    doctorRegister = async req => {
        const data = await this.service.doctorRegister(
            DoctorRegisterDto(req.body),
        );
        return ValidHttpResponse.toOkResponse(data);
    };
}

export const AuthController = new Controller();
