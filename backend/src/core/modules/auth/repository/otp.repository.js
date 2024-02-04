import { DataRepository } from 'packages/restBuilder/core/dataHandler/data.repository';

class Repository extends DataRepository {
    addOTP(otp, token, trx = null) {
        const queryBuilder = this.query().insert({ otp, token });
        if (trx) return queryBuilder.transacting(trx);
        return queryBuilder;
    }

    findOTPByToken(token) {
        return this.query()
            .where('otps.token', '=', token)
            .select('otps.otp', 'otps.token', 'otps.verified', 'otps.attempt');
    }

    updateWhere(condition, value) {
        return this.query().where(condition).update(value);
    }
}

export const OtpRepository = new Repository('otps');
