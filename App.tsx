function App() {
  const games = [
    { id: 'clockwork', name: 'Clockwork Crisis', desc: 'Clockwork Crisis' },
  ]

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-6xl p-8">
        <h1 className="mb-8 text-center text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          🎮 Show Case
        </h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {games.map(game => (
            <a key={game.id} href={`./games/${game.id}/index.html`} className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-cyan-500 hover:scale-105">
              <h2 className="text-xl font-semibold">{game.name}</h2>
              <p className="mt-2 text-zinc-400">{game.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App