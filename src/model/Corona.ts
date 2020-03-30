export interface Population {
    country: string
    population: number
    year: number
}

export interface DeathCase {
    country: string
    deaths: {
        date: string
        deaths: number
    }[]
    maxDeaths: number
}
