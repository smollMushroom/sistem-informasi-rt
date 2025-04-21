import { composeValidators, matchRegex, minLength, required } from "./baseValidator";

class AccountValidator {
  static validateEmail = composeValidators(
    required('Email'),
    matchRegex(
      'Email',
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'tidak valid'
    )
  )

  static validateUsername = required('Username')

  static validatePassword = composeValidators(
    required("Password"),
    minLength('Password', 6)
  );
}

export default AccountValidator;