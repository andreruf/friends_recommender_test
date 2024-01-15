import { type Clean } from '../../../domain/usecases/clean'
import { type CleanRepository } from './clean-protocols'

export class DbClean implements Clean {
  constructor (private readonly cleanRepository: CleanRepository) {}

  async cleanAll (): Promise<string> {
    const result = await this.cleanRepository.cleanAll()
    return result
  }
}
