import { Injectable } from '@angular/core';
import * as PasswordValidation from 'password-validator';
import { PasswordValidationInterface } from '../interfaces/password-validation.interface';

@Injectable({
  providedIn: 'root'
})
export class PasswordValidationService {

  /**
   * It takes the password from the input field, validates it against a schema, and then sets the
   * validPassword and wrongPasswordMessage variables accordingly
   * @param {any} event - any - The event object that is passed to the function.
   */
  public isPasswordValid(password: string | undefined): PasswordValidationInterface {
    var schema = new PasswordValidation();
    schema
      .is().min(8)
      .is().max(60)
      .is().uppercase()
      .is().lowercase()
      .has().digits(1)
      .has().symbols(1)
      .has().not().spaces()
      .is().not().oneOf(['Password', 'password']);
    const result = schema.validate(password!, { details: true });
    if (Array.isArray(result)) {
      if (!!result.length) {
        const pwdValidation: PasswordValidationInterface = {
          message: result[0].message,
          valid: false
        }
        return pwdValidation;
      } else {
        const pwdValidation: PasswordValidationInterface = {
          message: null,
          valid: true
        }
        return pwdValidation;
      }
    }
    const pwdValidation: PasswordValidationInterface = {
      message: null,
      valid: false
    }
    return pwdValidation;
  }
}
