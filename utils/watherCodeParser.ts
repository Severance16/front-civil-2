const watherCodeList = {
    1: "Parcialmente nublado",
    0: "Soleado o despejado",
    2: "Nublado",
    3: "Cubierto",
    45: "Niebla",
    48: "Niebla depositante",
    51: "Lluvia ligera",
    53: "Lluvia moderada",
    55: "Lluvia intensa",
    61: "Lluvia intermitente ligera",
    63: "Lluvia intermitente moderada",
    65: "Lluvia intermitente intensa",
    71: "Nevada ligera",
    73: "Nevada moderada",
    75: "Nevada intensa",
    95: "Tormenta",
    99: "Tormenta severa"
}

export const weatherCodeParse = (cod: number): string => {
    if (cod in watherCodeList) {
        return watherCodeList[cod as keyof typeof watherCodeList];
    }
    return "Código desconocido";
};