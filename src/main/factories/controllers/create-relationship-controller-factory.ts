import { CreateRelationshipController } from '../../../presentation/controllers/create-relationship/create-relationship-controller'
import { CpfValidatorAdapter } from '../../../validation/validators/cpf-validator-adapter'
import { makeCreateRelationship } from '../usecases/create-relationship-factory'

export const makeCreateRelationshipController = (): CreateRelationshipController => {
  const cpfValidatorAdapter = new CpfValidatorAdapter()

  return new CreateRelationshipController(cpfValidatorAdapter, makeCreateRelationship())
}
