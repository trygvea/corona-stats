import { Integer } from '../types/Types'

export const sum = (arr: number[]): number => arr.reduce((agg, v) => (agg += v), 0)

export const formatCompact = (n?: Integer): string => {
    if (!n) {
        return 'unknown'
    }
    // @ts-ignore
    return new Intl.NumberFormat('en-GB', { notation: 'compact', compactDisplay: 'short' }).format(n)
}
