import { CATALOG, getGame } from "../data/catalog";
import { GameCard } from "../components/GameCard";
import { useT } from "../i18n";
import { useStore } from "../state/store";

export function Home() {
  const t = useT();
  const { user, recent } = useStore();
  const recents = recent.map(getGame).filter((g): g is NonNullable<typeof g> => Boolean(g));
  return (
    <>
      <h1>{t("home.greeting", { name: user ?? "" })}</h1>
      <h2>{t("home.continuePlaying")}</h2>
      {recents.length === 0 ? <p className="muted">{t("home.empty")}</p> : <div className="grid">{recents.map((g) => <GameCard key={g.id} game={g} />)}</div>}
      <h2>{t("home.featured")}</h2>
      <div className="grid">{CATALOG.slice(0, 4).map((g) => <GameCard key={g.id} game={g} />)}</div>
    </>
  );
}
