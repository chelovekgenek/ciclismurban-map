import moment, { Moment } from "moment"

import options from "./options.json"

export const parse = (v: string) => moment(v, options.format)
export const format = (v: Moment) => v.format(options.format)
