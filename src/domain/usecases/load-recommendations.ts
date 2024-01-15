export interface LoadRecommendations {
  load: (cpf: string) => Promise<string[]>
}
