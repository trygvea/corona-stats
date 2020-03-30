export interface Population {
    country: string
    population: number
    year: number
}

export interface TimelineEntry {
    date: string
    value: number
}

export interface Timeline {
    values: TimelineEntry[]
    maxValue: number
    total: number
}

export interface CountryData extends Timeline {
    name: string
    population?: number
    totalPerCapita?: number
}
