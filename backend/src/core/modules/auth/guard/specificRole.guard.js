import { getUserContext } from 'packages/authModel/module/user';

export class SpecificRoleGuard {
    #role;

    constructor(role) {
        this.#role = role;
    }

    canActive(req) {
        const user = getUserContext(req);
        return user.role === this.#role;
    }
}
