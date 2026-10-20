import { createContext, useContext, useEffect, useReducer, type Dispatch, type ReactNode } from "react";
import { getGame } from "../data/catalog";
import type { Lang } from "../i18n";

export type ModValue = boolean | number;

export interface State {
  user: string | null;
  lang: Lang;
  theme: "dark" | "light";
  accent: string;
  compact: boolean;
  notifications: boolean;
  tray: boolean;
  myGames: string[];
  recent: string[];
  mods: Record<string, Record<string, ModValue>>;
  toast: string | null;
}

export const initialState: State = {
  user: null,
  lang: "en",
  theme: "dark",
  accent: "#4f7cff",
  compact: false,
  notifications: true,
  tray: true,
  myGames: [],
  recent: [],
  mods: {},
  toast: null,
};

export type Action =
  | { type: "login"; user: string }
  | { type: "logout" }
  | { type: "set"; patch: Partial<Omit<State, "mods" | "myGames" | "recent">> }
  | { type: "addGame"; id: string }
  | { type: "removeGame"; id: string }
  | { type: "open"; id: string }
  | { type: "setMod"; game: string; mod: string; value: ModValue }
  | { type: "setAll"; game: string; on: boolean }
  | { type: "toast"; message: string | null }
  | { type: "reset" };

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "login":
      return { ...state, user: action.user };
    case "logout":
      return { ...state, user: null };
    case "set":
      return { ...state, ...action.patch };
    case "addGame":
      return state.myGames.includes(action.id) ? state : { ...state, myGames: [...state.myGames, action.id] };
    case "removeGame":
      return { ...state, myGames: state.myGames.filter((g) => g !== action.id) };
    case "open":
      return { ...state, recent: [action.id, ...state.recent.filter((g) => g !== action.id)].slice(0, 6) };
    case "setMod":
      return {
        ...state,
        mods: { ...state.mods, [action.game]: { ...state.mods[action.game], [action.mod]: action.value } },
      };
    case "setAll": {
      const game = getGame(action.game);
      if (!game) return state;
      const next: Record<string, ModValue> = { ...state.mods[action.game] };
      for (const m of game.mods) if (m.kind === "toggle") next[m.id] = action.on;
      return { ...state, mods: { ...state.mods, [action.game]: next } };
    }
    case "toast":
      return { ...state, toast: action.message };
    case "reset":
      return initialState;
  }
}

const KEY = "gamemod-hub:v1";

export function load(): State {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...initialState, ...(JSON.parse(raw) as Partial<State>), toast: null };
  } catch {
    /* ignore corrupt or unavailable storage */
  }
  return initialState;
}

const StateCtx = createContext<State>(initialState);
const DispatchCtx = createContext<Dispatch<Action>>(() => {});

export function StoreProvider({ children, initial }: { children: ReactNode; initial?: State }) {
  const [state, dispatch] = useReducer(reducer, initial ?? initialState, (s) => (initial ? s : load()));
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ ...state, toast: null }));
    } catch {
      /* ignore */
    }
  }, [state]);
  useEffect(() => {
    document.documentElement.dataset.theme = state.theme;
    document.documentElement.style.setProperty("--accent", state.accent);
    document.documentElement.lang = state.lang;
  }, [state.theme, state.accent, state.lang]);
  useEffect(() => {
    if (!state.toast) return;
    const t = setTimeout(() => dispatch({ type: "toast", message: null }), 2000);
    return () => clearTimeout(t);
  }, [state.toast]);
  return (
    <StateCtx.Provider value={state}>
      <DispatchCtx.Provider value={dispatch}>{children}</DispatchCtx.Provider>
    </StateCtx.Provider>
  );
}

export const useStore = () => useContext(StateCtx);
export const useDispatch = () => useContext(DispatchCtx);
