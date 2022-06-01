import {AbstractControl, FormControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export class OfferValidators {
  static dateFormat(date: Date): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value == null) {
        return null;
      }
      return date.getTime() <= new Date(control.value).getTime() ? null : {dateFormat: {valid: false}}
    }
  }
}
