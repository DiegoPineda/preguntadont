import { from, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

export const checkNickName = (nickname: string) => {
  return from(fetch('http://localhost:3200/usuarios'))
    .pipe(
      switchMap((response) => from(response.json())),
      map((users) => !users.some((user: { nickname: string; }) => user.nickname === nickname)),
      catchError(() => of(true)) // Manejo de errores
    );
};

export const checkEmail = (email: string) => {
  return from(fetch('http://localhost:3200/usuarios'))
    .pipe(
      switchMap((response) => from(response.json())),
      map((users) => !users.some((user: { email: string; }) => user.email === email)),
      catchError(() => of(true)) // Manejo de errores
    );
};

export async function verificarNickName(nickname: string): Promise<boolean> {
  try {
    const resultados = await fetch("http://localhost:3200/usuarios", { method: 'GET' });

    if (!resultados.ok) {
      throw new Error(`Error al obtener la lista de usuarios. Código de estado: ${resultados.status}`);
    }

    const usuarios = await resultados.json();

    if (usuarios) {
      for (let item of usuarios) {
        if (item.nickname === nickname) {
          return true;
        }
      }
      return false;
    } else {
      throw new Error("No se pudo obtener la lista de usuarios.");
    }
  } catch (error) {
    console.error("Error al verificar el nickname:", error);
    return false; // En caso de error, devolver false
  }
}