import type { Localized } from "@/i18n/config";

/**
 * Architecture sketches for the projects where the architecture is the story.
 *
 * Deliberately drawings rather than screenshots: most of this work is under NDA,
 * and for an engineering reader a data path says more than a UI ever would.
 * Positions are a coarse grid — `col` and `row` in node-sized steps — because
 * these diagrams are small enough that a layout engine would cost more than it
 * saves. Rows may be fractional to centre a node against a fan-in.
 */
export type DiagramNode = {
  id: string;
  label: Localized;
  /** Second line, for the technology behind the box. */
  sub?: Localized;
  col: number;
  row: number;
  /** Marks the parts he built himself, as opposed to what was already there. */
  mine?: boolean;
};

export type DiagramEdge = {
  from: string;
  to: string;
  label?: Localized;
  /** A return path — a stream coming back, or a monitoring tap. */
  dashed?: boolean;
  /** Routes the edge over the top instead of straight through the boxes. */
  over?: boolean;
};

export type Diagram = { nodes: DiagramNode[]; edges: DiagramEdge[] };

const ru = (r: string, e: string, p: string): Localized => ({ ru: r, en: e, pl: p });

export const diagrams: Record<string, Diagram> = {
  "ai-portfolio": {
    nodes: [
      { id: "browser", label: ru("Браузер", "Browser", "Przeglądarka"), sub: ru("React", "React", "React"), col: 0, row: 0, mine: true },
      { id: "proxy", label: ru("/api/chat", "/api/chat", "/api/chat"), sub: ru("прокси с ключом", "key-holding proxy", "proxy z kluczem"), col: 1, row: 0, mine: true },
      { id: "model", label: ru("Anthropic API", "Anthropic API", "Anthropic API"), sub: ru("Claude Haiku", "Claude Haiku", "Claude Haiku"), col: 2, row: 0 },
      { id: "kb", label: ru("profile.ts, projects.ts", "profile.ts, projects.ts", "profile.ts, projects.ts"), sub: ru("системный промпт", "system prompt", "prompt systemowy"), col: 1, row: 1, mine: true },
    ],
    edges: [
      { from: "browser", to: "proxy", label: ru("вопрос", "question", "pytanie") },
      { from: "kb", to: "proxy" },
      { from: "proxy", to: "model" },
      { from: "model", to: "browser", label: ru("поток NDJSON", "NDJSON stream", "strumień NDJSON"), dashed: true, over: true },
    ],
  },

  "ship-tracking-platform": {
    nodes: [
      { id: "ship", label: ru("Судно", "Vessel", "Statek"), sub: ru("датчики, камеры", "sensors, cameras", "czujniki, kamery"), col: 0, row: 0 },
      { id: "parser", label: ru("Node-парсер", "Node parser", "Parser Node"), sub: ru("разбор датаграмм", "datagram parsing", "parsowanie datagramów"), col: 1, row: 0, mine: true },
      { id: "tsdb", label: ru("TimescaleDB", "TimescaleDB", "TimescaleDB"), sub: ru("временные ряды", "time series", "szeregi czasowe"), col: 2, row: 0, mine: true },
      { id: "graphql", label: ru("GraphQL", "GraphQL", "GraphQL"), sub: ru("Apollo", "Apollo", "Apollo"), col: 3, row: 0, mine: true },
      { id: "ui", label: ru("3D-интерфейс", "3D interface", "Interfejs 3D"), sub: ru("палубы, узлы, карта", "decks, nodes, map", "pokłady, węzły, mapa"), col: 4, row: 0, mine: true },
    ],
    edges: [
      { from: "ship", to: "parser", label: ru("UDP, непрерывно", "UDP, continuous", "UDP, ciągle") },
      { from: "parser", to: "tsdb" },
      { from: "tsdb", to: "graphql" },
      { from: "graphql", to: "ui", label: ru("нормализованный кэш", "normalised cache", "znormalizowany cache") },
    ],
  },

  "price-comparison-platform": {
    nodes: [
      { id: "browser", label: ru("Браузер", "Browser", "Przeglądarka"), col: 0, row: 0.5 },
      { id: "site", label: ru("Next.js", "Next.js", "Next.js"), sub: ru("несколько продуктов", "several products", "kilka produktów"), col: 1, row: 0.5, mine: true },
      { id: "bff", label: ru("BFF", "BFF", "BFF"), sub: ru("Node, Express", "Node, Express", "Node, Express"), col: 2, row: 0.5, mine: true },
      { id: "svc1", label: ru("Сервисы котировок", "Quote services", "Serwisy ofert"), col: 3, row: 0 },
      { id: "svc2", label: ru("Внутренние API", "Internal APIs", "Wewnętrzne API"), col: 3, row: 1 },
    ],
    edges: [
      { from: "browser", to: "site" },
      { from: "site", to: "bff", label: ru("агрегация", "aggregation", "agregacja") },
      { from: "bff", to: "svc1" },
      { from: "bff", to: "svc2" },
    ],
  },

  radioheart: {
    nodes: [
      { id: "deckA", label: ru("Дека A", "Deck A", "Deck A"), col: 0, row: 0, mine: true },
      { id: "deckB", label: ru("Дека B", "Deck B", "Deck B"), col: 0, row: 1, mine: true },
      { id: "ads", label: ru("Джинглы и реклама", "Jingles and ads", "Jingle i reklamy"), col: 0, row: 2, mine: true },
      { id: "mic", label: ru("Микрофон", "Microphone", "Mikrofon"), col: 0, row: 3, mine: true },
      { id: "mixer", label: ru("Микшер", "Mixer", "Mikser"), sub: ru("Web Audio API", "Web Audio API", "Web Audio API"), col: 1, row: 1.5, mine: true },
      { id: "stream", label: ru("Эфир", "Live stream", "Antena"), sub: ru("слушатели", "listeners", "słuchacze"), col: 2, row: 1 },
      { id: "cue", label: ru("Наушники", "Headphones", "Słuchawki"), sub: ru("предслушивание", "cue before air", "odsłuch przed anteną"), col: 2, row: 2, mine: true },
    ],
    edges: [
      { from: "deckA", to: "mixer" },
      { from: "deckB", to: "mixer" },
      { from: "ads", to: "mixer" },
      { from: "mic", to: "mixer" },
      { from: "mixer", to: "stream" },
      { from: "mixer", to: "cue", dashed: true },
    ],
  },
};
