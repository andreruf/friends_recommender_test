import { LoadPersonController } from '../../../presentation/controllers/load-person/load-person-controller'
import { CpfValidatorAdapter } from '../../../validation/validators/cpf-validator-adapter'
import { makeLoadPerson } from '../usecases/load-person-factory'

export const makeLoadPersonController = (): LoadPersonController => {
  const cpfValidatorAdapter = new CpfValidatorAdapter()

  return new LoadPersonController(cpfValidatorAdapter, makeLoadPerson())
}
