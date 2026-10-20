export type ModKind = "toggle" | "slider";

export interface Mod {
  id: string;
  name: string;
  kind: ModKind;
  hotkey?: string;
  min?: number;
  max?: number;
  step?: number;
  default?: number;
}

export interface Game {
  id: string;
  title: string;
  genre: string;
  color: string;
  blurb: string;
  mods: Mod[];
}

const t = (id: string, name: string, hotkey?: string): Mod => ({ id, name, kind: "toggle", hotkey });
const s = (id: string, name: string, min: number, max: number, def: number, hotkey?: string): Mod => ({
  id, name, kind: "slider", min, max, step: 1, default: def, hotkey,
});

export const CATALOG: Game[] = [
  { id: "star-harbor", title: "Star Harbor", genre: "Strategy", color: "#4f7cff", blurb: "Build a trading port among the stars.",
    mods: [t("credits", "Unlimited credits", "F1"), s("speed", "Build speed", 1, 10, 1, "F2"), t("fog", "Reveal map", "F3")] },
  { id: "iron-trail", title: "Iron Trail", genre: "Racing", color: "#ff7a45", blurb: "Cross the continent on rail and road.",
    mods: [t("nitro", "Infinite boost", "F1"), s("grip", "Tire grip", 1, 5, 1), t("damage", "No damage", "F4")] },
  { id: "hollow-keep", title: "Hollow Keep", genre: "RPG", color: "#9b59ff", blurb: "Explore a castle that rearranges itself.",
    mods: [t("hp", "Infinite health", "F1"), t("mana", "Infinite mana", "F2"), s("xp", "XP multiplier", 1, 20, 1, "F3"), t("weight", "No carry weight")] },
  { id: "pixel-orchard", title: "Pixel Orchard", genre: "Simulation", color: "#34c38f", blurb: "A cozy farm with too many apples.",
    mods: [t("water", "Self-watering crops"), s("grow", "Growth rate", 1, 8, 1, "F1"), t("stamina", "Infinite stamina", "F2")] },
  { id: "neon-drift", title: "Neon Drift", genre: "Racing", color: "#ff4fa3", blurb: "Night races through a glowing city.",
    mods: [t("nitro", "Infinite nitro", "F1"), t("police", "Ignore police", "F2")] },
  { id: "deep-signal", title: "Deep Signal", genre: "Survival", color: "#2bb3c0", blurb: "Survive the silence of a drowned station.",
    mods: [t("o2", "Infinite oxygen", "F1"), t("light", "Never run out of light", "F2"), s("loot", "Loot amount", 1, 5, 1)] },
  { id: "tower-tide", title: "Tower & Tide", genre: "Strategy", color: "#f5c542", blurb: "Defend a coast from the rising sea.",
    mods: [t("gold", "Unlimited gold", "F1"), s("rate", "Wave delay", 1, 10, 1)] },
  { id: "ember-knight", title: "Ember Knight", genre: "Action", color: "#ef4444", blurb: "A fast, fiery platform brawler.",
    mods: [t("hp", "Infinite health", "F1"), t("jump", "Double jump always on", "F2"), s("dmg", "Damage multiplier", 1, 10, 1)] },
  { id: "quiet-isles", title: "Quiet Isles", genre: "Simulation", color: "#7dd3fc", blurb: "Island life without the hurry.",
    mods: [t("time", "Freeze time", "F1"), s("friend", "Friendship gain", 1, 5, 1)] },
  { id: "rift-runner", title: "Rift Runner", genre: "Action", color: "#a3e635", blurb: "Run, slide, and warp through shattered worlds.",
    mods: [t("warp", "No warp cooldown", "F1"), t("ammo", "Infinite ammo", "F2")] },
  { id: "moss-and-mortar", title: "Moss & Mortar", genre: "Puzzle", color: "#84cc16", blurb: "Rebuild ruins one block at a time.",
    mods: [t("hint", "Free hints", "F1"), s("undo", "Undo steps", 1, 50, 10)] },
  { id: "salt-road", title: "Salt Road", genre: "RPG", color: "#d97706", blurb: "Caravans, bargains, and old grudges.",
    mods: [t("coin", "Unlimited coin", "F1"), t("food", "No hunger", "F2"), s("cap", "Caravan capacity", 1, 10, 1)] },
];

export const GENRES = Array.from(new Set(CATALOG.map((g) => g.genre))).sort();

export const getGame = (id: string): Game | undefined => CATALOG.find((g) => g.id === id);
