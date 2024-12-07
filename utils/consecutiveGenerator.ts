import { InventoryType, ReportType } from "@/types";

let secuence = 0
let secInventory = 0

const sequence = () => {
    if(secuence === 99){
        secuence = 0
        return secuence
    }else {
        secuence += 1
        return secuence
    }
}

export const generateConsecutive = (type: ReportType) => {
    const prefix = type === "progress" ? "AV" : "PE"
    const today = new Date();
    
    // Extraer componentes de la fecha
    const year = today.getFullYear().toString().slice(-2); // Últimos dos dígitos del año
    const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Mes con ceros iniciales
    const day = today.getDate().toString().padStart(2, "0"); // Consecutivo en 2 dígitos
    const seq = sequence()
    
    
    return `${prefix}${year}${month}${day}${seq}`;
}

const sequenceInventory = () => {
    if(secInventory === 99999){
        secInventory = 0
        return secInventory
    }else {
        secInventory += 1
        return secInventory
    }
}

export const generateConsecutiveInventory = (type: InventoryType) => {
    const prefix = type === 'input' ? "NP" : "TL"
    const seq = sequenceInventory()
    return `${prefix}${seq}`
}
