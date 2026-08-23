export const site = {
  name: "Dyland Prizki Ramadhan",
  shortName: "Dyland",
  role: "Siswa TJKT",
  title: "SMK Tunas Harapan Jakarta Barat",
  dob: "19 September 2009",
  school: "SMK Tunas Harapan Jakarta Barat",
  headline: "Aku suka mencoba hal baru.",
  profileImage: "/images/profile.jpg",
  profileFallback: "/images/profile.svg",
  about: [
    "Siswa Teknik Jaringan Komputer dan Telekomunikasi (TJKT) di SMK Tunas Harapan Jakarta Barat. Aku menghabiskan waktu untuk belajar cara jaringan bekerja, konfigurasi perangkat jaringan, sampai merawat server.",
    "Di luar kelas, aku tipe orang yang penasaran. Suka mencoba teknologi baru, eksperimen kecil-kecilan, main game, atau sekadar latihan basket, selama ada hal baru buat dipelajari, aku pasti semangat.",
  ],
  email: "landdlanzz@gmail.com",
} as const;

/*
 * Ganti URL di bawah ini dengan akun asli lo:
 * TikTok  -> https://tiktok.com/@username
 * Instagram -> https://instagram.com/username
 */
export const socials = {
  instagram: {
    label: "Instagram",
    handle: "@dylnprz_",
    url: "https://instagram.com/dylnprz_",
  },
  tiktok: {
    label: "TikTok",
    handle: "@raveinoir",
    url: "https://tiktok.com/@raveinoir",
  },
  github: {
    label: "GitHub",
    handle: "@dyland",
    url: "https://github.com/",
  },
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
] as const;

export type EducationItem = {
  phase: string;
  school: string;
  note: string;
  current?: boolean;
};

export const education: readonly EducationItem[] = [
  {
    phase: "TK",
    school: "TK Al Azhar",
    note: "Titik awal, tempat rasa penasaran mulai tumbuh.",
  },
  {
    phase: "SD",
    school: "SD Al Azhar Kembangan",
    note: "Awal sekolah dasar, belajar baca, hitung, dan banyak hal baru.",
  },
  {
    phase: "SD",
    school: "SDN 1 Pagerjo",
    note: "Pindah di tengah SD. Sering pindah bikin aku cepat beradaptasi.",
  },
  {
    phase: "SMP",
    school: "SMPN 1 Ngadirojo",
    note: "Mulai serius kenal komputer, internet, dan dunia teknologi.",
  },
  {
    phase: "SMK",
    school: "SMK Tunas Harapan Jakarta Barat",
    note: "Sekarang: jurusan TJKT, belajar jaringan, server, dan telekomunikasi.",
    current: true,
  },
] as const;

export const tjkt = {
  short: "TJKT",
  full: "Teknik Jaringan Komputer dan Telekomunikasi",
  intro: [
    "TJKT adalah jurusan yang mempelajari cara jaringan komputer dan telekomunikasi bekerja, dari bagaimana data dikirim lewat kabel, sampai bagaimana sebuah server melayani ratusan perangkat sekaligus.",
    "Intinya satu: semua hal yang bikin internet dan komputer bisa saling bicara. Di sini kita belajar dua hal besar: infrastruktur (perangkat keras, kabel, perangkat jaringan) dan logika (config, alamat IP, protokol, troubleshooting).",
  ],
  focuses: [
    {
      icon: "Network",
      title: "Jaringan Komputer",
      desc: "Topologi, IP addressing, subnetting, dan cara data berpindah dari satu titik ke titik lain.",
    },
    {
      icon: "Router",
      title: "Cisco & Mikrotik",
      desc: "Konfigurasi router dan switch, routing, NAT, dan akses internet, lewat Packet Tracer sampai perangkat Mikrotik beneran.",
    },
    {
      icon: "Server",
      title: "Linux & Server",
      desc: "Instalasi & administrasi Linux, DHCP, DNS, file sharing, dan layanan jaringan lain.",
    },
    {
      icon: "Cpu",
      title: "Hardware & Komputer",
      desc: "Merakit PC, memahami komponen, spesifikasi, dan troubleshooting perangkat keras.",
    },
    {
      icon: "Share2",
      title: "IP Addressing & VLAN",
      desc: "Membagi jaringan jadi segment yang rapi, supaya aman dan efisien.",
    },
    {
      icon: "ShieldCheck",
      title: "Security & Troubleshooting",
      desc: "Dasar cybersecurity, firewall, dan diagnosa masalah jaringan sampai balik normal.",
    },
  ],
  careers: [
    "Teknisi Jaringan",
    "Network Administrator",
    "IT Support",
    "Server Administrator",
    "Network Security",
    "Web & Programming",
  ],
} as const;

