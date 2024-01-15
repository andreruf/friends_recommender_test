import { DbLoadRecommendations } from '../../../data/usecases/load-recommendations/load-recommendations'
import { InMemoryLoadRecommendationsRepository } from '../../../infra/in-memory-db/in-memory-load-recommendations'

export const makeLoadRecommendations = (): DbLoadRecommendations => {
  const inMemoryLoadRecommendationsRepository = new InMemoryLoadRecommendationsRepository()
  return new DbLoadRecommendations(inMemoryLoadRecommendationsRepository)
}
