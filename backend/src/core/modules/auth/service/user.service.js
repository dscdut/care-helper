import { BcryptService } from './bcrypt.service';
import { UserRepository } from '../../user/user.repository';
import { logger } from '../../../../packages/logger';
import { Optional } from '../../../utils';
import {
    DuplicateException,
    InternalServerException,
} from '../../../../packages/httpException';

class Service {
    constructor() {
        this.repository = UserRepository;
        this.bcryptService = BcryptService;
    }

    async findByEmail(email) {
        try {
            const data = await this.repository.findByEmail(email);

            return data[0];
        } catch (error) {
            logger.error(error.message);
            throw new InternalServerException();
        }
    }

    async findByPhoneNumber(phoneNumber) {
        try {
            const data = await this.repository.findByPhone(phoneNumber);

            return data[0];
        } catch (error) {
            logger.error(error.message);
            throw new InternalServerException();
        }
    }

    async createUser(registerDto) {
        if (registerDto.email)
            Optional.of(
                await this.findByEmail(registerDto.email),
            ).throwIfPresent(
                new DuplicateException('This email is already existed'),
            );
        if (registerDto.phone)
            Optional.of(
                await this.findByPhoneNumber(registerDto.phone),
            ).throwIfPresent(
                new DuplicateException('This phone number is already existed'),
            );

        registerDto.password = this.bcryptService.hash(registerDto.password);

        try {
            await this.repository.createUser(registerDto);
        } catch (error) {
            logger.error(error.message);
            throw new InternalServerException();
        }
    }
}

export const UserService = new Service();
