import { round, isNull } from 'lodash'

export const roundNum = (num) => (isNull(num) ? '' : round(num, 3))

export const baseLog = (x, y) => Math.log(y) / Math.log(x)
