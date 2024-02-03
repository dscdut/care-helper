export class UserDetail {
  payload;

  role;

  constructor(payload) {
      this.payload = payload;
  }

  toRole() {
      this.role = this.payload?.role ?? null;
  }
}
