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
    name: string
    values: TimelineEntry[]
    maxValue: number
    total: number
}

export interface CountryData extends Timeline {
    population?: number
    totalPerCapita: number
}
