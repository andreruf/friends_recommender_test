export interface PersonModel {
  id: number
  name: string
  cpf: string
  friends: Friends[]
}

export type Friends = {
  id: number
  cpf: string
}

export interface CreateRelationshipModel {
  cpf1: string
  cpf2: string
}
