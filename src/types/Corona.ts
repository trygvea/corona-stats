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
