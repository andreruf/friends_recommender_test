import { type PersonModel } from '../models'

export interface LoadPersonRepository {
  load: (cpf: string) => Promise<PersonModel | null>
}
