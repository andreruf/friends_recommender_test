export interface LoadRecommendationsRepository {
  load: (cpf: string) => Promise<string[]>
}
