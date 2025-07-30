import {
  AbstractControl,
  FormArray,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';

async function sleep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
}

export class FormUtils {
  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

  private static patternErrorMessages: Record<string, string> = {
    [this.namePattern]: 'El nombre debe tener formato de nombre y apellido.',
    [this.emailPattern]: 'Introduzca un correo válido.',
    [this.notOnlySpacesPattern]:
      'No se permiten espacios en blanco ni caracteres especiales.',
  };

  static getErrorMessage(errors: ValidationErrors): string | null {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Minimo de ${errors['minlength'].requiredLength} caracteres`;
        case 'min':
          return `Valor minimo de ${errors['min'].min}`;
        case 'email':
          return 'No tiene formato de correo';
        case 'pattern':
          const requiredPattern = errors['pattern'].requiredPattern;
          return (
            FormUtils.patternErrorMessages[requiredPattern] ??
            'El formato del campo es incorrecto.'
          );
        case 'matchFields':
          return 'Los campos no coinciden';
        case 'checkingServerResponse':
          return 'El correo ya existe';
        case 'strider':
          return 'Invalid username';
        default:
          return 'Campo no válido';
      }
    }
    return null;
  }

  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return (
      !!form.controls[fieldName].errors && form.controls[fieldName].touched
    );
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {
    if (!form.controls[fieldName]) return null;

    const errors = form.controls[fieldName].errors ?? {};

    return this.getErrorMessage(errors);
  }

  static isValidFieldInArray(formArray: FormArray, index: number) {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  static matchFields(a: string, b: string) {
    return (formGroup: AbstractControl) => {
      const _a = formGroup.get(a)?.value;
      const _b = formGroup.get(b)?.value;

      return _a === _b
        ? null
        : { matchFields: { valid: false, fields: [a, b] } };
    };
  }

  static getFieldErrorInArray(
    formArray: FormArray,
    index: number
  ): string | null {
    if (!formArray.controls[index]) return null;

    const errors = formArray.controls[index].errors ?? {};

    return this.getErrorMessage(errors);
  }

  static async checkingServerResponse(
    control: AbstractControl
  ): Promise<ValidationErrors | null> {
    await sleep();

    const form = control.value;

    if (form === 'dan@mail.com') {
      return { checkingServerResponse: true };
    }

    return null;
  }

  static async strider(
    control: AbstractControl
  ): Promise<ValidationErrors | null> {
    await sleep();

    const form = control.value;

    if (form === 'strider') {
      return { invalidStrider: true };
    }

    return null;
  }
}
