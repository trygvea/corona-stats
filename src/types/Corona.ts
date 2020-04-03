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
    values: TimelineEntry[]
    maxValue: number
    total: number
}

export interface LoadedTimeline extends Timeline {
    countryName: string
}

export interface PopulationTimeline extends Timeline {
    totalPerCapita: number
}

export interface CountryData {
    name: string
    population?: Integer
    deaths: PopulationTimeline
    cases: PopulationTimeline
}

export const EmptyTimeline: Timeline = {
    values: [],
    maxValue: 0,
    total: 0,
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
