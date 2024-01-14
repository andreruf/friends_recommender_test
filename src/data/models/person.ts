export interface PersonModel {
  name: string
  cpf: string
  friends?: string[]
}

export interface CreatePersonModel {
  name: string
  cpf: string
}

export interface CreateRelationshipModel {
  cpf1: string
  cpf2: string
}
