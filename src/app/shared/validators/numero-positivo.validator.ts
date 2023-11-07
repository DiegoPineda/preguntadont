import { AbstractControl } from '@angular/forms';

export class NumeroPositivoValidator {
  static positivo(control: AbstractControl): { [key: string]: boolean } | null {
    const valor = control.value;

    if (valor === null || valor === undefined || valor <= 0) {
      return { 'positivo': true };
    }

    return null;
  }
}