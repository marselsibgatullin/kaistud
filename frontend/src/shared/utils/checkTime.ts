import { getMilliseconds } from "./getMilliseconds"

type Options = {
    minTime?: string,
    maxTime?: string,
}

export const checkTime = (time: string, options: Options) => {
    const currentTime = getMilliseconds(time)
    if (options.maxTime && currentTime > getMilliseconds(options.maxTime)) return `Максимальное время должно быть не больше ${options.maxTime}`
    if (options.minTime && currentTime < getMilliseconds(options.minTime)) return `Минимальное время должно быть не меньше ${options.minTime}`
    return true
}