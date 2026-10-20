import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { I18nProvider } from "./i18n";
import { Customize } from "./pages/Customize";
import { GamePage } from "./pages/GamePage";
import { Home } from "./pages/Home";
import { Library } from "./pages/Library";
import { Login } from "./pages/Login";
import { MyGames } from "./pages/MyGames";
import { Overlay } from "./pages/Overlay";
import { Settings } from "./pages/Settings";
import { useStore } from "./state/store";

function Gate({ children }: { children: React.ReactNode }) {
  const { user } = useStore();
  return user ? <>{children}</> : <Navigate to="/login" replace />;
}

export function AppRoutes() {
  const { lang, compact } = useStore();
  return (
    <I18nProvider lang={lang}>
      <div className={compact ? "compact-root" : undefined}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/overlay" element={<Gate><Overlay /></Gate>} />
          <Route element={<Gate><Layout /></Gate>}>
            <Route index element={<Home />} />
            <Route path="my-games" element={<MyGames />} />
            <Route path="library" element={<Library />} />
            <Route path="game/:id" element={<GamePage />} />
            <Route path="customize" element={<Customize />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </I18nProvider>
  );
}

export function App() {
  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  );
}
