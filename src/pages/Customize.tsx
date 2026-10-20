import { useT } from "../i18n";
import { useDispatch, useStore } from "../state/store";

const ACCENTS = ["#4f7cff", "#9b59ff", "#34c38f", "#ff7a45", "#ff4fa3"];

export function Customize() {
  const t = useT();
  const { theme, accent, compact } = useStore();
  const dispatch = useDispatch();
  return (
    <>
      <h1>{t("customize.title")}</h1>
      <h2>{t("customize.theme")}</h2>
      <div className="row" role="radiogroup" aria-label={t("customize.theme")}>
        {(["dark", "light"] as const).map((v) => (
          <label key={v}>
            <input type="radio" name="theme" checked={theme === v} onChange={() => dispatch({ type: "set", patch: { theme: v } })} />
            {t(v === "dark" ? "customize.dark" : "customize.light")}
          </label>
        ))}
      </div>
      <h2>{t("customize.accent")}</h2>
      <div className="row">
        {ACCENTS.map((c) => (
          <button key={c} aria-label={c} aria-pressed={accent === c} className="swatch" style={{ background: c }} onClick={() => dispatch({ type: "set", patch: { accent: c } })} />
        ))}
      </div>
      <label className="row">
        <input type="checkbox" checked={compact} onChange={(e) => dispatch({ type: "set", patch: { compact: e.target.checked } })} />
        {t("customize.compact")}
      </label>
    </>
  );
}
