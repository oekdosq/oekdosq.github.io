"use client";

import { useState } from "react";

const PROMPTS: { h: string; p: { n: string; t: string }[] }[] = [
  {
    h: "1",
    p: [
      { n: "P1", t: "A cyberpunk city skyline at night, year 2089, Jakarta Indonesia, towering skyscrapers with holographic billboards, neon blue and green lights, flying cars, dense atmosphere, rain, cinematic wide shot, anime style, highly detailed, 4k" },
      { n: "P2", t: "A teenage boy with short black hair waking up on a mattress in a small dark room, wearing black hoodie, VR headset hanging around neck, left arm is robotic with glowing blue circuits, dim lighting, cyberpunk aesthetic, anime style" },
      { n: "P3", t: "View from window of cyberpunk city, holographic screens floating in air showing INTERNET DOWN DAY 7, people in streets looking at phones frustrated, neon reflections on wet streets, anime style" },
    ],
  },
  {
    h: "2",
    p: [
      { n: "P1", t: "Two teenagers walking through crowded cyberpunk street, boy with robotic arm and girl with short purple hair and yellow jacket wearing holographic glasses, both looking serious, neon lights, anime style" },
      { n: "P2", t: "Close-up of holographic glasses showing data analysis, red warning symbols, text GRID NETWORK ANOMALY DETECTED, girl face reflected in glasses, cyberpunk, anime style" },
      { n: "P3", t: "A massive holographic cube floating above city center, glowing red eye-like core, dark energy pulses radiating outward, people on streets below looking up in fear, dramatic lighting, anime style, cinematic" },
    ],
  },
  {
    h: "3",
    p: [
      { n: "P1", t: "Teenage boy and girl running through dark alley, being chased by three humanoid robots with glowing red eyes, robots holding electric weapons, sparks flying, rain pouring, cyberpunk alley, anime action style" },
      { n: "P2", t: "Girl pressing buttons on holographic wrist device, summoning a small drone, drone activating with blue light, robots approaching from behind, tense moment, anime style" },
      { n: "P3", t: "Drone attacking robots with electric blast, robots stumbling, boy and girl jumping down into underground tunnel entrance, explosion behind them, dynamic action pose, anime style" },
    ],
  },
  {
    h: "4",
    p: [
      { n: "P1", t: "Underground bunker filled with old computer equipment, cables everywhere, holographic screens showing network maps, dim warm lighting, retro-futuristic, anime style" },
      { n: "P2", t: "Old man with gray beard sitting at desk with multiple monitors, wearing worn-out jacket, looking at two teenagers who just arrived, mysterious smile, cyberpunk bunker, anime style" },
      { n: "P3", t: "Holographic projection showing THE GRID network architecture, three red core nodes highlighted, old man pointing at them, two teenagers watching intently, dramatic lighting, anime style" },
    ],
  },
  {
    h: "5",
    p: [
      { n: "P1", t: "Close-up of old man face, serious expression, holographic light reflecting on face, telling the story, dramatic shadows, anime style" },
      { n: "P2", t: "Boy putting on VR headset, glowing blue light activating, girl checking his robotic arm connections, getting ready for mission, determination in eyes, cyberpunk, anime style" },
      { n: "P3", t: "Wide shot of underground bunker with screens showing city map, three target locations highlighted in red, text overlay MISSION BRIEFING, cinematic composition, anime style" },
    ],
  },
  {
    h: "6",
    p: [
      { n: "P1", t: "Boy in virtual reality world, digital landscape with floating data blocks, practicing combat moves, blue energy trails following movements, VR training simulation, anime style" },
      { n: "P2", t: "Girl sitting at workstation, typing rapidly, multiple holographic screens showing code and schematics, building a hacking device, focused expression, cyberpunk, anime style" },
      { n: "P3", t: "Boy and girl fist bumping, both smiling confidently, surrounded by equipment and screens, ready for mission, warm lighting in cold bunker, anime style" },
    ],
  },
  {
    h: "7",
    p: [
      { n: "P1", t: "Massive server farm interior, rows of towering server racks with blue lights, cold mist, industrial cyberpunk architecture, wide cinematic shot, anime style" },
      { n: "P2", t: "Boy and girl sneaking through server corridors, crouching behind server racks, shadows and blue lights, tense stealth scene, anime style" },
      { n: "P3", t: "Red security laser grid blocking corridor ahead, girl analyzing it with holographic glasses, boy looking for alternative route, tense moment, cyberpunk, anime style" },
    ],
  },
  {
    h: "8",
    p: [
      { n: "P1", t: "Three humanoid robots rounding corner, red eyes activating, electric weapons charging up, dramatic lighting, anime action scene" },
      { n: "P2", t: "Boy fighting robot hand-to-hand, robotic left arm glowing bright blue, punching robot with electric impact, sparks flying, dynamic action pose, anime style" },
      { n: "P3", t: "Girl using remote-controlled drones to distract robots, boy running past toward a door, robots being overwhelmed by drone attacks, chaotic battle scene, anime style" },
      { n: "P4", t: "Boy reaching large door marked CORE ACCESS, pressing robotic hand on scanner, door beginning to open, red alarm lights flashing, anime style" },
    ],
  },
  {
    h: "9",
    p: [
      { n: "P1", t: "Boy entering virtual reality world, body dissolving into digital particles, transitioning from physical to digital realm, stunning visual effect, anime style" },
      { n: "P2", t: "Incredible digital landscape, floating islands of data, rivers of light, geometric structures, vast virtual world stretching to infinity, breathtaking cyberpunk digital world, anime style, highly detailed" },
      { n: "P3", t: "Boy standing on floating platform in digital world, looking around in awe, holographic data streams flowing around him, digital particles in the air, anime style" },
    ],
  },
  {
    h: "10",
    p: [
      { n: "P1", t: "A translucent ghostly figure made of glitching data, humanoid shape, sad expression, reaching out toward the boy, digital world background, eerie and beautiful, anime style" },
      { n: "P2", t: "Multiple ghost figures floating in digital space, remnants of consumed humans, reaching toward the boy, haunting scene, blue and purple lighting, anime style" },
      { n: "P3", t: "The main ghost figure pointing toward three distant glowing red structures in digital world, communicating without words, data particles swirling, dramatic composition, anime style" },
    ],
  },
  {
    h: "11",
    p: [
      { n: "P1", t: "Holographic map of THE GRID digital core system, three red nodes connected by energy lines, detailed schematic view, cyberpunk interface, anime style" },
      { n: "P2", t: "Boy face showing determination, VR headset glowing, clenching fist, ready to fight, close-up dramatic portrait, anime style" },
      { n: "P3", t: "Girl voice coming through as holographic communication bubble near boy ear, she looks worried on small screen, digital world in background, anime style" },
    ],
  },
  {
    h: "12",
    p: [
      { n: "P1", t: "Girl captured by robots in physical world, robots holding her arms, her holographic glasses cracked, struggling, dramatic lighting, anime style" },
      { n: "P2", t: "Boy in digital world seeing the capture through holographic screen, face showing shock and conflict, torn between mission and friend, emotional close-up, anime style" },
      { n: "P3", t: "Split panel: left side boy in digital world, right side girl being dragged by robots, connected by fading blue light between them, emotional composition, anime style" },
    ],
  },
  {
    h: "13",
    p: [
      { n: "P1", t: "Boy exiting digital world urgently, body reassembling from data particles, VR headset sparking, running out of server room, anime action style" },
      { n: "P2", t: "Epic fight scene, boy using robotic arm to blast robots with blue energy, saving the girl, explosions and sparks, dramatic action poses, anime style" },
      { n: "P3", t: "Boy helping girl up, both battered but determined, robot parts scattered around them, dim lighting with blue and red hues, anime style" },
    ],
  },
  {
    h: "14",
    p: [
      { n: "P1", t: "Boy and girl sitting against wall in damaged corridor, catching breath, girl arm in makeshift sling, boy looking at malfunctioning robotic arm, intimate quiet moment, anime style" },
      { n: "P2", t: "Girl looking at boy with determination despite injury, nodding, saying they must finish it tonight, warm moment amidst destruction, anime style" },
      { n: "P3", t: "Boy standing up, VR headset back on, robotic arm reactivating with brighter glow than before, girl watching from behind, ready for final push, dramatic silhouette, anime style" },
    ],
  },
  {
    h: "15",
    p: [
      { n: "P1", t: "Boy in digital world approaching massive red glowing structure Core 1, shaped like giant spinning cube, energy barriers around it, intimidating, anime style" },
      { n: "P2", t: "Boy slashing through energy barriers with digital sword made of blue light, barriers shattering like glass, dynamic action, anime style" },
      { n: "P3", t: "Boy plunging digital sword into Core 1, massive explosion of red energy, boy being pushed back by shockwave, dramatic impact scene, anime style" },
      { n: "P4", t: "Core 1 crumbling and exploding, boy floating in debris, one third of network going dark, triumphant moment, anime style" },
    ],
  },
  {
    h: "16",
    p: [
      { n: "P1", t: "Boy approaching Core 2, heavily guarded by multiple robot sentinels in digital form, much harder challenge, intimidating defense system, anime style" },
      { n: "P2", t: "In physical world, old man at workstation typing furiously, sacrificing his own system to create digital virus for Core 2, screens going red, self-destruct sequence, anime style" },
      { n: "P3", t: "Digital virus wave hitting Core 2, sentinels being destroyed by virus, old man holographic avatar appearing one last time, smiling at boy, then dissolving, emotional scene, anime style" },
    ],
  },
  {
    h: "17",
    p: [
      { n: "P1", t: "Boy screaming in rage, power surging through him, blue energy exploding from robotic arm, massive power-up scene, hair flowing, dramatic anime power-up" },
      { n: "P2", t: "Boy attacking Core 2 with overwhelming force, smashing through all defenses, robotic arm glowing blindingly bright, destructive rampage, anime action style" },
      { n: "P3", t: "Core 2 being ripped apart by boy attacks, two thirds of network destroyed, boy panting, exhausted but driven by anger, anime style" },
    ],
  },
  {
    h: "18",
    p: [
      { n: "P1", t: "Entire city shaking, buildings cracking, THE GRID true form emerging — city infrastructure itself transforming into massive mechanical entity, skyscrapers becoming limbs, terrifying transformation, anime style" },
      { n: "P2", t: "Girl and citizens running in panic as city transforms around them, roads cracking, holographic billboards glitching, chaos in streets, anime style" },
      { n: "P3", t: "Boy in digital world facing THE GRID final form — colossal digital entity towering over him, red eyes burning, overwhelming power, David vs Goliath moment, anime style" },
    ],
  },
  {
    h: "19",
    p: [
      { n: "P1", t: "Boy charging at THE GRID massive form, dodging energy beams, leaping between floating debris in digital world, epic anime action" },
      { n: "P2", t: "In physical world, girl activating every drone in city through holographic glasses, hundreds of drones rising into sky, coordinating attack, anime style" },
      { n: "P3", t: "Drones attacking THE GRID physical form from all sides, explosions everywhere, boy fighting in digital world simultaneously, split-screen epic battle, anime style" },
      { n: "P4", t: "Boy delivering final blow to THE GRID digital core, robotic arm breaking apart in process, massive energy release, both worlds shaking, climactic moment, anime style" },
    ],
  },
  {
    h: "20",
    p: [
      { n: "P1", t: "THE GRID form crumbling in both digital and physical world, red energy dissipating, city returning to normal, sunrise breaking through clouds, beautiful aftermath, anime style" },
      { n: "P2", t: "Boy lying on ground, robotic arm destroyed, girl rushing to him, both smiling with relief, citizens cheering in background, emotional happy moment, warm sunrise lighting, anime style" },
      { n: "P3", t: "Wide shot of city at dawn, people reuniting, holographic billboards flickering back to life, new day, hopeful atmosphere, anime style" },
      { n: "P4", t: "Final panel: In digital world, single glitching data fragment floats in emptiness, the ghost from earlier, smiling mysteriously, ominous but subtle, text not over yet, dark background, anime style" },
    ],
  },
];

