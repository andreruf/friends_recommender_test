import { type PersonModel } from '../models'

export interface LoadPerson {
  load: (cpf: string) => Promise<PersonModel | null>
}
