import {AbstractControl, FormControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export class OfferValidators {
  static dateMinimum(date: Date): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value == null) {
        return null;
      }

      if (!date) {
        return null;
      }
      return date <= control.value ? null : {dateFormat: {valid: false}}
    }
  }
}
