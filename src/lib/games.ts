import type { GameItem, GamesResponse } from '../types/game'
import { withBaseUrl } from './url'

export const loadGames = async (): Promise<GameItem[]> => {
  const response = await fetch(withBaseUrl('games.json'), {
    headers: { Accept: 'application/json' },
  })

  if (!response.ok) {
    throw new Error(`Cannot load games.json (${response.status})`)
  }

  const data = (await response.json()) as GamesResponse

  if (!Array.isArray(data.games)) {
    throw new Error('games.json must contain a games array')
  }

  return data.games
}
