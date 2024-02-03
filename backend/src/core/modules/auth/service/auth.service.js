import { pick } from 'lodash';
import { JwtPayload } from 'core/modules/auth/dto/jwt-sign.dto';
import { UnAuthorizedException } from 'packages/httpException';
import { Role } from 'core/common/enum';
import { BcryptService } from './bcrypt.service';
import { JwtService } from './jwt.service';
import { UserService } from '../../user/service/user.service';
import { MESSAGE } from './message.enum';
import { DoctorLoginResponseDto } from '../dto/doctor.login.response.dto';
import { PatientLoginResponseDto } from '../dto/patient.login.response.dto';
import { RegisterResponseDto } from '../dto/register.response.dto';

class Service {
    constructor() {
        this.jwtService = JwtService;
        this.bcryptService = BcryptService;
        this.userService = UserService;
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

    async patientRegister(patientRegisterDto) {
        patientRegisterDto.password = this.bcryptService.hash(
            patientRegisterDto.password,
        );
        await this.userService.addPatient(patientRegisterDto);
        return RegisterResponseDto({
            message: MESSAGE.REGISTER_SUCCESS,
        });
    }

    async doctorRegister(doctorRegisterDto) {
        doctorRegisterDto.password = this.bcryptService.hash(
            doctorRegisterDto.password,
        );
        const id = await this.userService.addDoctor(doctorRegisterDto);
        return RegisterResponseDto({
            authToken: this.jwtService.accessTokenSign({
                id,
                role: Role.DOCTOR,
            }),
        });
    }

    #getUserInfo = user => pick(user, ['_id', 'email', 'username', 'roles']);
}

export const AuthService = new Service();
