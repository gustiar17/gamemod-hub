import { useMemo, useState } from "react";
import { CATALOG, GENRES } from "../data/catalog";
import { GameCard } from "../components/GameCard";
import { useT } from "../i18n";
import { useDispatch, useStore } from "../state/store";

export function Library() {
  const t = useT();
  const { myGames } = useStore();
  const dispatch = useDispatch();
  const [q, setQ] = useState("");
  const [genre, setGenre] = useState("");
  const list = useMemo(
    () => CATALOG.filter((g) => (!genre || g.genre === genre) && g.title.toLowerCase().includes(q.trim().toLowerCase())),
    [q, genre],
  );
  return (
    <>
      <h1>{t("library.title")}</h1>
      <div className="filters">
        <input type="search" placeholder={t("library.search")} aria-label={t("library.search")} value={q} onChange={(e) => setQ(e.target.value)} />
        <select aria-label={t("library.genre")} value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="">{t("library.all")}</option>
          {GENRES.map((g) => <option key={g}>{g}</option>)}
        </select>
      </div>
      {list.length === 0 ? (
        <p className="muted">{t("library.noResults")}</p>
      ) : (
        <div className="grid">
          {list.map((g) => {
            const owned = myGames.includes(g.id);
            return (
              <GameCard key={g.id} game={g}>
                <button disabled={owned} onClick={() => dispatch({ type: "addGame", id: g.id })}>
                  {owned ? t("library.added") : t("library.add")}
                </button>
              </GameCard>
            );
          })}
        </div>
      )}
    </>
  );
}
