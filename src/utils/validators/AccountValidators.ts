import { BaseValidator } from './BaseValidator';
import { AccountRegisterSchema } from './schema/accountRegisterSchema';

class AccountValidator extends BaseValidator<typeof AccountRegisterSchema> {
  constructor() {
    super(AccountRegisterSchema);
  }

  validateEmail(value: string) {
    return this.validateField('email', value);
  }

  validateUsername(value: string) {
    return this.validateField('username', value);
  }

  validatePassword(value: string) {
    return this.validateField('password', value);
  }

  validateRole(value: string) {
    return this.validateField('role', value)
  }
}

export default new AccountValidator();
