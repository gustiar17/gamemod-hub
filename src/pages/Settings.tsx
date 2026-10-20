import { LANGS, useT, type Lang } from "../i18n";
import { useDispatch, useStore } from "../state/store";

export function Settings() {
  const t = useT();
  const { lang, notifications, tray } = useStore();
  const dispatch = useDispatch();
  return (
    <>
      <h1>{t("settings.title")}</h1>
      <label className="row">
        {t("settings.language")}
        <select value={lang} onChange={(e) => dispatch({ type: "set", patch: { lang: e.target.value as Lang } })}>
          {(Object.keys(LANGS) as Lang[]).map((l) => <option key={l} value={l}>{LANGS[l].label}</option>)}
        </select>
      </label>
      <label className="row">
        <input type="checkbox" checked={notifications} onChange={(e) => dispatch({ type: "set", patch: { notifications: e.target.checked } })} />
        <span>{t("settings.notifications")} <span className="muted small">{t("settings.notificationsHelp")}</span></span>
      </label>
      <label className="row">
        <input type="checkbox" checked={tray} onChange={(e) => dispatch({ type: "set", patch: { tray: e.target.checked } })} />
        {t("settings.trayHelp")}
      </label>
      <button className="danger" onClick={() => window.confirm(t("settings.resetConfirm")) && dispatch({ type: "reset" })}>
        {t("settings.reset")}
      </button>
    </>
  );
}
