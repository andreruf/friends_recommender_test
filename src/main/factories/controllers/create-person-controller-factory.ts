import { CreatePersonController } from '../../../presentation/controllers/create-person/create-person-controller'
import { CpfValidatorAdapter } from '../../../validation/validators/cpf-validator-adapter'
import { makeCreatePerson } from '../usecases/create-person-factory'

export const makeCreatePersonController = (): CreatePersonController => {
  const cpfValidatorAdapter = new CpfValidatorAdapter()

  return new CreatePersonController(cpfValidatorAdapter, makeCreatePerson())
}
