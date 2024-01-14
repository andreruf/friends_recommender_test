import { type CreatePersonModel, type PersonModel } from '../usecases/create-person/create-person-protocols'

export interface CreatePersonRepository {
  create: (personData: CreatePersonModel) => Promise<PersonModel>
}
