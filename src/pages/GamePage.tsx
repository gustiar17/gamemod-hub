import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getGame } from "../data/catalog";
import { GameCover } from "../components/GameCard";
import { ModList, activeCount } from "../components/ModList";
import { useT } from "../i18n";
import { useDispatch, useStore } from "../state/store";

export function GamePage() {
  const t = useT();
  const { id = "" } = useParams();
  const game = getGame(id);
  const { mods } = useStore();
  const dispatch = useDispatch();
  useEffect(() => {
    if (game) dispatch({ type: "open", id: game.id });
  }, [game, dispatch]);
  if (!game) return <h1>{t("game.notFound")}</h1>;
  return (
    <>
      <div className="game-head">
        <GameCover game={game} size={96} />
        <div>
          <h1>{game.title}</h1>
          <p className="muted">{game.genre} · {game.blurb}</p>
          <p className="muted small">{t("game.active", { count: activeCount(game.id, mods[game.id]) })}</p>
        </div>
      </div>
      <div className="row">
        <button onClick={() => dispatch({ type: "setAll", game: game.id, on: true })}>{t("game.enableAll")}</button>
        <button onClick={() => dispatch({ type: "setAll", game: game.id, on: false })}>{t("game.disableAll")}</button>
      </div>
      <h2>{t("game.mods")}</h2>
      <ModList gameId={game.id} />
      <p className="muted small">{t("game.simulated")}</p>
    </>
  );
}
