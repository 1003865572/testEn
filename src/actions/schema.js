import { Schema, arrayOf } from 'normalizr'

export const person = new Schema('persons')
export const arrayOfPersons = arrayOf(person)

export const disk = new Schema('disk')
export const arrayOfDisks = arrayOf(disk)
