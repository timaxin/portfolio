import type { Diagram } from "@/content/diagrams";
import { t, type Locale } from "@/i18n/config";

/** Node-sized grid. Everything else is derived from these five numbers. */
const NODE_W = 140;
const NODE_H = 58;
const GAP_X = 54;
const GAP_Y = 26;
/** Room for the arrowhead, the edge labels and the route that goes over the top. */
const PAD = 34;

const x = (col: number) => PAD + col * (NODE_W + GAP_X);
const y = (row: number) => PAD + row * (NODE_H + GAP_Y);

export function ProjectDiagram({ diagram, locale }: { diagram: Diagram; locale: Locale }) {
  const at = new Map(diagram.nodes.map((node) => [node.id, node]));
  const cols = Math.max(...diagram.nodes.map((n) => n.col));
  const rows = Math.max(...diagram.nodes.map((n) => n.row));
  const width = x(cols) + NODE_W + PAD;
  const height = y(rows) + NODE_H + PAD;
  // The content column is max-w-3xl less its padding. Known at render time, so
  // the fade is only attached to a diagram that genuinely runs past the edge.
  const overflows = width > 728;

  return (
    // The diagram scrolls rather than shrinking: text scaled down to fit a phone
    // would be unreadable, and a diagram nobody can read is decoration. The fade
    // on the right edge is what says so — a cut-off box reads as a broken layout.
    <div
      className={`-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0${overflows ? " diagram-scroll" : ""}`}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        role="img"
        className="h-auto max-w-none"
        style={{ minWidth: width }}
      >
        <defs>
          <marker
            id="diagram-arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--border)" />
          </marker>
        </defs>

        {diagram.edges.map((edge) => {
          const from = at.get(edge.from);
          const to = at.get(edge.to);
          if (!from || !to) return null;

          const fromX = x(from.col) + NODE_W;
          const fromY = y(from.row) + NODE_H / 2;
          const toX = x(to.col);
          const toY = y(to.row) + NODE_H / 2;

          // A path that leaves the top of the source, runs above every box and
          // comes back down into the target — used for a response travelling back
          // the way the request came.
          const overPath = `M ${x(from.col) + NODE_W / 2} ${y(from.row)} V ${PAD / 2} H ${
            x(to.col) + NODE_W / 2
          } V ${y(to.row)}`;

          // Fan-in and fan-out: leave horizontally, turn once at the midpoint,
          // arrive horizontally. A diagonal would cross the boxes it passes.
          const midX = (fromX + toX) / 2;
          const path =
            from.row === to.row
              ? `M ${fromX} ${fromY} H ${toX}`
              : `M ${fromX} ${fromY} H ${midX} V ${toY} H ${toX}`;

          const labelX = edge.over ? (x(from.col) + x(to.col) + NODE_W) / 2 : midX;
          // Above the boxes, not beside them: a label long enough to be worth
          // reading is wider than the gap it would otherwise sit in.
          const labelY = edge.over ? PAD / 2 - 6 : Math.min(y(from.row), y(to.row)) - 8;

          return (
            <g key={`${edge.from}-${edge.to}`}>
              <path
                d={edge.over ? overPath : path}
                fill="none"
                stroke="var(--border)"
                strokeWidth="1.5"
                strokeDasharray={edge.dashed ? "5 4" : undefined}
                markerEnd="url(#diagram-arrow)"
              />
              {edge.label && (
                <text
                  x={labelX}
                  y={labelY}
                  textAnchor="middle"
                  fill="var(--muted)"
                  fontSize="11"
                >
                  {t(edge.label, locale)}
                </text>
              )}
            </g>
          );
        })}

        {diagram.nodes.map((node) => (
          <g key={node.id}>
            <rect
              x={x(node.col)}
              y={y(node.row)}
              width={NODE_W}
              height={NODE_H}
              rx="12"
              fill="var(--surface)"
              stroke={node.mine ? "var(--accent)" : "var(--border)"}
              strokeWidth={node.mine ? "1.5" : "1"}
            />
            <text
              x={x(node.col) + NODE_W / 2}
              y={y(node.row) + (node.sub ? 25 : 33)}
              textAnchor="middle"
              fill="var(--foreground)"
              fontSize="13"
              fontWeight="500"
            >
              {t(node.label, locale)}
            </text>
            {node.sub && (
              <text
                x={x(node.col) + NODE_W / 2}
                y={y(node.row) + 41}
                textAnchor="middle"
                fill="var(--muted)"
                fontSize="10.5"
              >
                {t(node.sub, locale)}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}
