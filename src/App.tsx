import { useEffect, useState } from 'react'
import './App.css'

type GameItem = {
  title: string
  description: string
  url: string
  imageUrl: string
}

type GamesResponse = {
  games: GameItem[]
}

const withBaseUrl = (path: string) => {
  if (/^https?:\/\//i.test(path)) {
    return path
  }

  const base = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`

  return `${base}${path.replace(/^\//, '')}`
}

function App() {
  const [games, setGames] = useState<GameItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const loadGames = async () => {
      try {
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

        if (isMounted) {
          setGames(data.games)
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

    void loadGames()

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
              <article className="game-card" key={`${game.title}-${game.url}`}>
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
            ))}
          </div>
        ) : null}
      </section>
    </main>
  )
}

export default App
