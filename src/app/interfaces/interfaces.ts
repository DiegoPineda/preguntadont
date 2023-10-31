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

export interface Tienda{
    id: number,
    monedas: number,
    cantBombas: number,
    cantConejitos: number,
    cantRelojitos: number
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