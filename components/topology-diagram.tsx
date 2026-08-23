export function TopologyDiagram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 320"
      className={className}
      fill="none"
      aria-hidden
    >
      {/* Internet cloud */}
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M178 44c-6-12 2-24 16-24 8 0 12 4 16 10 6-8 20-10 26-2 8 6 4 18-6 20" />
        <path d="M168 50h84" opacity="0.6" />
      </g>
      <text
        x="200"
        y="76"
        textAnchor="middle"
        fontFamily="ui-monospace, monospace"
        fontSize="10"
        letterSpacing="2"
        fill="currentColor"
        opacity="0.6"
      >
        internet
      </text>

      {/* Link: internet -> router */}
      <line x1="200" y1="80" x2="200" y2="96" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
      <circle cx="200" cy="88" r="3" fill="oklch(0.87 0.21 123)" />

      {/* Router */}
      <g>
        <rect x="162" y="96" width="76" height="34" rx="8" stroke="currentColor" strokeWidth="1.5" />
        <line x1="162" y1="113" x2="238" y2="113" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        {[176, 192, 208, 224].map((x) => (
          <circle key={x} cx={x} cy="120" r="2.5" fill="currentColor" opacity="0.7" />
        ))}
        <path d="M190 96v-6h20v6" stroke="currentColor" strokeWidth="1.5" />
        <text
          x="200"
          y="143"
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize="10"
          letterSpacing="2"
          fill="currentColor"
          opacity="0.6"
        >
          router
        </text>
      </g>

      {/* Link: router -> switch */}
      <line x1="200" y1="147" x2="200" y2="166" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
      <circle cx="200" cy="156" r="3" fill="oklch(0.87 0.21 123)" />

      {/* Switch */}
      <g>
        <rect x="165" y="166" width="70" height="22" rx="6" stroke="currentColor" strokeWidth="1.5" />
        {[181, 195, 209, 223].map((x) => (
          <circle key={x} cx={x} cy="177" r="2.5" fill="currentColor" opacity="0.7" />
        ))}
        <text
          x="200"
          y="204"
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize="10"
          letterSpacing="2"
          fill="currentColor"
          opacity="0.6"
        >
          switch
        </text>
      </g>

      {/* Links: switch -> clients */}
      {[
        [186, 188, 90, 250],
        [200, 188, 200, 250],
        [214, 188, 310, 250],
      ].map(([x1, y1, x2, y2], i) => (
        <g key={i}>
          <line
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.7"
          />
          <circle cx={(x1 + x2) / 2} cy={(y1 + y2) / 2} r="3" fill="oklch(0.87 0.21 123)" />
        </g>
      ))}

      {/* Clients */}
      {[
        { x: 90, label: "pc-01" },
        { x: 200, label: "pc-02" },
        { x: 310, label: "pc-03" },
      ].map((c, i) => (
        <g key={i}>
          <rect
            x={c.x - 22}
            y="250"
            width="44"
            height="30"
            rx="4"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <line x1={c.x} y1="280" x2={c.x} y2="296" stroke="currentColor" strokeWidth="1.5" />
          <line x1={c.x - 16} y1="296" x2={c.x + 16} y2="296" stroke="currentColor" strokeWidth="1.5" />
          <text
            x={c.x}
            y="314"
            textAnchor="middle"
            fontFamily="ui-monospace, monospace"
            fontSize="10"
            letterSpacing="2"
            fill="currentColor"
            opacity="0.6"
          >
            {c.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
