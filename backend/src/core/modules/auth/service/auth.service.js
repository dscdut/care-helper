import { pick } from 'lodash';
import { JwtPayload } from 'core/modules/auth/dto/jwt-sign.dto';
import {
    DuplicateException,
    InternalServerException,
    UnAuthorizedException,
    ForbiddenException,
} from 'packages/httpException';
import { Optional, logger } from 'core/utils';
import { Role } from 'core/common/enum';
import { MessageDto } from 'core/common/dto/message.dto';
import { BcryptService } from './bcrypt.service';
import { JwtService } from './jwt.service';
import { UserService } from '../../user/service/user.service';
import { MESSAGE } from './message.enum';
import { SMSService } from './sms.service';
import {
    DoctorLoginResponseDto,
    PatientLoginResponseDto,
    PhoneUnverifiedRegisterResponseDto,
} from '../dto';

class Service {
    constructor() {
        this.jwtService = JwtService;
        this.bcryptService = BcryptService;
        this.userService = UserService;
        this.smsService = SMSService;
    }

    async doctorLogin(doctorLoginDto) {
        const user = await this.userService.findDoctorByEmail(
            doctorLoginDto.email,
        );

        if (
            user
            && this.bcryptService.compare(doctorLoginDto.password, user.password)
        ) {
            return DoctorLoginResponseDto({
                user,
                accessToken: this.jwtService.accessTokenSign(
                    JwtPayload({ role: Role.DOCTOR, ...user }),
                ),
                refreshToken: this.jwtService.refreshTokenSign(
                    JwtPayload({ role: Role.DOCTOR, ...user }),
                ),
            });
        }

        throw new UnAuthorizedException('Email or password is incorrect');
    }

    async patientLogin(patientLoginDto) {
        const user = await this.userService.findPatientByPhone(
            patientLoginDto.phone,
        );
        if (
            user
            && this.bcryptService.compare(patientLoginDto.password, user.password)
        ) {
            return PatientLoginResponseDto({
                user,
                accessToken: this.jwtService.accessTokenSign(
                    JwtPayload({ role: Role.PATIENT, ...user }),
                ),
                refreshToken: this.jwtService.refreshTokenSign(
                    JwtPayload({ role: Role.PATIENT, ...user }),
                ),
            });
        }

        throw new UnAuthorizedException(
            'Phone number or password is incorrect',
        );
    }

    async patientRegister({ token, password }) {
        let otps;
        try {
            otps = await this.smsService.getOTP(token);
        } catch (e) {
            logger.error(e.message);
            throw new InternalServerException();
        }
        if (otps.length === 0 || !otps[0].verified) {
            throw new ForbiddenException('Phone number not verified');
        }
        password = this.bcryptService.hash(password);
        const { phone } = this.jwtService.decode(token);
        await this.userService.addPatient({ phone, password });
        const patient = await this.userService.findPatientByPhone(phone);
        return PatientLoginResponseDto({
            user: patient,
            accessToken: this.jwtService.accessTokenSign(
                JwtPayload({ role: Role.PATIENT, ...patient }),
            ),
            refreshToken: this.jwtService.refreshTokenSign(
                JwtPayload({ role: Role.PATIENT, ...patient }),
            ),
        });
    }

    async doctorRegister(doctorRegisterDto) {
        doctorRegisterDto.password = this.bcryptService.hash(
            doctorRegisterDto.password,
        );
        await this.userService.addDoctor(doctorRegisterDto);
        return MessageDto({
            message: MESSAGE.REGISTER_SUCCESS,
        });
    }

    async phoneRegister({ phone }) {
        Optional.of(
            await this.userService.findPatientByPhone(phone),
        ).throwIfPresent(
            new DuplicateException('This phone number is already existed'),
        );
        const { token, otp } = await this.smsService.getOtpAndToken(phone);
        this.smsService.sendOTP(phone, otp);
        return PhoneUnverifiedRegisterResponseDto(token);
    }

    async otpVerify({ token, otp }) {
        await this.smsService.verifyOTP(otp, token);
        return MessageDto({ message: MESSAGE.VERIFY_SUCCESS });
    }

    #getUserInfo = user => pick(user, ['_id', 'email', 'username', 'roles']);
}

export const AuthService = new Service();