export const interests = [
  {
    icon: "Sparkles",
    title: "Mencoba hal baru",
    desc: "Kalau belum pernah dicoba, aku penasaran duluan, baru mikir panjang.",
  },
  {
    icon: "Cpu",
    title: "Teknologi baru",
    desc: "Gadget, tool, atau software baru: aku senang belajar cara kerjanya.",
  },
  {
    icon: "Gamepad2",
    title: "Gaming",
    desc: "Main game bukan cuma hiburan, tapi juga latihan logika dan desain.",
  },
  {
    icon: "Trophy",
    title: "Basket",
    desc: "Olahraga favoritku, tentang latihan konsisten, kerja tim, dan mental.",
  },
  {
    icon: "FlaskConical",
    title: "Eksperimen",
    desc: "Suka ngoprek dan bereksperimen dengan ide-ide kecil, berani rusak dulu.",
  },
] as const;

export const skills = [
  {
    title: "Jaringan Komputer",
    description:
      "Topologi, IP addressing, subnetting, dan troubleshooting koneksi, dasar yang paling sering kupakai.",
    tag: "Networking",
  },
  {
    title: "Cisco & Mikrotik",
    description:
      "Konfigurasi router & switch, routing, NAT, dari Cisco Packet Tracer sampai perangkat Mikrotik.",
    tag: "Routing",
  },
  {
    title: "Linux & Server",
    description:
      "Instalasi dan administrasi Linux, plus layanan jaringan seperti DHCP, DNS, dan file sharing.",
    tag: "Server",
  },
  {
    title: "Web & Programming Dasar",
    description:
      "HTML, CSS, JavaScript, dan logika pemrograman, pondasi buat otomasi dan web service.",
    tag: "Code",
  },
  {
    title: "Hardware & Perangkat",
    description:
      "Merakit PC, memahami komponen, dan troubleshooting perangkat keras.",
    tag: "Hardware",
  },
  {
    title: "Keamanan Dasar",
    description:
      "Firewall, praktik password yang aman, dan kebiasaan aman di jaringan.",
    tag: "Security",
  },
] as const;

export const principles = [
  {
    title: "Coba dulu, baca belakangan",
    desc: "Aku lebih suka langsung praktik. Teori muncul belakangan, setelah tangan mulai paham.",
  },
  {
    title: "Rusak itu bagian dari belajar",
    desc: "Setiap troubleshooting yang bikin pusing adalah momen paling banyak aku belajar.",
  },
  {
    title: "Konsisten lebih penting dari pinter",
    desc: "Latihan rutin dan penasaran yang terjaga bikin hal teknis terasa makin natural.",
  },
];

