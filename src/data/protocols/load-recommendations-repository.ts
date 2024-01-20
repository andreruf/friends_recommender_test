import { type PersonModel } from '../models'

export interface LoadRecommendationsRepository {
  load: (id: number) => Promise<PersonModel>
}
