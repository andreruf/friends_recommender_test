export interface CreateRelationshipModel {
  cpf1: string
  cpf2: string
}

export interface CreateRelationship {
  create: (persons: CreateRelationshipModel) => Promise<string>
}
