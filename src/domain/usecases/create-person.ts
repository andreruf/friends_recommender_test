import { type PersonModel } from '../models'

export interface CreatePersonModel {
  name: string
  cpf: string
}

export interface CreatePerson {
  create: (person: CreatePersonModel) => Promise<PersonModel | null>
}
