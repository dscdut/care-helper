import { pick } from 'lodash';
import { JwtPayload } from 'core/modules/auth/dto/jwt-sign.dto';
import { UserDataService } from 'core/modules/user/services/userData.service';
import { BcryptService } from './bcrypt.service';
import { JwtService } from './jwt.service';
import { UserRepository } from '../../user/user.repository';
import { UnAuthorizedException } from '../../../../packages/httpException';
import { UserService } from './user.service';
import { MESSAGE } from './message.enum';

class Service {
    constructor() {
        this.userRepository = UserRepository;
        this.jwtService = JwtService;
        this.bcryptService = BcryptService;
        this.userDataService = UserDataService;
        this.userService = UserService;
    }

    async emailLogin(emailLoginDto) {
        const users = await this.userRepository.findByEmail(
            emailLoginDto.email,
        );

        if (
            users.length > 0 &&
            this.bcryptService.compare(
                emailLoginDto.password,
                users[0].password,
            )
        ) {
            const user = users[0];
            delete user.password;
            return {
                user,
                accessToken: this.jwtService.accessTokenSign(JwtPayload(user)),
                refreshToken: this.jwtService.refreshTokenSign(
                    JwtPayload(user),
                ),
            };
        }

        throw new UnAuthorizedException('Email or password is incorrect');
    }

    async phoneLogin(phoneLoginDto) {
        const users = await this.userRepository.findByPhone(
            phoneLoginDto.phone,
        );
        if (
            users.length > 0 &&
            this.bcryptService.compare(
                phoneLoginDto.password,
                users[0].password,
            )
        ) {
            const user = users[0];
            delete user.password;
            return {
                user,
                accessToken: this.jwtService.accessTokenSign(JwtPayload(user)),
                refreshToken: this.jwtService.refreshTokenSign(
                    JwtPayload(user),
                ),
            };
        }

        throw new UnAuthorizedException(
            'Phone number or password is incorrect',
        );
    }

    async register(registerDto) {
        await this.userService.createUser(registerDto);
        return {
            message: MESSAGE.REGISTER_SUCCESS,
        };
    }

    #getUserInfo = user => pick(user, ['_id', 'email', 'username', 'roles']);
}

export const AuthService = new Service();
