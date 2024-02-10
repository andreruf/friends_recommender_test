import { type PersonModel } from '../../data/models'
import { type LoadRecommendationsRepository } from '../../data/protocols/load-recommendations-repository'

export class InMemoryLoadRecommendationsRepository implements LoadRecommendationsRepository {
  async load (id: number): Promise<PersonModel> {
    const friendRecommendationData = global.personCollection[id - 1]

    return friendRecommendationData
  }
}
