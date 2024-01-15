import { type LoadRecommendations } from '../../../domain/usecases/load-recommendations'

export class DbLoadRecommendations implements LoadRecommendations {
  constructor (private readonly loadRecommendations: LoadRecommendations) {}

  async load (cpf: string): Promise<string[]> {
    return this.loadRecommendations.load(cpf)
  }
}
