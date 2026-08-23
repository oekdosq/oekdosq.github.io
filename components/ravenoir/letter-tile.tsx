export default function LetterTile({
  text,
  size,
  rounded = "rounded-sm",
  fluid = false,
}: {
  text: string;
  size?: number;
  rounded?: string;
  fluid?: boolean;
}) {
  const ch = (text || "?").trim().charAt(0).toUpperCase() || "?";
  return (
    <span
      className={`grid shrink-0 place-items-center border border-[#272727] bg-[#181818] font-mono text-[#F5F5F5] ${rounded} ${fluid ? "aspect-square h-auto w-full" : ""}`}
      style={fluid ? undefined : { width: size, height: size, fontSize: Math.max(10, (size ?? 48) * 0.34) }}
      aria-hidden
    >
      {ch}
    </span>
  );
}
