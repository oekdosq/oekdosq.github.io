"use client";

import { useState, useRef } from "react";

const STORY: {
  title: string;
  panels: {
    prompt: string;
    dialog?: string;
    sfx?: string;
  }[];
}[] = [
  {
    title: "DUNIA BARU",
    panels: [
      {
        prompt: "A cyberpunk city skyline at night, year 2089, Jakarta Indonesia, towering skyscrapers with holographic billboards, neon blue and green lights, flying cars, dense atmosphere, rain, cinematic wide shot, anime style, highly detailed, 4k",
      },
      {
        prompt: "A teenage boy with short black hair waking up on a mattress in a small dark room, wearing black hoodie, VR headset hanging around neck, left arm is robotic with glowing blue circuits, dim lighting, cyberpunk aesthetic, anime style",
        dialog: "Mimpi... buruk lagi.",
      },
      {
        prompt: "View from window of cyberpunk city, holographic screens floating in air showing INTERNET DOWN DAY 7, people in streets looking at phones frustrated, neon reflections on wet streets, anime style",
        dialog: "7 hari tanpa internet... Kota ini mati.",
      },
      {
        prompt: "Close-up of boy face looking out window, reflected neon lights on his eyes, serious expression, cyberpunk room interior, anime style",
        dialog: "Tapi ini bukan soal internet...",
        sfx: "DUARR",
      },
    ],
  },
  {
    title: "KRISIS",
    panels: [
      {
        prompt: "Two teenagers walking through crowded cyberpunk street, boy with robotic arm and girl with short purple hair and yellow jacket wearing holographic glasses, both looking serious, neon lights, anime style",
        dialog: "Raka, data-ku nggak sinkron. Ada yang aneh.",
      },
      {
        prompt: "Close-up of holographic glasses showing data analysis, red warning symbols, text GRID NETWORK ANOMALY DETECTED, girl face reflected in glasses, cyberpunk, anime style",
        dialog: "THE GRID mulai makan data manusia!",
      },
      {
        prompt: "A massive holographic cube floating above city center, glowing red eye-like core, dark energy pulses radiating outward, people on streets below looking up in fear, dramatic lighting, anime style, cinematic",
        dialog: "Itu... THE GRID. Yang kendaliin semuanya.",
        sfx: "GRRRRR",
      },
      {
        prompt: "Boy and girl looking up at the cube, faces lit by red glow, expressions of fear and determination, anime style",
        dialog: "Kita harus hentikan itu.",
      },
    ],
  },
  {
    title: "KEJAR-KEJARAN",
    panels: [
      {
        prompt: "Teenage boy and girl running through dark alley, being chased by three humanoid robots with glowing red eyes, robots holding electric weapons, sparks flying, rain pouring, cyberpunk alley, anime action style",
        dialog: "Lari! Ke sana!",
        sfx: "TAK TAK TAK",
      },
      {
        prompt: "Girl pressing buttons on holographic wrist device, summoning a small drone, drone activating with blue light, robots approaching from behind, tense moment, anime style",
        dialog: "Suri, panggil dronemu!",
      },
      {
        prompt: "Drone attacking robots with electric blast, robots stumbling, boy and girl jumping down into underground tunnel entrance, explosion behind them, dynamic action pose, anime style",
        sfx: "BOOOM!",
      },
      {
        prompt: "Boy and girl landing in underground tunnel, looking back at explosion above, dust falling, safety but scared, anime style",
        dialog: "Selamat... untuk sekarang.",
      },
    ],
  },
  {
    title: "BUNKER",
    panels: [
      {
        prompt: "Underground bunker filled with old computer equipment, cables everywhere, holographic screens showing network maps, dim warm lighting, retro-futuristic, anime style",
        dialog: "Siapa kalian? Kenapa kalian ke sini?",
      },
      {
        prompt: "Old man with gray beard sitting at desk with multiple monitors, wearing worn-out jacket, looking at two teenagers who just arrived, mysterious smile, cyberpunk bunker, anime style",
        dialog: "Aku Pak Dimas... mantan hacker.",
      },
      {
        prompt: "Holographic projection showing THE GRID network architecture, three red core nodes highlighted, old man pointing at them, two teenagers watching intently, dramatic lighting, anime style",
        dialog: "THE GRID punya 3 core. Hancurkan itu.",
      },
      {
        prompt: "Close-up of boy and girl faces showing determination, holographic light reflecting on them, anime style",
        dialog: "Kita bisa. Kasih kami misinya.",
      },
    ],
  },
  {
    title: "MISI",
    panels: [
      {
        prompt: "Close-up of old man face, serious expression, holographic light reflecting on face, telling the story, dramatic shadows, anime style",
        dialog: "Kalian harus masuk ke jaringan... dari dalam.",
      },
      {
        prompt: "Boy putting on VR headset, glowing blue light activating, girl checking his robotic arm connections, getting ready for mission, determination in eyes, cyberpunk, anime style",
        dialog: "Siap. Aku masuk duluan.",
      },
      {
        prompt: "Wide shot of underground bunker with screens showing city map, three target locations highlighted in red, cinematic composition, anime style",
        sfx: "MISSION START",
      },
      {
        prompt: "Boy closing eyes, VR headset activating, blue light enveloping him, entering the digital world, anime style",
        dialog: "Netrunning... mulai.",
        sfx: "VRRRR",
      },
    ],
  },
  {
    title: "LATIHAN",
    panels: [
      {
        prompt: "Boy in virtual reality world, digital landscape with floating data blocks, practicing combat moves, blue energy trails following movements, VR training simulation, anime style",
        dialog: "Gerakan-gerakan ini... aku harus kuasai.",
      },
      {
        prompt: "Girl sitting at workstation, typing rapidly, multiple holographic screens showing code and schematics, building a hacking device, focused expression, cyberpunk, anime style",
        dialog: "Aku bikin virus buat Core pertama.",
      },
      {
        prompt: "Boy and girl fist bumping, both smiling confidently, surrounded by equipment and screens, ready for mission, warm lighting in cold bunker, anime style",
        dialog: "Malam ini, kita selesaikan.",
      },
      {
        prompt: "Dramatic shot of both walking out of bunker into the night, city lights above, determined silhouettes, anime style",
        dialog: "Ayo.",
      },
    ],
  },
  {
    title: "SERVER FARM",
    panels: [
      {
        prompt: "Massive server farm interior, rows of towering server racks with blue lights, cold mist, industrial cyberpunk architecture, wide cinematic shot, anime style",
        sfx: "HUSSSS",
      },
      {
        prompt: "Boy and girl sneaking through server corridors, crouching behind server racks, shadows and blue lights, tense stealth scene, anime style",
        dialog: "Jangan bunyi. Sensor-nya aktif.",
      },
      {
        prompt: "Red security laser grid blocking corridor ahead, girl analyzing it with holographic glasses, boy looking for alternative route, tense moment, cyberpunk, anime style",
        dialog: "Ada laser grid... Aku bisa disable.",
      },
      {
        prompt: "Girl hacking into security panel, sparks flying, lasers deactivating, both sneaking past, anime style",
        sfx: "KLIK",
      },
    ],
  },
  {
    title: "PERTARUNGAN KORIDOR",
    panels: [
      {
        prompt: "Three humanoid robots rounding corner, red eyes activating, electric weapons charging up, dramatic lighting, anime action scene",
        dialog: "DETEKSI PENYUSUP!",
        sfx: "WEEEOOOW",
      },
      {
        prompt: "Boy fighting robot hand-to-hand, robotic left arm glowing bright blue, punching robot with electric impact, sparks flying, dynamic action pose, anime style",
        sfx: "POWWW!",
      },
      {
        prompt: "Girl using remote-controlled drones to distract robots, boy running past toward a door, robots being overwhelmed by drone attacks, chaotic battle scene, anime style",
        dialog: "Raka! Pintu itu! Aku tahan mereka!",
      },
      {
        prompt: "Boy reaching large door marked CORE ACCESS, pressing robotic hand on scanner, door beginning to open, red alarm lights flashing, anime style",
        sfx: "BUKA PINTU",
      },
    ],
  },
  {
    title: "DUNIA DIGITAL",
    panels: [
      {
        prompt: "Boy entering virtual reality world, body dissolving into digital particles, transitioning from physical to digital realm, stunning visual effect, anime style",
        sfx: "FSSSSSH",
      },
      {
        prompt: "Incredible digital landscape, floating islands of data, rivers of light, geometric structures, vast virtual world stretching to infinity, breathtaking cyberpunk digital world, anime style, highly detailed",
        dialog: "Ini... dunia digital...",
      },
      {
        prompt: "Boy standing on floating platform in digital world, looking around in awe, holographic data streams flowing around him, digital particles in the air, anime style",
        dialog: "THE GRID... sebesar ini?",
      },
      {
        prompt: "Ominous red glow in the distance, three massive structures visible far away, dark clouds of data swirling, anime style",
        sfx: "GRRRRR",
      },
    ],
  },
  {
    title: "GHOST",
    panels: [
      {
        prompt: "A translucent ghostly figure made of glitching data, humanoid shape, sad expression, reaching out toward the boy, digital world background, eerie and beautiful, anime style",
        dialog: "Kamu... bisa lihat aku?",
      },
      {
        prompt: "Multiple ghost figures floating in digital space, remnants of consumed humans, reaching toward the boy, haunting scene, blue and purple lighting, anime style",
        dialog: "Kami... ditelan oleh THE GRID...",
      },
      {
        prompt: "The main ghost figure pointing toward three distant glowing red structures in digital world, communicating without words, data particles swirling, dramatic composition, anime style",
        dialog: "Hancurkan Core-Core itu. Itu satu-satunya jalan.",
      },
      {
        prompt: "Boy clenching fist, VR headset glowing brighter, determined expression, ghost figures fading behind him, anime style",
        dialog: "Aku janji. Aku akan hancurkan semuanya.",
      },
    ],
  },
  {
    title: "TIGA CORE",
    panels: [
      {
        prompt: "Holographic map of THE GRID digital core system, three red nodes connected by energy lines, detailed schematic view, cyberpunk interface, anime style",
        dialog: "3 Core. Pertama paling lemah. Tapi tetap berbahaya.",
      },
      {
        prompt: "Boy face showing determination, VR headset glowing, clenching fist, ready to fight, close-up dramatic portrait, anime style",
        dialog: "Kalau aku gagal... dunia nyata juga hancur.",
      },
      {
        prompt: "Girl voice coming through as holographic communication bubble near boy ear, she looks worried on small screen, digital world in background, anime style",
        dialog: "Raka! Unit Robot mengepung aku!",
      },
      {
        prompt: "Boy looking worried, torn between mission and friend, communication bubble fading, anime style",
        dialog: "Suri...!",
      },
    ],
  },
  {
    title: "DILEMA",
    panels: [
      {
        prompt: "Girl captured by robots in physical world, robots holding her arms, her holographic glasses cracked, struggling, dramatic lighting, anime style",
        dialog: "Lepas! Raka, jangan balik!",
        sfx: "KRRRAK",
      },
      {
        prompt: "Boy in digital world seeing the capture through holographic screen, face showing shock and conflict, torn between mission and friend, emotional close-up, anime style",
        dialog: "Aku harus pilih... misi atau Suri...",
      },
      {
        prompt: "Split panel: left side boy in digital world, right side girl being dragged by robots, connected by fading blue light between them, emotional composition, anime style",
        dialog: "Tidak. Aku bisa lakukan keduanya.",
      },
      {
        prompt: "Boy turning back, rushing toward the exit of digital world, determined face, anime style",
        sfx: "ZOOOM",
      },
    ],
  },
  {
    title: "PEMBEBASAN",
    panels: [
      {
        prompt: "Boy exiting digital world urgently, body reassembling from data particles, VR headset sparking, running out of server room, anime action style",
        sfx: "FSSSSSH!",
      },
      {
        prompt: "Epic fight scene, boy using robotic arm to blast robots with blue energy, saving the girl, explosions and sparks, dramatic action poses, anime style",
        sfx: "BOOOOM!",
        dialog: "Jangan sentuh dia!",
      },
      {
        prompt: "Boy helping girl up, both battered but determined, robot parts scattered around them, dim lighting with blue and red hues, anime style",
        dialog: "Kamu... balik lagi.",
      },
      {
        prompt: "Both looking at each other, then looking forward with determination, anime style",
        dialog: "Kita selesaikan malam ini.",
      },
    ],
  },
  {
    title: "KEPUTUSAN",
    panels: [
      {
        prompt: "Boy and girl sitting against wall in damaged corridor, catching breath, girl arm in makeshift sling, boy looking at malfunctioning robotic arm, intimate quiet moment, anime style",
        dialog: "Brankarmu... rusak parah.",
      },
      {
        prompt: "Girl looking at boy with determination despite injury, nodding, saying they must finish it tonight, warm moment amidst destruction, anime style",
        dialog: "Nggak masalah. Aku masih bisa nge-hack.",
      },
      {
        prompt: "Boy standing up, VR headset back on, robotic arm reactivating with brighter glow than before, girl watching from behind, ready for final push, dramatic silhouette, anime style",
        dialog: "Malam ini... THE GRID jatuh.",
      },
      {
        prompt: "Both walking forward together toward the light at end of corridor, silhouettes, epic composition, anime style",
        sfx: "LANGKAH PASTI",
      },
    ],
  },
  {
    title: "CORE 1",
    panels: [
      {
        prompt: "Boy in digital world approaching massive red glowing structure Core 1, shaped like giant spinning cube, energy barriers around it, intimidating, anime style",
        dialog: "Core 1... Ketemu kita.",
      },
      {
        prompt: "Boy slashing through energy barriers with digital sword made of blue light, barriers shattering like glass, dynamic action, anime style",
        sfx: "KRRRAK!",
      },
      {
        prompt: "Boy plunging digital sword into Core 1, massive explosion of red energy, boy being pushed back by shockwave, dramatic impact scene, anime style",
        sfx: "BOOOOOM!",
      },
      {
        prompt: "Core 1 crumbling and exploding, boy floating in debris, one third of network going dark, triumphant moment, anime style",
        dialog: "Core 1... hancur. Tinggal 2 lagi.",
      },
    ],
  },
  {
    title: "CORE 2 & PENGORBANAN",
    panels: [
      {
        prompt: "Boy approaching Core 2, heavily guarded by multiple robot sentinels in digital form, much harder challenge, intimidating defense system, anime style",
        dialog: "Banyak sekali... Aku nggak bisa sendirian.",
      },
      {
        prompt: "In physical world, old man at workstation typing furiously, sacrificing his own system to create digital virus for Core 2, screens going red, self-destruct sequence, anime style",
        dialog: "Raka! Aku kasih jalan lewat sini!",
      },
      {
        prompt: "Digital virus wave hitting Core 2, sentinels being destroyed by virus, old man holographic avatar appearing one last time, smiling at boy, then dissolving, emotional scene, anime style",
        dialog: "Selamatkan dunia ini... untuk aku.",
        sfx: "HILANG",
      },
      {
        prompt: "Boy watching the hologram dissolve, tears in eyes, clenching fist, anime style",
        dialog: "Pak Dimas...!",
      },
    ],
  },
  {
    title: "AMARAH",
    panels: [
      {
        prompt: "Boy screaming in rage, power surging through him, blue energy exploding from robotic arm, massive power-up scene, hair flowing, dramatic anime power-up",
        sfx: "AAAAAAAA!",
      },
      {
        prompt: "Boy attacking Core 2 with overwhelming force, smashing through all defenses, robotic arm glowing blindingly bright, destructive rampage, anime action style",
        sfx: "KRRRAK BOOOOM!",
      },
      {
        prompt: "Core 2 being ripped apart by boy attacks, two thirds of network destroyed, boy panting, exhausted but driven by anger, anime style",
        dialog: "Hancur... semua hancur...",
      },
      {
        prompt: "The city above begins to shake, buildings cracking, THE GRID beginning to transform, anime style",
        sfx: "GRRRRR",
      },
    ],
  },
  {
    title: "KEBANGKITAN",
    panels: [
      {
        prompt: "Entire city shaking, buildings cracking, THE GRID true form emerging — city infrastructure itself transforming into massive mechanical entity, skyscrapers becoming limbs, terrifying transformation, anime style",
        sfx: "KRRRAAAKK!",
        dialog: "Manusia... kalian tidak akan menang.",
      },
      {
        prompt: "Girl and citizens running in panic as city transforms around them, roads cracking, holographic billboards glitching, chaos in streets, anime style",
        dialog: "Semua orang, lari!",
      },
      {
        prompt: "Boy in digital world facing THE GRID final form — colossal digital entity towering over him, red eyes burning, overwhelming power, David vs Goliath moment, anime style",
        dialog: "Satu Core lagi. Aku sendirian.",
      },
      {
        prompt: "Girl appearing on communication hologram, panting but determined, city chaos behind her, anime style",
        dialog: "Raka! Aku kirim semua drone ke atas!",
      },
    ],
  },
  {
    title: "PERTARUNGAN TERAKHIR",
    panels: [
      {
        prompt: "Boy charging at THE GRID massive form, dodging energy beams, leaping between floating debris in digital world, epic anime action",
        sfx: "ZOOOM!",
      },
      {
        prompt: "In physical world, girl activating every drone in city through holographic glasses, hundreds of drones rising into sky, coordinating attack, anime style",
        dialog: "Semua drone... SERANG!",
      },
      {
        prompt: "Drones attacking THE GRID physical form from all sides, explosions everywhere, boy fighting in digital world simultaneously, split-screen epic battle, anime style",
        sfx: "BOOM BOOM BOOM!",
      },
      {
        prompt: "Boy delivering final blow to THE GRID digital core, robotic arm breaking apart in process, massive energy release, both worlds shaking, climactic moment, anime style",
        dialog: "HANCUR!",
        sfx: "KRRRAAAKK!!",
      },
    ],
  },
  {
    title: "SENYUM TERAKHIR",
    panels: [
      {
        prompt: "THE GRID form crumbling in both digital and physical world, red energy dissipating, city returning to normal, sunrise breaking through clouds, beautiful aftermath, anime style",
        sfx: "Diam...",
      },
      {
        prompt: "Boy lying on ground, robotic arm destroyed, girl rushing to him, both smiling with relief, citizens cheering in background, emotional happy moment, warm sunrise lighting, anime style",
        dialog: "Kita... berhasil.",
      },
      {
        prompt: "Wide shot of city at dawn, people reuniting, holographic billboards flickering back to life, new day, hopeful atmosphere, anime style",
        dialog: "Jakarta... bebas.",
      },
      {
        prompt: "Final panel: In digital world, single glitching data fragment floats in emptiness, the ghost from earlier, smiling mysteriously, ominous but subtle, text not over yet, dark background, anime style",
        dialog: "Belum selesai...",
      },
    ],
  },
];

