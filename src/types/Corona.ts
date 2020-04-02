import { Integer, ISODate } from './Types'

export interface Population {
    country: string
    population: Integer
    year: Integer
}

export interface TimelineEntry {
    date: ISODate
    value: number
}

export interface Timeline {
    name: string
    values: TimelineEntry[]
    maxValue: number
    total: number
}

export interface CountryData extends Timeline {
    population?: Integer
    totalPerCapita: number
}

export const accumulateTotals = (values: TimelineEntry[]): TimelineEntry[] =>
    values.reduce<TimelineEntry[]>((acc, val, i) => {
        if (i === 0) {
            acc.push(val)
        } else {
            acc.push({ ...val, value: acc[i - 1].value + val.value })
        }
        return acc
    }, [])