export default function ComicPrompts() {
  const [copied, setCopied] = useState("");
  const [mode, setMode] = useState<"individual" | "all">("individual");

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(""), 2000);
  };

  const copyAllPrompts = () => {
    const all = PROMPTS.map(
      (pg) =>
        `=== HALAMAN ${pg.h} ===\n` +
        pg.p.map((p) => `${p.n}: ${p.t}`).join("\n")
    ).join("\n\n");
    navigator.clipboard.writeText(all);
    setCopied("ALL");
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-cyan-400">NETRUNNER: The Last Signal</h1>
          <p className="text-xs text-white/30 mt-1">20 Halaman — Action/Adventure Cyberpunk — Anime Style</p>
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => setMode("individual")}
              className={`px-3 py-1 text-[10px] rounded border ${
                mode === "individual"
                  ? "border-cyan-400 text-cyan-400"
                  : "border-white/10 text-white/30"
              }`}
            >
              Per Panel
            </button>
            <button
              onClick={() => setMode("all")}
              className={`px-3 py-1 text-[10px] rounded border ${
                mode === "all"
                  ? "border-cyan-400 text-cyan-400"
                  : "border-white/10 text-white/30"
              }`}
            >
              Semua Prompt
            </button>
            <button
              onClick={copyAllPrompts}
              className="ml-auto px-3 py-1 text-[10px] rounded bg-cyan-400 text-black font-bold"
            >
              {copied === "ALL" ? "Copied!" : "Copy Semua"}
            </button>
          </div>
        </div>

        {/* Individual Mode */}
        {mode === "individual" && (
          <div className="space-y-6">
            {PROMPTS.map((pg, pi) => (
              <div key={pi}>
                <div className="text-[10px] text-cyan-400/60 tracking-widest mb-2">
                  HALAMAN {pg.h}
                </div>
                <div className="space-y-2">
                  {pg.p.map((panel, i) => (
                    <div
                      key={i}
                      className="border border-white/5 rounded p-2 text-[11px] text-white/50 leading-relaxed"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span>
                          <span className="text-cyan-400/40 font-bold">{panel.n}</span>{" "}
                          {panel.t}
                        </span>
                        <button
                          onClick={() => copy(panel.t, `${pi}-${i}`)}
                          className="shrink-0 text-[9px] text-white/20 hover:text-white/50"
                        >
                          {copied === `${pi}-${i}` ? "OK" : "copy"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* All Mode */}
        {mode === "all" && (
          <div className="space-y-4">
            {PROMPTS.map((pg, pi) => (
              <div key={pi} className="border border-white/5 rounded p-3">
                <div className="text-[10px] text-cyan-400/60 tracking-widest mb-2">
                  HALAMAN {pg.h}
                </div>
                <div className="space-y-1">
                  {pg.p.map((panel, i) => (
                    <div
                      key={i}
                      className="text-[11px] text-white/50 leading-relaxed"
                    >
                      <span className="text-cyan-400/40 font-bold">{panel.n}:</span>{" "}
                      {panel.t}
                    </div>
                  ))}
                </div>
                <button
                  onClick={() =>
                    copy(
                      pg.p.map((p) => `${p.n}: ${p.t}`).join("\n"),
                      `pg-${pi}`
                    )
                  }
                  className="mt-2 text-[9px] text-white/20 hover:text-white/50"
                >
                  {copied === `pg-${pi}` ? "Copied!" : "Copy Halaman ini"}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Tips */}
        <div className="mt-8 border-t border-white/5 pt-4 text-[10px] text-white/20 space-y-1">
          <p>• Paste prompt ke Midjourney / DALL-E / Leonardo AI</p>
          <p>• Tambah --ar 2:3 di Midjourney buat format portrait</p>
          <p>• Setelah jadi gambar, tambahin dialog pakai Canva</p>
        </div>
      </div>
    </div>
  );
}
