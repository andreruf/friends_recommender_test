import { DbLoadRecommendations } from '../../../data/usecases/load-recommendations/load-recommendations'
import { InMemoryLoadPersonRepository } from '../../../infra/in-memory-db/in-memory-load-person'
import { InMemoryLoadRecommendationsRepository } from '../../../infra/in-memory-db/in-memory-load-recommendations'

export const makeLoadRecommendations = (): DbLoadRecommendations => {
  const inMemoryLoadRecommendationsRepository = new InMemoryLoadRecommendationsRepository()
  const inMemoryLoadPersonRepository = new InMemoryLoadPersonRepository()
  return new DbLoadRecommendations(inMemoryLoadRecommendationsRepository, inMemoryLoadPersonRepository)
}
