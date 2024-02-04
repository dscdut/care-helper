import { SALT_ROUNDS } from 'core/env';
import { UnAuthorizedException } from 'packages/httpException';
import { logger } from 'packages/logger';
import { JwtService } from './jwt.service';
import { OtpRepository } from '../repository/otp.repository';

class SMSServiceImpl {
    static DEFAULT_MSG_INCOMPATIBLE_PWD = 'OTP not match or expired';

    otpTokenExpiresIn = '60s';

    constructor() {
        this.saltRounds = SALT_ROUNDS;
        this.jwtService = JwtService;
        this.otpRepository = OtpRepository;
        logger.info(`[${SMSServiceImpl.name}] is bundling`);
    }

    #generateOTP() {
        return '000000';
    }

    async getOtpAndToken(phone) {
        const otp = this.#generateOTP(phone);
        const token = this.jwtService.sign(phone, this.otpTokenExpiresIn);
        await this.otpRepository.addOTP(otp, token);
        return { otp, token };
    }

    async sendOTP(phone, otp) {
        //
    }

    async verifyOTP(
        otp,
        token,
        msg = SMSServiceImpl.DEFAULT_MSG_INCOMPATIBLE_PWD,
    ) {
        try {
            this.jwtService.verify(token);
        } catch (e) {
            throw new UnAuthorizedException(msg);
        }
        const otps = this.otpRepository.findOTP(otp, token);
        if (otps.length === 0) {
            throw new UnAuthorizedException(msg);
        }
        await this.otpRepository.verifyOTP(otp, token);
    }

    async getOTP(token) {
        const otp = await this.otpRepository.findOTPByToken(token);
        return otp;
    }
}

export const SMSService = new SMSServiceImpl();
