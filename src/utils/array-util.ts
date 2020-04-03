export const transpose = <T>(arr: Array<T>[]): Array<T>[] => arr[0].map((_, c) => arr.map((r) => r[c]))

export const last = <T>(arr: Array<T>): T | undefined => (arr.length > 0 ? arr[arr.length - 1] : undefined)
