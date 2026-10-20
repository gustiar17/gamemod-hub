import { ModList } from "../components/ModList";
import { getGame } from "../data/catalog";
import { useT } from "../i18n";
import { useStore } from "../state/store";

export function Overlay() {
  const t = useT();
  const { recent } = useStore();
  const game = recent.length ? getGame(recent[0]) : undefined;
  return (
    <section className="overlay">
      <h1>{t("overlay.title")}</h1>
      <p className="muted small">{t("overlay.hint")}</p>
      {game ? (
        <>
          <h2>{game.title}</h2>
          <ModList gameId={game.id} compact />
        </>
      ) : (
        <p className="muted">{t("overlay.nothing")}</p>
      )}
    </section>
  );
}
