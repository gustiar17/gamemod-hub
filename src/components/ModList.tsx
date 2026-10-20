import { getGame } from "../data/catalog";
import { useT } from "../i18n";
import { useDispatch, useStore } from "../state/store";

export function ModList({ gameId, compact }: { gameId: string; compact?: boolean }) {
  const t = useT();
  const state = useStore();
  const dispatch = useDispatch();
  const game = getGame(gameId);
  if (!game) return null;
  if (game.mods.length === 0) return <p className="muted">{t("game.noMods")}</p>;
  const values = state.mods[gameId] ?? {};
  const say = (name: string, on: string) => state.notifications && dispatch({ type: "toast", message: `${name}: ${on}` });
  return (
    <ul className={"mods" + (compact ? " compact" : "")}>
      {game.mods.map((m) => {
        const v = values[m.id];
        return (
          <li key={m.id}>
            <span className="mod-name">{m.name}</span>
            {m.hotkey && <kbd title={t("game.hotkey")}>{m.hotkey}</kbd>}
            {m.kind === "toggle" ? (
              <input
                type="checkbox"
                role="switch"
                aria-label={m.name}
                checked={v === true}
                onChange={(e) => {
                  dispatch({ type: "setMod", game: gameId, mod: m.id, value: e.target.checked });
                  say(m.name, e.target.checked ? "ON" : "OFF");
                }}
              />
            ) : (
              <span className="slider">
                <input
                  type="range"
                  aria-label={m.name}
                  min={m.min}
                  max={m.max}
                  step={m.step}
                  value={typeof v === "number" ? v : (m.default ?? m.min ?? 0)}
                  onChange={(e) => dispatch({ type: "setMod", game: gameId, mod: m.id, value: Number(e.target.value) })}
                />
                <output>{typeof v === "number" ? v : (m.default ?? m.min ?? 0)}</output>
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function activeCount(gameId: string, values: Record<string, boolean | number> | undefined): number {
  const game = getGame(gameId);
  if (!game || !values) return 0;
  return game.mods.filter((m) => (m.kind === "toggle" ? values[m.id] === true : typeof values[m.id] === "number" && values[m.id] !== (m.default ?? m.min))).length;
}
