export const transpose = <T>(arr: Array<T>[]): Array<T>[] => arr[0].map((_, c) => arr.map((r) => r[c]))
