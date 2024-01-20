export interface CreateRelationship {
  create: (cpf1: string, cpf2: string) => Promise<string | null>
}
