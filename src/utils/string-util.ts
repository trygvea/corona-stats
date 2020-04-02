import { Integer } from '../types/Types'

export const toNumberOrZero = (s?: string): Integer => parseInt(s || '0')
