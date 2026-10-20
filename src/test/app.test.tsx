import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AppRoutes } from "../App";
import { StoreProvider, initialState, reducer, type State } from "../state/store";
import { translate } from "../i18n";
import { CATALOG } from "../data/catalog";

const renderAt = (path: string, state: Partial<State> = {}) =>
  render(
    <StoreProvider initial={{ ...initialState, user: "tester", ...state }}>
      <MemoryRouter initialEntries={[path]}>
        <AppRoutes />
      </MemoryRouter>
    </StoreProvider>,
  );

beforeEach(() => localStorage.clear());

describe("auth", () => {
  it("redirects to login when signed out and logs in with a username", () => {
    renderAt("/", { user: null });
    fireEvent.click(screen.getByRole("button", { name: "Log in" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Enter a username");
    fireEvent.change(screen.getByLabelText("Username"), { target: { value: "dina" } });
    fireEvent.click(screen.getByRole("button", { name: "Log in" }));
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Welcome back, dina");
  });
});

describe("library", () => {
  it("filters by search and genre, and adds to my games", () => {
    renderAt("/library");
    fireEvent.change(screen.getByLabelText("Search games"), { target: { value: "star" } });
    expect(screen.getAllByTestId(/^card-/)).toHaveLength(1);
    fireEvent.change(screen.getByLabelText("Search games"), { target: { value: "zzz" } });
    expect(screen.getByText("No games match your search.")).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("Search games"), { target: { value: "" } });
    fireEvent.change(screen.getByLabelText("Genre"), { target: { value: "Racing" } });
    expect(screen.getAllByTestId(/^card-/)).toHaveLength(CATALOG.filter((g) => g.genre === "Racing").length);
    const card = screen.getByTestId("card-neon-drift");
    fireEvent.click(within(card).getByRole("button", { name: "Add to my games" }));
    expect(within(card).getByRole("button", { name: "In my games" })).toBeDisabled();
  });
});

describe("game page", () => {
  it("toggles mods and counts active ones", () => {
    renderAt("/game/star-harbor");
    fireEvent.click(screen.getByRole("switch", { name: "Unlimited credits" }));
    expect(screen.getByText("1 active")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Enable all" }));
    expect(screen.getByText("2 active")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Disable all" }));
    expect(screen.getByText("0 active")).toBeInTheDocument();
  });
  it("shows not found for unknown games", () => {
    renderAt("/game/nope");
    expect(screen.getByText("Game not found")).toBeInTheDocument();
  });
  it("remembers recently opened games for the overlay", () => {
    renderAt("/game/iron-trail");
    expect(reducer(initialState, { type: "open", id: "iron-trail" }).recent).toEqual(["iron-trail"]);
  });
});

describe("settings", () => {
  it("switches language to Indonesian", () => {
    renderAt("/settings");
    fireEvent.change(screen.getByLabelText("Language"), { target: { value: "id" } });
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Pengaturan");
  });
});

describe("overlay", () => {
  it("lists mods of the most recent game", () => {
    renderAt("/overlay", { recent: ["hollow-keep"] });
    expect(screen.getByRole("switch", { name: "Infinite health" })).toBeInTheDocument();
  });
  it("shows a hint with no recent game", () => {
    renderAt("/overlay");
    expect(screen.getByText("Open a game to see its mods here.")).toBeInTheDocument();
  });
});

describe("i18n", () => {
  it("interpolates variables and falls back to the key", () => {
    expect(translate("id", "game.active", { count: 3 })).toBe("3 aktif");
    expect(translate("en", "nope" as never)).toBe("nope");
  });
});
