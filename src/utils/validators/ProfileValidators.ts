import { BaseValidator } from "./BaseValidator";
import { ProfileRegisterSchema } from "./schema/profileRegisterSchema";

class AccountValidator extends BaseValidator<typeof ProfileRegisterSchema> {
  constructor() {
    super(ProfileRegisterSchema);
  }

  validateFullName (value: string) {
    return this.validateField('fullName', value)
  }

  validateAddress (value: string) {
    return this.validateField('address', value)
  }

  validateBirthDate (value: string) {
    return this.validateField('birthDate', value)
  }

  validateMaritalStatus (value: string) {
    return this.validateField('maritalStatus', value)
  }

  validateOccupation (value: string) {
    return this.validateField('occupation', value)
  }

  validatePhoneNumber (value: string) {
    return this.validateField('phoneNumber', value)
  }

  validateNationalId (value: string) {
    return this.validateField('nationalId', value)
  }

  validateReligion(value: string) {
    return this.validateField('religion', value)
  }
  
  validateNationality(value: string) {
    return this.validateField('nationality', value)
  }

  validateGender(value: string) {
    return this.validateField('gender', value)
  }

  validateBirthPlace(value: string) {
    return this.validateField('birthPlace', value)
  }

}


export default new AccountValidator();
