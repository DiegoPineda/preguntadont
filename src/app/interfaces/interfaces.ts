export interface Productos {
    id: number,
    nombre: string,
    precio: number,
    descripcion: string,
    urlImg: string
}

export interface Usuario {
    id: number,
    nickname: string,
    email: string,
    password: string
}

export interface Tienda {
    id: number,
    monedas: number,
    cantBombas: number,
    cantConejos: number,
    cantRelojes: number,
    cantReversa: number
}

export interface Estadistica {
    id: number,
    puntos: number,
    partidasGanadas: number,
    partidasPerdidas: number,
    partidasEmpatadas: number,
    aciertosArte: number,
    totalArte: number,
    aciertosCiencia: number,
    totalCiencia: number,
    aciertosDeporte: number,
    totalDeporte: number,
    aciertosEntretenimiento: number,
    totalEntretenimiento: number,
    aciertosGeografia: number,
    totalGeografia: number,
    aciertosHistoria: number,
    totalHistoria: number,
}

export interface Session {
    userId: number;
}

export interface Pregunta {
    id: number,
    categoria: string,
    enunciado: string,
    opciones: string[],
    respuesta: string
}

export interface Partida{
    id:number,
    uuid: string,
    idUsuario1:number,
    idUsuario2:number,
    aciertosUsuario1: number,
    aciertosUsuario2: number,
    usuarioFinalizo1: boolean,
    usuarioFinalizo2: boolean,
    contadorUsuario1: number,
    contadorUsuario2: number
}