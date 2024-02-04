import { DataRepository } from 'packages/restBuilder/core/dataHandler/data.repository';

class Repository extends DataRepository {
    addOTP(otp, token, trx = null) {
        const queryBuilder = this.query().insert({ otp, token });
        if (trx) return queryBuilder.transacting(trx);
        return queryBuilder;
    }

    findOTP(otp, token) {
        return this.query()
            .where('otps.otp', '=', otp)
            .where('otps.token', '=', token)
            .select('otps.otp', 'otps.token', 'otps.verified');
    }

    findOTPByToken(token) {
        return this.query()
            .where('otps.token', '=', token)
            .select('otps.otp', 'otps.token', 'otps.verified');
    }

    verifyOTP(otp, token) {
        return this.query().where({ otp, token }).update({ verified: true });
    }
}

export const OtpRepository = new Repository('otps');
