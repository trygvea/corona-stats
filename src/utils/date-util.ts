import { DateTime } from 'luxon'
import { ISODate } from '../types/Types'

export const formatDate = (date: DateTime): string => date.toFormat('LLL dd')

export const formatDateISO = (date: ISODate): string => formatDate(DateTime.fromISO(date))
