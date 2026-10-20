import { getGame } from "../data/catalog";
import { GameCard } from "../components/GameCard";
import { activeCount } from "../components/ModList";
import { useT } from "../i18n";
import { useDispatch, useStore } from "../state/store";

export function MyGames() {
  const t = useT();
  const { myGames, mods } = useStore();
  const dispatch = useDispatch();
  const games = myGames.map(getGame).filter((g): g is NonNullable<typeof g> => Boolean(g));
  return (
    <>
      <h1>{t("myGames.title")}</h1>
      {games.length === 0 ? (
        <p className="muted">{t("myGames.empty")}</p>
      ) : (
        <div className="grid">
          {games.map((g) => (
            <GameCard key={g.id} game={g}>
              <span className="muted small">{t("game.active", { count: activeCount(g.id, mods[g.id]) })}</span>
              <button onClick={() => dispatch({ type: "removeGame", id: g.id })}>{t("myGames.remove")}</button>
            </GameCard>
          ))}
        </div>
      )}
    </>
  );
}
