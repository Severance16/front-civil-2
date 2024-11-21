import { parse, formatISO } from "date-fns"

export const formatDate = (date: string): string => {
    const parsedDate = parse(date, "dd-MM-yy", new Date())

    return formatISO(parsedDate)
}