export const projects = [
  {
    title: "Website Portofolio Ini",
    platform: "Next.js",
    status: "Selesai",
    image: "/uploads/1786999927743-1001505196.jpg",
    color: "#a3e635",
    summary:
      "Website yang lagi lo buka ini. Dibangun sambil belajar web development, dari layout, styling, sampai cara men-deploy-nya.",
    features: [
      {
        title: "Struktur & Konten",
        kicker: "Frontend",
        description:
          "Merancang halaman, memilah konten, dan membangun komponen dengan React & Tailwind.",
      },
      {
        title: "Interaksi Halus",
        kicker: "Motion",
        description:
          "Animasi scroll dan efek mouse yang halus, secukupnya biar terasa premium bukan ramai.",
      },
      {
        title: "Deploy & Perawatan",
        kicker: "Backend",
        description:
          "Belajar alur deploy, domain, dan cara merawat website yang sudah online.",
      },
    ],
  },
  {
    title: "Konfigurasi MikroTik Router",
    platform: "MikroTik RouterOS",
    status: "Praktikum",
    image: "https://picsum.photos/seed/mikrotik/800/500",
    color: "#0ea5e9",
    summary:
      "Konfigurasi router MikroTik untuk jaringan sekolah: DHCP server, NAT, firewall rule, dan manajemen bandwidth. Dari reset factory sampai jaringan jalan stabil.",
    features: [
      {
        title: "Basic Configuration",
        kicker: "RouterOS",
        description:
          "Reset, set IP address, username/password, dan akses via WinBox atau terminal SSH.",
      },
      {
        title: "DHCP & NAT",
        kicker: "Networking",
        description:
          "Setup DHCP server supaya client dapat IP otomatis, plus NAT masquerade buat akses internet.",
      },
      {
        title: "Firewall & Bandwidth",
        kicker: "Security",
        description:
          "Bikin firewall rule untuk blok traffic tertentu, dan atur bandwidth limit per client biar adil.",
      },
    ],
  },
  {
    title: "Lab Jaringan: VLAN & Inter-VLAN Routing",
    platform: "Cisco Packet Tracer",
    status: "Praktikum",
    image: "https://picsum.photos/seed/cisco-vlan/800/500",
    color: "#22c55e",
    summary:
      "Tugas praktik TJKT: membangun jaringan bertingkat dengan VLAN, trunking, dan routing antar-VLAN. Dari perencanaan skema IP sampai uji konektivitas antar divisi.",
    features: [
      {
        title: "Perencanaan Skema IP",
        kicker: "Subnetting",
        description:
          "Membagi satu jaringan menjadi beberapa subnet sesuai kebutuhan tiap divisi, lengkap dengan perhitungan subnet yang benar.",
      },
      {
        title: "Konfigurasi VLAN & Trunk",
        kicker: "Switching",
        description:
          "Memisahkan divisi ke VLAN berbeda dan mengatur trunk antar switch supaya broadcast domain tetap efisien.",
      },
      {
        title: "Routing Antar-VLAN",
        kicker: "Routing",
        description:
          "Menghubungkan antar-VLAN lewat router, uji ping antar divisi, dan pastikan jalur data berjalan sesuai aturan.",
      },
    ],
  },
  {
    title: "Server Linux & Layanan Jaringan",
    platform: "Linux",
    status: "Belajar",
    image: "https://picsum.photos/seed/linux-server/800/500",
    color: "#f59e0b",
    summary:
      "Bermain-main dengan Linux sebagai server, mulai dari instalasi, konfigurasi layanan DHCP & DNS, sampai file sharing di dalam jaringan lokal.",
    features: [
      {
        title: "Instalasi & Administrasi",
        kicker: "Linux",
        description:
          "Belajar instalasi distro, manajemen user, permission, dan perintah dasar administrasi lewat terminal.",
      },
      {
        title: "Layanan DHCP & DNS",
        kicker: "Layanan",
        description:
          "Mengonfigurasi server DHCP supaya perangkat di jaringan dapat IP otomatis, plus dasar-dasar DNS.",
      },
      {
        title: "File Sharing",
        kicker: "Jaringan",
        description:
          "Membagi file antar perangkat di jaringan lokal dan memahami hak aksesnya.",
      },
    ],
  },
] as const;

export const hero = {
  label: "TKJ / NETWORKING / WEB",
  name: ["DYLAND", "PRIZKI", "RAMADHAN"] as const,
  statement: ["BUILD", "CONNECT", "EXPLORE"] as const,
  intro:
    "Student exploring networking, web development, Linux, hardware and new technologies. Belajar sambil ngulik. Kalau belum pernah dicoba, pasti bikin penasaran.",
} as const;

export const chapterNav = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
] as const;

export const skillGroups = [
  {
    title: "Networking",
    tag: "Networking",
    desc: "Memahami cara data berpindah dan bagaimana perangkat saling bicara.",
    items: ["Cisco", "MikroTik", "TCP/IP", "VLAN", "Routing", "IP Addressing"],
  },
  {
    title: "Web Development",
    tag: "Web",
    desc: "Membangun antarmuka dan eksperimen web kecil-kecilan.",
    items: ["HTML", "CSS", "JavaScript", "React", "Next.js"],
  },
  {
    title: "Linux",
    tag: "Linux",
    desc: "Betah di terminal: instal, konfigurasi, dan troubleshooting.",
    items: ["Linux", "Debian", "Termux", "CLI", "Git"],
  },
  {
    title: "Hardware / IoT",
    tag: "IoT",
    desc: "Menghubungkan dunia nyata ke digital lewat mikrokontroler.",
    items: ["ESP32", "RFID", "Sensors", "IoT"],
  },
] as const;

