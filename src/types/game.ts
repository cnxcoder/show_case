export type GameItem = {
  title: string
  description: string
  url: string
  imageUrl: string
}

export type GamesResponse = {
  games: GameItem[]
}
