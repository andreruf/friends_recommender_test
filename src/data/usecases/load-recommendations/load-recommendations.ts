import { type LoadRecommendations } from '../../../domain/usecases/load-recommendations'
import { type LoadRecommendationsRepository } from '../../protocols/load-recommendations-repository'
import { type LoadPersonRepository } from '../load-person/load-person-protocols'

export class DbLoadRecommendations implements LoadRecommendations {
  constructor (private readonly loadRecommendationsRepository: LoadRecommendationsRepository, private readonly loadPersonRepository: LoadPersonRepository) {}

  async load (cpf: string): Promise<string[] | null> {
    const originalPerson = await this.loadPersonRepository.load(cpf)

    if (!originalPerson) {
      return null
    }

    const friendsOfFriends: Record<string, number> = {}

    for (const person of originalPerson.friends) {
      const originalPersonFriend = await this.loadRecommendationsRepository.load(person.id)

      if (originalPersonFriend) {
        for (const friendOfFriend of originalPersonFriend.friends) {
          if (
            friendOfFriend.id !== originalPerson.id &&
            !originalPerson.friends.find((originalPersonFriend) => friendOfFriend.id === originalPersonFriend.id)
          ) {
            friendsOfFriends[friendOfFriend.cpf] =
              (friendsOfFriends[friendOfFriend.cpf] || 0) + 1
          }
        }
      }
    }

    const sortedFriendsOfFriends = Object.entries(friendsOfFriends).sort(
      (a, b) => b[1] - a[1]
    )

    return sortedFriendsOfFriends.map(([cpf]) => cpf)
  }
}
