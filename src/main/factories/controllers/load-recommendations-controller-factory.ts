import { LoadRecommendationsController } from '../../../presentation/controllers/recommendations/load-recommendations-controller'
import { CpfValidatorAdapter } from '../../../validation/validators/cpf-validator-adapter'
import { makeLoadRecommendations } from '../usecases/load-recommendations-factory'

export const makeLoadRecommendationsController = (): LoadRecommendationsController => {
  const cpfValidatorAdapter = new CpfValidatorAdapter()

  return new LoadRecommendationsController(cpfValidatorAdapter, makeLoadRecommendations())
}
