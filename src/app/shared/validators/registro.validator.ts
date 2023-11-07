import { from, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

export const checkNickName = (nickname: string) => {
  return from(fetch('http://localhost:3000/usuarios'))
    .pipe(
      switchMap((response) => from(response.json())),
      map((users) => !users.some((user: { nickname: string; }) => user.nickname === nickname)),
      catchError(() => of(true)) // Manejo de errores
    );
};

export const checkEmail = (email: string) => {
  return from(fetch('http://localhost:3000/usuarios'))
    .pipe(
      switchMap((response) => from(response.json())),
      map((users) => !users.some((user: { email: string; }) => user.email === email)),
      catchError(() => of(true)) // Manejo de errores
    );
};