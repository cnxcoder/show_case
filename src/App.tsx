import { useEffect, useState } from 'react'
import { GameCard } from './components/GameCard'
import { loadGames } from './lib/games'
import type { GameItem } from './types/game'
import './App.css'

function App() {
  const [games, setGames] = useState<GameItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const loadGameList = async () => {
      try {
        const gameList = await loadGames()

        if (isMounted) {
          setGames(gameList)
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Cannot load games')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    void loadGameList()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <main className="home-shell">
      <section className="hero-section" aria-labelledby="home-title">
        <p className="eyebrow">CNX Coder Game Showcase</p>
        <h1 id="home-title">Play the latest builds</h1>
        <p className="hero-copy">
          A lightweight home page for playable web game prototypes. The game list
          is loaded from <code>public/games.json</code>, so new games can be added
          without changing React code.
        </p>
      </section>

      <section className="games-section" aria-labelledby="games-title">
        <div className="section-heading">
          <h2 id="games-title">Games</h2>
          <span>{isLoading ? 'Loading…' : `${games.length} available`}</span>
        </div>

        {error ? <p className="state-message error">{error}</p> : null}
        {isLoading ? <p className="state-message">Loading games…</p> : null}

        {!isLoading && !error ? (
          <div className="game-list">
            {games.map((game) => (
              <GameCard game={game} key={`${game.title}-${game.url}`} />
            ))}
          </div>
        ) : null}
      </section>
    </main>
  )
}

export default App