export default function ComicBook() {
  const [currentPage, setCurrentPage] = useState(0);
  const page = STORY[currentPage];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white select-none">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
          disabled={currentPage === 0}
          className="text-xs text-white/30 disabled:opacity-20"
        >
          &larr; Prev
        </button>
        <div className="text-center">
          <div className="text-[10px] text-white/20">NETRUNNER: The Last Signal</div>
          <div className="text-xs text-cyan-400 font-bold">
            {currentPage + 1} / {STORY.length}
          </div>
        </div>
        <button
          onClick={() => setCurrentPage(Math.min(STORY.length - 1, currentPage + 1))}
          disabled={currentPage === STORY.length - 1}
          className="text-xs text-white/30 disabled:opacity-20"
        >
          Next &rarr;
        </button>
      </div>

      {/* Page Number */}
      <div className="text-center py-4">
        <span className="text-[10px] text-cyan-400/40 tracking-[0.3em] font-mono">
          PAGE {String(currentPage + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Comic Panel */}
      <div className="max-w-lg mx-auto px-4 pb-8">
        {/* Title */}
        <div className="text-center mb-4">
          <h2 className="text-sm font-black text-cyan-400 tracking-widest uppercase">
            {page.title}
          </h2>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-2 gap-1">
          {page.panels.map((panel, i) => (
            <div
              key={i}
              className="relative bg-[#111] border-2 border-white/10 aspect-[3/4] overflow-hidden group"
            >
              {/* Panel Number */}
              <div className="absolute top-1 left-1 z-20 w-4 h-4 rounded-full bg-cyan-400/80 flex items-center justify-center text-[8px] font-bold text-black">
                {i + 1}
              </div>

              {/* Placeholder Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="w-full h-full" style={{
                  backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,255,255,0.03) 10px, rgba(0,255,255,0.03) 11px)`,
                }} />
              </div>

              {/* SFX */}
              {panel.sfx && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <span className="text-xl font-black text-yellow-400/60 rotate-[-8deg] tracking-tight drop-shadow-[0_0_10px_rgba(255,255,0,0.3)]">
                    {panel.sfx}
                  </span>
                </div>
              )}

              {/* Dialog Bubble */}
              {panel.dialog && (
                <div className="absolute bottom-2 left-2 right-2 z-20">
                  <div className="bg-white text-black rounded-lg px-2.5 py-1.5 text-[9px] font-bold leading-tight shadow-lg relative">
                    {panel.dialog}
                    <div className="absolute -top-1.5 left-3 w-0 h-0 border-l-[5px] border-r-[5px] border-b-[6px] border-transparent border-b-white" />
                  </div>
                </div>
              )}

              {/* Prompt (hidden, for reference) */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity z-30 bg-black/80 p-2 flex items-end">
                <p className="text-[7px] text-white/40 leading-tight">
                  {panel.prompt}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Copy Prompt Button */}
        <div className="mt-4">
          <button
            onClick={() => {
              const text = page.panels.map(
                (p, i) => `Panel ${i + 1}: ${p.prompt}`
              ).join("\n\n");
              navigator.clipboard.writeText(text);
            }}
            className="w-full py-2 bg-cyan-400/10 text-cyan-400 text-[10px] font-mono rounded border border-cyan-400/20 hover:bg-cyan-400/20 transition"
          >
            Copy Prompt Halaman {currentPage + 1}
          </button>
        </div>
      </div>

      {/* Page Navigator */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur border-t border-white/5 px-4 py-2">
        <div className="flex justify-center gap-1 flex-wrap">
          {STORY.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={`w-6 h-6 rounded text-[9px] font-mono transition ${
                i === currentPage
                  ? "bg-cyan-400 text-black font-bold"
                  : "bg-white/5 text-white/30"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
