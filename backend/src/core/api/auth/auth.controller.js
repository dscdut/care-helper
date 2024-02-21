import { AuthService } from 'core/modules/auth/service/auth.service';
import {
    DoctorLoginDto,
    DoctorRegisterDto,
    OtpVerifyDto,
    PatientLoginDto,
    PhoneDto,
    PhoneVerifiedRegisterDto,
} from 'core/modules/auth';
import { ValidHttpResponse } from 'packages/handler/response/validHttp.response';
import { DoctorDto, PatientDto } from 'core/modules/user';

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

    phoneRegister = async req => {
        const data = await this.service.phoneRegister(PhoneDto(req.body));
        return ValidHttpResponse.toOkResponse(data);
    };

    verifyOTP = async req => {
        const data = await this.service.otpVerify(OtpVerifyDto(req.body));
        return ValidHttpResponse.toOkResponse(data);
    };

    patientRegister = async req => {
        const data = await this.service.patientRegister(
            PhoneVerifiedRegisterDto(req.body),
        );
        return ValidHttpResponse.toOkResponse(data);
    };

    doctorRegister = async req => {
        const data = await this.service.doctorRegister(
            DoctorRegisterDto(req.body),
        );
        return ValidHttpResponse.toOkResponse(data);
    };

    getAuthDoctor = async req => {
        const data = await this.service.getDoctorById(req.user.payload.id);
        return ValidHttpResponse.toOkResponse(DoctorDto(data));
    };

    getAuthPatient = async req => {
        const data = await this.service.getPatientById(req.user.payload.id);
        return ValidHttpResponse.toOkResponse(PatientDto(data));
    };
}

export const AuthController = new Controller();
