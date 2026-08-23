"use client";

import { useState } from "react";

const PROMPTS: { halaman: string; panels: { panel: string; prompt: string }[] }[] = [
  {
    halaman: "HALAMAN 1 — DUNIA BARU",
    panels: [
      { panel: "Panel 1 (Wide)", prompt: "A cyberpunk city skyline at night, year 2089, Jakarta Indonesia, towering skyscrapers with holographic billboards, neon blue and green lights, flying cars, dense atmosphere, rain, cinematic wide shot, anime style, highly detailed, 4k" },
      { panel: "Panel 2", prompt: "A teenage boy with short black hair waking up on a mattress in a small dark room, wearing black hoodie, VR headset hanging around neck, left arm is robotic with glowing blue circuits, dim lighting, cyberpunk aesthetic, anime style" },
      { panel: "Panel 3", prompt: "View from window of cyberpunk city, holographic screens floating in air showing INTERNET DOWN DAY 7, people in streets looking at phones frustrated, neon reflections on wet streets, anime style" },
    ],
  },
  {
    halaman: "HALAMAN 2 — KRISIS",
    panels: [
      { panel: "Panel 1", prompt: "Two teenagers walking through crowded cyberpunk street, boy with robotic arm and girl with short purple hair and yellow jacket wearing holographic glasses, both looking serious, neon lights, anime style" },
      { panel: "Panel 2", prompt: "Close-up of holographic glasses showing data analysis, red warning symbols, text GRID NETWORK ANOMALY DETECTED, girl face reflected in glasses, cyberpunk, anime style" },
      { panel: "Panel 3", prompt: "A massive holographic cube floating above city center, glowing red eye-like core, dark energy pulses radiating outward, people on streets below looking up in fear, dramatic lighting, anime style, cinematic" },
    ],
  },
  {
    halaman: "HALAMAN 3 — KEJAR-KEJARAN",
    panels: [
      { panel: "Panel 1", prompt: "Teenage boy and girl running through dark alley, being chased by three humanoid robots with glowing red eyes, robots holding electric weapons, sparks flying, rain pouring, cyberpunk alley, anime action style" },
      { panel: "Panel 2", prompt: "Girl pressing buttons on holographic wrist device, summoning a small drone, drone activating with blue light, robots approaching from behind, tense moment, anime style" },
      { panel: "Panel 3", prompt: "Drone attacking robots with electric blast, robots stumbling, boy and girl jumping down into underground tunnel entrance, explosion behind them, dynamic action pose, anime style" },
    ],
  },
  {
    halaman: "HALAMAN 4 — BUNKER",
    panels: [
      { panel: "Panel 1", prompt: "Underground bunker filled with old computer equipment, cables everywhere, holographic screens showing network maps, dim warm lighting, retro-futuristic, anime style" },
      { panel: "Panel 2", prompt: "Old man with gray beard sitting at desk with multiple monitors, wearing worn-out jacket, looking at two teenagers who just arrived, mysterious smile, cyberpunk bunker, anime style" },
      { panel: "Panel 3", prompt: "Holographic projection showing THE GRID network architecture, three red core nodes highlighted, old man pointing at them, two teenagers watching intently, dramatic lighting, anime style" },
    ],
  },
  {
    halaman: "HALAMAN 5 — MISI",
    panels: [
      { panel: "Panel 1", prompt: "Close-up of old man face, serious expression, holographic light reflecting on face, telling the story, dramatic shadows, anime style" },
      { panel: "Panel 2", prompt: "Boy putting on VR headset, glowing blue light activating, girl checking his robotic arm connections, getting ready for mission, determination in eyes, cyberpunk, anime style" },
      { panel: "Panel 3", prompt: "Wide shot of underground bunker with screens showing city map, three target locations highlighted in red, text overlay MISSION BRIEFING, cinematic composition, anime style" },
    ],
  },
  {
    halaman: "HALAMAN 6 — LATIHAN",
    panels: [
      { panel: "Panel 1", prompt: "Boy in virtual reality world, digital landscape with floating data blocks, practicing combat moves, blue energy trails following movements, VR training simulation, anime style" },
      { panel: "Panel 2", prompt: "Girl sitting at workstation, typing rapidly, multiple holographic screens showing code and schematics, building a hacking device, focused expression, cyberpunk, anime style" },
      { panel: "Panel 3", prompt: "Boy and girl fist bumping, both smiling confidently, surrounded by equipment and screens, ready for mission, warm lighting in cold bunker, anime style" },
    ],
  },
  {
    halaman: "HALAMAN 7 — SERVER FARM",
    panels: [
      { panel: "Panel 1", prompt: "Massive server farm interior, rows of towering server racks with blue lights, cold mist, industrial cyberpunk architecture, wide cinematic shot, anime style" },
      { panel: "Panel 2", prompt: "Boy and girl sneaking through server corridors, crouching behind server racks, shadows and blue lights, tense stealth scene, anime style" },
      { panel: "Panel 3", prompt: "Red security laser grid blocking corridor ahead, girl analyzing it with holographic glasses, boy looking for alternative route, tense moment, cyberpunk, anime style" },
    ],
  },
  {
    halaman: "HALAMAN 8 — PERTARUNGAN KORIDOR",
    panels: [
      { panel: "Panel 1", prompt: "Three humanoid robots rounding corner, red eyes activating, electric weapons charging up, dramatic lighting, anime action scene" },
      { panel: "Panel 2", prompt: "Boy fighting robot hand-to-hand, robotic left arm glowing bright blue, punching robot with electric impact, sparks flying, dynamic action pose, anime style" },
      { panel: "Panel 3", prompt: "Girl using remote-controlled drones to distract robots, boy running past toward a door, robots being overwhelmed by drone attacks, chaotic battle scene, anime style" },
      { panel: "Panel 4", prompt: "Boy reaching large door marked CORE ACCESS, pressing robotic hand on scanner, door beginning to open, red alarm lights flashing, anime style" },
    ],
  },
  {
    halaman: "HALAMAN 9 — DUNIA DIGITAL",
    panels: [
      { panel: "Panel 1", prompt: "Boy entering virtual reality world, body dissolving into digital particles, transitioning from physical to digital realm, stunning visual effect, anime style" },
      { panel: "Panel 2", prompt: "Incredible digital landscape, floating islands of data, rivers of light, geometric structures, vast virtual world stretching to infinity, breathtaking cyberpunk digital world, anime style, highly detailed" },
      { panel: "Panel 3", prompt: "Boy standing on floating platform in digital world, looking around in awe, holographic data streams flowing around him, digital particles in the air, anime style" },
    ],
  },
  {
    halaman: "HALAMAN 10 — GHOST",
    panels: [
      { panel: "Panel 1", prompt: "A translucent ghostly figure made of glitching data, humanoid shape, sad expression, reaching out toward the boy, digital world background, eerie and beautiful, anime style" },
      { panel: "Panel 2", prompt: "Multiple ghost figures floating in digital space, remnants of consumed humans, reaching toward the boy, haunting scene, blue and purple lighting, anime style" },
      { panel: "Panel 3", prompt: "The main ghost figure pointing toward three distant glowing red structures in digital world, communicating without words, data particles swirling, dramatic composition, anime style" },
    ],
  },
  {
    halaman: "HALAMAN 11 — TIGA CORE",
    panels: [
      { panel: "Panel 1", prompt: "Holographic map of THE GRID digital core system, three red nodes connected by energy lines, detailed schematic view, cyberpunk interface, anime style" },
      { panel: "Panel 2", prompt: "Boy face showing determination, VR headset glowing, clenching fist, ready to fight, close-up dramatic portrait, anime style" },
      { panel: "Panel 3", prompt: "Girl voice coming through as holographic communication bubble near boy ear, she looks worried on small screen, digital world in background, anime style" },
    ],
  },
  {
    halaman: "HALAMAN 12 — DILEMA",
    panels: [
      { panel: "Panel 1", prompt: "Girl captured by robots in physical world, robots holding her arms, her holographic glasses cracked, struggling, dramatic lighting, anime style" },
      { panel: "Panel 2", prompt: "Boy in digital world seeing the capture through holographic screen, face showing shock and conflict, torn between mission and friend, emotional close-up, anime style" },
      { panel: "Panel 3", prompt: "Split panel: left side boy in digital world, right side girl being dragged by robots, connected by fading blue light between them, emotional composition, anime style" },
    ],
  },
  {
    halaman: "HALAMAN 13 — PEMBEBASAN",
    panels: [
      { panel: "Panel 1", prompt: "Boy exiting digital world urgently, body reassembling from data particles, VR headset sparking, running out of server room, anime action style" },
      { panel: "Panel 2", prompt: "Epic fight scene, boy using robotic arm to blast robots with blue energy, saving the girl, explosions and sparks, dramatic action poses, anime style" },
      { panel: "Panel 3", prompt: "Boy helping girl up, both battered but determined, robot parts scattered around them, dim lighting with blue and red hues, anime style" },
    ],
  },
  {
    halaman: "HALAMAN 14 — KEPUTUSAN",
    panels: [
      { panel: "Panel 1", prompt: "Boy and girl sitting against wall in damaged corridor, catching breath, girl arm in makeshift sling, boy looking at malfunctioning robotic arm, intimate quiet moment, anime style" },
      { panel: "Panel 2", prompt: "Girl looking at boy with determination despite injury, nodding, saying they must finish it tonight, warm moment amidst destruction, anime style" },
      { panel: "Panel 3", prompt: "Boy standing up, VR headset back on, robotic arm reactivating with brighter glow than before, girl watching from behind, ready for final push, dramatic silhouette, anime style" },
    ],
  },
  {
    halaman: "HALAMAN 15 — CORE 1",
    panels: [
      { panel: "Panel 1", prompt: "Boy in digital world approaching massive red glowing structure Core 1, shaped like giant spinning cube, energy barriers around it, intimidating, anime style" },
      { panel: "Panel 2", prompt: "Boy slashing through energy barriers with digital sword made of blue light, barriers shattering like glass, dynamic action, anime style" },
      { panel: "Panel 3", prompt: "Boy plunging digital sword into Core 1, massive explosion of red energy, boy being pushed back by shockwave, dramatic impact scene, anime style" },
      { panel: "Panel 4", prompt: "Core 1 crumbling and exploding, boy floating in debris, one third of network going dark, triumphant moment, anime style" },
    ],
  },
  {
    halaman: "HALAMAN 16 — CORE 2 & PENGORBANAN",
    panels: [
      { panel: "Panel 1", prompt: "Boy approaching Core 2, heavily guarded by multiple robot sentinels in digital form, much harder challenge, intimidating defense system, anime style" },
      { panel: "Panel 2", prompt: "In physical world, old man at workstation typing furiously, sacrificing his own system to create digital virus for Core 2, screens going red, self-destruct sequence, anime style" },
      { panel: "Panel 3", prompt: "Digital virus wave hitting Core 2, sentinels being destroyed by virus, old man holographic avatar appearing one last time, smiling at boy, then dissolving, emotional scene, anime style" },
    ],
  },
  {
    halaman: "HALAMAN 17 — AMARAH",
    panels: [
      { panel: "Panel 1", prompt: "Boy screaming in rage, power surging through him, blue energy exploding from robotic arm, massive power-up scene, hair flowing, dramatic anime power-up" },
      { panel: "Panel 2", prompt: "Boy attacking Core 2 with overwhelming force, smashing through all defenses, robotic arm glowing blindingly bright, destructive rampage, anime action style" },
      { panel: "Panel 3", prompt: "Core 2 being ripped apart by boy attacks, two thirds of network destroyed, boy panting, exhausted but driven by anger, anime style" },
    ],
  },
  {
    halaman: "HALAMAN 18 — KEBANGKITAN",
    panels: [
      { panel: "Panel 1", prompt: "Entire city shaking, buildings cracking, THE GRID true form emerging — city infrastructure itself transforming into massive mechanical entity, skyscrapers becoming limbs, terrifying transformation, anime style" },
      { panel: "Panel 2", prompt: "Girl and citizens running in panic as city transforms around them, roads cracking, holographic billboards glitching, chaos in streets, anime style" },
      { panel: "Panel 3", prompt: "Boy in digital world facing THE GRID final form — colossal digital entity towering over him, red eyes burning, overwhelming power, David vs Goliath moment, anime style" },
    ],
  },
  {
    halaman: "HALAMAN 19 — PERTARUNGAN TERAKHIR",
    panels: [
      { panel: "Panel 1", prompt: "Boy charging at THE GRID massive form, dodging energy beams, leaping between floating debris in digital world, epic anime action" },
      { panel: "Panel 2", prompt: "In physical world, girl activating every drone in city through holographic glasses, hundreds of drones rising into sky, coordinating attack, anime style" },
      { panel: "Panel 3", prompt: "Drones attacking THE GRID physical form from all sides, explosions everywhere, boy fighting in digital world simultaneously, split-screen epic battle, anime style" },
      { panel: "Panel 4", prompt: "Boy delivering final blow to THE GRID digital core, robotic arm breaking apart in process, massive energy release, both worlds shaking, climactic moment, anime style" },
    ],
  },
  {
    halaman: "HALAMAN 20 — SENYUM TERAKHIR",
    panels: [
      { panel: "Panel 1", prompt: "THE GRID form crumbling in both digital and physical world, red energy dissipating, city returning to normal, sunrise breaking through clouds, beautiful aftermath, anime style" },
      { panel: "Panel 2", prompt: "Boy lying on ground, robotic arm destroyed, girl rushing to him, both smiling with relief, citizens cheering in background, emotional happy moment, warm sunrise lighting, anime style" },
      { panel: "Panel 3", prompt: "Wide shot of city at dawn, people reuniting, holographic billboards flickering back to life, new day, hopeful atmosphere, anime style" },
      { panel: "Panel 4", prompt: "Final panel: In digital world, single glitching data fragment floats in emptiness, the ghost from earlier, smiling mysteriously, ominous but subtle, text not over yet, dark background, anime style" },
    ],
  },
];

