import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { CATALOG, getGame } from "../data/catalog";
import { useT, type MessageKey } from "../i18n";
import { useDispatch, useStore } from "../state/store";
import { GameCover } from "./GameCard";

const NAV: [string, MessageKey][] = [
  ["/", "nav.home"],
  ["/my-games", "nav.myGames"],
  ["/library", "nav.library"],
  ["/customize", "nav.customize"],
  ["/settings", "nav.settings"],
];

export function Layout() {
  const t = useT();
  const { user, myGames, toast } = useStore();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pinned = myGames.map(getGame).filter((g): g is NonNullable<typeof g> => Boolean(g));
  return (
    <div className="shell">
      <header className="topbar">
        <strong className="brand">{t("app.name")}</strong>
        <nav aria-label="Main">
          {NAV.map(([to, key]) => (
            <NavLink key={to} to={to} end={to === "/"}>
              {t(key)}
            </NavLink>
          ))}
        </nav>
        <span className="spacer" />
        <span className="user">{user}</span>
        <button
          onClick={() => {
            dispatch({ type: "logout" });
            navigate("/login");
          }}
        >
          {t("auth.logOut")}
        </button>
      </header>
      <aside className="sidebar" aria-label="Games">
        <h2>{t("nav.myGames")}</h2>
        <ul>
          {(pinned.length ? pinned : CATALOG.slice(0, 0)).map((g) => (
            <li key={g.id}>
              <NavLink to={`/game/${g.id}`}>
                <GameCover game={g} size={28} />
                {g.title}
              </NavLink>
            </li>
          ))}
        </ul>
        {pinned.length === 0 && <p className="muted small">{t("myGames.empty")}</p>}
      </aside>
      <main>
        <Outlet />
      </main>
      {toast && (
        <div className="toast" role="status">
          {toast}
        </div>
      )}
    </div>
  );
}
