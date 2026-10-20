import { Link } from "react-router-dom";
import type { Game } from "../data/catalog";

export function GameCover({ game, size = 64 }: { game: Game; size?: number }) {
  return (
    <div className="cover" style={{ background: game.color, width: size, height: size }} aria-hidden>
      {game.title.charAt(0)}
    </div>
  );
}

export function GameCard({ game, children }: { game: Game; children?: React.ReactNode }) {
  return (
    <div className="card" data-testid={`card-${game.id}`}>
      <Link to={`/game/${game.id}`} className="card-link">
        <GameCover game={game} size={72} />
        <div>
          <h3>{game.title}</h3>
          <p className="muted">{game.genre}</p>
        </div>
      </Link>
      {children && <div className="card-actions">{children}</div>}
    </div>
  );
}