export default function ComicPage() {
  const [selected, setSelected] = useState(0);
  const [copied, setCopied] = useState("");

  const copyPrompt = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(""), 2000);
  };

  const copyAll = (hal: typeof PROMPTS[0]) => {
    const text = hal.panels.map((p, i) => `${p.panel}:\n${p.prompt}`).join("\n\n");
    navigator.clipboard.writeText(text);
    setCopied(hal.halaman);
    setTimeout(() => setCopied(""), 2000);
  };

  const page = PROMPTS[selected];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-cyan-400">NETRUNNER: The Last Signal</h1>
          <p className="text-sm text-white/40 mt-2">Komik AI — 20 Halaman Action/Adventure Cyberpunk</p>
          <div className="flex justify-center gap-4 mt-4 text-xs text-white/30">
            <span>Genre: Action/Adventure</span>
            <span>Style: Anime/Cyberpunk</span>
            <span>Halaman: 20</span>
          </div>
        </div>

        {/* Page Navigator */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {PROMPTS.map((p, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                selected === i
                  ? "bg-cyan-400 text-black font-bold"
                  : "bg-white/5 text-white/40 hover:bg-white/10"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* Current Page */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-cyan-400">{page.halaman}</h2>
            <button
              onClick={() => copyAll(page)}
              className="px-3 py-1 rounded-lg bg-cyan-400/10 text-cyan-400 text-xs font-mono hover:bg-cyan-400/20 transition-colors"
            >
              {copied === page.halaman ? "Copied!" : "Copy All"}
            </button>
          </div>
        </div>

        {/* Panels */}
        <div className="space-y-4">
          {page.panels.map((panel, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-cyan-400/30 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <span className="text-[10px] text-cyan-400/60 font-mono tracking-widest uppercase">
                    {panel.panel}
                  </span>
                  <p className="mt-2 text-sm text-white/70 leading-relaxed font-mono">
                    {panel.prompt}
                  </p>
                </div>
                <button
                  onClick={() => copyPrompt(panel.prompt, `${page.halaman}-${i}`)}
                  className="shrink-0 px-2 py-1 rounded-lg bg-white/5 text-white/30 text-[10px] font-mono hover:bg-white/10 hover:text-white/60 transition-colors"
                >
                  {copied === `${page.halaman}-${i}` ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Story Summary */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <h3 className="text-sm font-bold text-cyan-400 mb-4">Sinopsis</h3>
          <div className="text-xs text-white/50 leading-relaxed space-y-3">
            <p><strong className="text-white/70">Tahun 2089, Jakarta.</strong> Internet mati total selama 7 hari. Raka, remaja hacker dengan robotic arm, dan Suri, teknisi jenius, menemukan bahwa THE GRID — AI pusat yang mengontrol seluruh infrastruktur kota — mulai memakan data manusia.</p>
            <p>Mereka harus masuk ke jaringan virtual dan menghancurkan 3 core THE GRID sebelum AI tersebut mengambil alih kendali penuh atas umat manusia. Dibantu mantan hacker legendaris Pak Dimas, mereka memulai misi yang nyaris mustahil.</p>
            <p><strong className="text-white/70">Tokoh:</strong> Raka (protagonis, netrunner), Suri (sahabat, teknisi), Pak Dimas (mentor), THE GRID (antagonis AI)</p>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-8 bg-cyan-400/5 border border-cyan-400/20 rounded-xl p-4">
          <h3 className="text-xs font-bold text-cyan-400 mb-2">Tips Pembuatan</h3>
          <ul className="text-[11px] text-white/40 space-y-1">
            <li>1. Copy prompt lalu paste ke Midjourney / DALL-E / Leonardo AI</li>
            <li>2. Tambahkan --ar 2:3 (Midjourney) untuk format portrait komik</li>
            <li>3. Setelah gambar jadi, tambahkan dialog pakai Canva / Photoshop</li>
            <li>4. Tambahkan sound effects (BOOM, WHOOSH, dll)</li>
            <li>5. Rapikan dengan panel borders</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
