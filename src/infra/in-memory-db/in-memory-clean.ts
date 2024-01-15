import { type CleanRepository } from '../../data/protocols/clean-repository'

export class InMemoryCleanRepository implements CleanRepository {
  async cleanAll (): Promise<string> {
    global.personCollection = []

    return 'Database cleaned'
  }
}