export const projectsList = [
  {
    slug: "mikrotik-router",
    num: "01",
    title: "MikroTik Router Config",
    year: "2026",
    tagline: "RouterOS configuration for school network",
    tech: ["MikroTik", "RouterOS", "DHCP", "NAT", "Firewall"],
    status: "Praktikum",
    summary:
      "Konfigurasi router MikroTik untuk jaringan sekolah: DHCP server, NAT masquerade, firewall rule, dan manajemen bandwidth. Dari reset factory sampai jaringan jalan stabil.",
    role: "Konfigurasi & troubleshooting (praktikum TJKT)",
    kind: "topology" as const,
  },
  {
    slug: "network-lab",
    num: "02",
    title: "Network Lab",
    year: "2025",
    tagline: "Cisco VLAN / Routing / Networking experiments",
    tech: ["Cisco Packet Tracer", "VLAN", "Inter-VLAN Routing", "Subnetting"],
    status: "Praktikum",
    summary:
      "Lab jaringan eksperimen: membangun jaringan bertingkat dengan VLAN, trunking, dan routing antar-VLAN. Dari perencanaan skema IP sampai uji konektivitas antar divisi.",
    role: "Perencanaan & konfigurasi jaringan (praktikum TJKT)",
    kind: "topology" as const,
  },
  {
    slug: "web-portfolio",
    num: "03",
    title: "Web Portfolio",
    year: "2026",
    tagline: "Personal portfolio built with modern web technologies",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP"],
    status: "Live",
    summary:
      "Website ini, dibangun sambil belajar web development. Layout, motion, deploy, sampai perawatan; semua jadi bahan belajar nyata.",
    role: "Satu-satunya yang ngerjain: desain, kode, dan deploy",
    kind: "browser" as const,
  },
  {
    slug: "rfid-attendance",
    num: "04",
    title: "RFID Attendance System",
    year: "2026",
    tagline: "ESP32 + RC522 + Wi-Fi + Web Dashboard",
    tech: ["ESP32", "RC522", "Arduino C++", "Wi-Fi", "Web Dashboard"],
    status: "Prototype",
    summary:
      "Prototipe absensi RFID. Kartu menempel di reader, ESP32 membaca UID, lalu data dikirim ke dashboard lewat Wi-Fi. Masih tahap awal dan belum dipakai nyata, tapi semua jalur utamanya sudah jalan.",
    role: "Hardware & firmware (eksperimen pribadi)",
    kind: "rfid" as const,
    prototype: true,
  },
  {
    slug: "puma-velocity",
    num: "05",
    title: "PUMA Ultra Velocity",
    year: "2025",
    tagline: "Experimental product campaign website",
    tech: ["Next.js", "Tailwind CSS", "Motion"],
    status: "Experiment",
    summary:
      "Eksperimen website campaign produk fiktif, latihan bikin landing page dengan gaya visual berani, storytelling, dan interaksi yang kuat.",
    role: "Desain & pengembangan eksperimental",
    kind: "campaign" as const,
  },
] as const;

export const timeline = [
  {
    year: "2024",
    label: "Foundations",
    title: "Exploring computer & technology basics",
    desc: "Mulai serius kenal komputer, internet, dan cara kerja teknologi. Semua dimulai dari rasa penasaran biasa.",
  },
  {
    year: "2025",
    label: "Networking",
    title: "Cisco · MikroTik · Linux",
    desc: "Masuk dunia TJKT. Konfigurasi perangkat jaringan, routing, VLAN, dan mulai betah di terminal Linux.",
  },
  {
    year: "2026",
    label: "Build",
    title: "Web development · Next.js · React · IoT · ESP32",
    desc: "Merambah web development dan Internet of Things, dari tampilan sampai firmware mikrokontroler.",
  },
  {
    year: "NEXT",
    label: "Continue",
    title: "Keep learning. Build bigger.",
    desc: "Lanjut belajar, membangun sistem yang lebih besar, dan mendalami full-stack development.",
    future: true,
  },
] as const;

export const tkjTerms = [
  {
    term: "IP Address",
    desc: "Alamat rumah tiap perangkat di jaringan. Tanpanya data bingung mau ke mana.",
  },
  {
    term: "Router",
    desc: "Pengatur lalu lintas antar jaringan. Tahu jalur terbaik buat data.",
  },
  {
    term: "Switch",
    desc: "Penghubung perangkat di satu jaringan yang menyampaikan data ke port yang tepat.",
  },
  {
    term: "VLAN",
    desc: "Membelah satu jaringan jadi beberapa segmen biar rapi, aman, dan efisien.",
  },
  {
    term: "Server",
    desc: "Komputer yang melayani permintaan, dari web sampai database.",
  },
  {
    term: "Wi-Fi",
    desc: "Kabel tak terlihat, data dikirim lewat gelombang radio.",
  },
  {
    term: "Security",
    desc: "Menjaga jaringan tetap aman: firewall, hak akses, dan kebiasaan baik.",
  },
] as const;

export const tkjChain = ["DEVICE", "NETWORK", "SERVER", "INTERNET"] as const;

export const interestsBig = [
  { word: "Technology", note: "baca, ngoprek, coba" },
  { word: "Gaming", note: "logika + desain + hiburan" },
  { word: "Basketball", note: "konsisten, tim, mental" },
  { word: "Trading", note: "belajar baca pasar & keputusan" },
  { word: "Exploring New Things", note: "kalau baru, penasaran dulu" },
  { word: "Building Projects", note: "dari ide kecil jadi nyata" },
] as const;

export const personalInfo = {
  name: site.name,
  birthday: site.dob,
  school: site.school,
  timeline: ["SDN 1 Pagerjo", "SMPN 1 Ngadirojo", "SMK Tunas Harapan"] as const,
};
