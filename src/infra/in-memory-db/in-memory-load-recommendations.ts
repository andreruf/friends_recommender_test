import { type LoadRecommendationsRepository } from '../../data/protocols/load-recommendations-repository'

export class InMemoryLoadRecommendationsRepository implements LoadRecommendationsRepository {
  async load (cpf: string): Promise<string[]> {
    const personByCpfs = global.personCollection.filter(person => person.cpf === cpf)
    const personByCpf = personByCpfs.at(0)
    const personByCpfFriends = personByCpf.friends as string[]
    const friendsOfFriends: Record<string, number> = {}

    for (const friendCpf of personByCpf.friends) {
      const friend = global.personCollection.find((person) => person.cpf === friendCpf)

      if (friend) {
        for (const friendOfFriendCpf of friend.friends) {
          if (
            friendOfFriendCpf !== personByCpf.cpf &&
            !personByCpfFriends.includes(friendOfFriendCpf as string)
          ) {
            friendsOfFriends[friendOfFriendCpf] =
              (friendsOfFriends[friendOfFriendCpf] || 0) + 1
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
