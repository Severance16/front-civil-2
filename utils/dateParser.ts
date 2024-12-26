import { parse, formatISO, format } from "date-fns"

export const formatDate = (date: string): string => {
    const parsedDate = parse(date, "dd/MM/yy", new Date())

    return formatISO(parsedDate)
}

export const formatDateLabel = (date: string): string => {
    return format(new Date(date), "dd/MM/yyyy")
}

export const formatDateTimeLabel = (date: string): string => {
    return format(date, "dd/MM/yyyy hh:mm:ss")
}