import type { GameItem } from '../types/game'
import { withBaseUrl } from '../lib/url'

type GameCardProps = {
  game: GameItem
}

export function GameCard({ game }: GameCardProps) {
  return (
    <article className="game-card">
      <a className="game-image-link" href={withBaseUrl(game.url)}>
        <img src={withBaseUrl(game.imageUrl)} alt={`${game.title} screenshot`} />
      </a>
      <div className="game-content">
        <h3>{game.title}</h3>
        <p>{game.description}</p>
        <a className="play-button" href={withBaseUrl(game.url)}>
          Play game
        </a>
      </div>
    </article>
  )
}
