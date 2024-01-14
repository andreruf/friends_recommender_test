export interface PersonModel {
  name: string
  cpf: string
  friends?: string[]
}

export interface CreatePersonModel {
  name: string
  cpf: string
}
