export type Swatch = { name: string; hex: string; role: string }

export type Concept = {
  id: string
  numeral: string
  title: string
  tagline: string
  image: string
  alt: string
  fonts: { display: string; body: string; displayVar: string; bodyVar: string }
  palette: Swatch[]
  structure: string[]
  interactions: string[]
  whyJudges: string
}

export const concepts: Concept[] = [
  {
    id: "notary",
    numeral: "I",
    title: "Notary's Desk",
    tagline: "Your spec's Ink & Brass, pushed further: an editorial notary's office for your data.",
    image: "/concepts/01-notary-desk.png",
    alt: "Dark warm chat interface with serif headline, teal citations, brass wax seal and a reasoning trace panel of source index cards",
    fonts: { display: "Fraunces", body: "JetBrains Mono", displayVar: "var(--font-fraunces)", bodyVar: "var(--font-jetbrains)" },
    palette: [
      { name: "Ink", hex: "#15130F", role: "Background" },
      { name: "Parchment", hex: "#EDE7DA", role: "Text" },
      { name: "Brass", hex: "#D98E3F", role: "AI / awaiting signature" },
      { name: "Verified Teal", hex: "#2F6E62", role: "Cryptographically proven" },
      { name: "Rust", hex: "#B4472D", role: "Irreversible actions" },
    ],
    structure: [
      "Pinned trust bar on every page: local-only, chain status, pending count",
      "Roman-numeral side nav (I Chat, II Vault, III Approvals, IV Ledger), like chapters in a register",
      "Three columns: nav, serif answer, reasoning trace shown as stacked index cards",
    ],
    interactions: [
      "Citations [1] highlight the matching index card on hover",
      "Similarity-score bars fill in one after another once the answer finishes streaming",
      "Wax-seal press animation when you approve an action",
    ],
    whyJudges: "The safest bet. It feels premium and trustworthy, and every color has a meaning, so it scores well on product experience.",
  },
  {
    id: "blueprint",
    numeral: "II",
    title: "Vault Blueprint",
    tagline: "Your second brain drawn as an engineering schematic on an infinite canvas.",
    image: "/concepts/02-vault-blueprint.png",
    alt: "Navy blueprint grid canvas with document nodes connected to a central query node and a floating command palette",
    fonts: { display: "Space Grotesk", body: "IBM Plex Mono", displayVar: "var(--font-space-grotesk)", bodyVar: "var(--font-plex-mono)" },
    palette: [
      { name: "Blueprint", hex: "#0B1B33", role: "Background + grid" },
      { name: "Chalk", hex: "#E8EEF5", role: "Text / linework" },
      { name: "Safety Orange", hex: "#FF6B2C", role: "AI activity / queries" },
      { name: "Signal Lime", hex: "#C6F432", role: "Verified states" },
      { name: "Graphite", hex: "#1E2E4A", role: "Panels" },
    ],
    structure: [
      "No page-based layout. The whole app is one pan-and-zoom canvas",
      "Each document is a node; a query draws live dotted lines to the chunks it retrieved",
      "Floating Cmd+K command bar to ask questions; an inspector panel shows the hybrid score math",
    ],
    interactions: [
      "Retrieval shown live: nodes pulse orange with brightness scaled to similarity",
      "Dimension-line callouts show 0.7 x vec + 0.3 x kw for each hit",
      "Forgetting a node erases its lines and leaves only a dotted outline",
    ],
    whyJudges: "The most technically impressive-looking option. It makes hybrid RAG visible, which helps on technical execution and innovation.",
  },
  {
    id: "herbarium",
    numeral: "III",
    title: "Herbarium Archive",
    tagline: "A calm, light-mode archive where each memory is a catalogued specimen.",
    image: "/concepts/03-herbarium.png",
    alt: "Bone paper background with a large serif title and a masonry grid of archive cards with catalogue numbers and tape corners",
    fonts: { display: "Newsreader", body: "Space Mono", displayVar: "var(--font-newsreader)", bodyVar: "var(--font-space-mono)" },
    palette: [
      { name: "Bone", hex: "#F1ECE2", role: "Background" },
      { name: "Ink", hex: "#1C1B19", role: "Text" },
      { name: "Moss", hex: "#3E5B3A", role: "Verified / citations" },
      { name: "Oxblood", hex: "#7A1F1F", role: "Forget / reject" },
      { name: "Sage", hex: "#DCE3D2", role: "Surfaces" },
    ],
    structure: [
      "Split-screen layout: a large sticky serif title on the left, a scrolling masonry archive on the right",
      "Each source is a specimen card with a catalogue number, chunk count and a 768-d stamp",
      "Memory consolidation shown as specimens being filed into drawers",
    ],
    interactions: [
      "Cards tilt slightly on hover, like paper, with parallax tape corners",
      "Scroll-linked reveal: the catalogue count ticks up as you scroll",
      "Forget stamps the card VOID in oxblood, then it folds away",
    ],
    whyJudges: "The only light, calm option. It will stand out among the many dark neon demos and makes privacy feel human.",
  },
  {
    id: "receipt",
    numeral: "IV",
    title: "Thermal Receipt",
    tagline: "Loud brutalism: every AI step prints out as a signed receipt.",
    image: "/concepts/04-receipt-brutalist.png",
    alt: "Off-white brutalist page with a huge condensed headline and an audit log shaped like a long receipt with hash rows",
    fonts: { display: "Anton", body: "Space Mono", displayVar: "var(--font-anton)", bodyVar: "var(--font-space-mono)" },
    palette: [
      { name: "Thermal", hex: "#F4F2EC", role: "Background" },
      { name: "Carbon", hex: "#0A0A0A", role: "Text + borders" },
      { name: "Signal Red", hex: "#FF3B1F", role: "AI + destructive" },
      { name: "Electric Blue", hex: "#2B4BFF", role: "Verified" },
      { name: "Grey Tape", hex: "#D8D4CA", role: "Dividers" },
    ],
    structure: [
      "Thick 1px-grid brutalist layout with huge condensed headings",
      "The audit log is one continuous receipt tape with zig-zag perforated edges",
      "A marquee ticker runs across the top: NO CLOUD, NO KEYS, NO EGRESS",
    ],
    interactions: [
      "New events print onto the receipt with a typewriter effect",
      "Verify chain runs a scanner line down the tape, and each row turns blue as it passes",
      "Tampered rows tear the receipt at exactly the broken_at_id row",
    ],
    whyJudges: "The most memorable option. The receipt metaphor makes the hash chain easy to understand in a 3-minute demo.",
  },
]

export const signatureInteractions = [
  {
    title: "Wax-seal signing",
    image: "/concepts/i1-wax-seal.png",
    alt: "Pending email action card receiving a brass wax seal stamp reading SIGNED",
    how: "Press and hold 'Sign & send' for 800ms. A ring fills, then the seal drops onto the card with a spring animation and a small screen shake. Holding instead of clicking makes approving feel deliberate.",
  },
  {
    title: "Provable burn",
    image: "/concepts/i2-burn-forget.png",
    alt: "Document card dissolving into ember particles with a teal confirmation toast",
    how: "The card breaks up into canvas particles, then /verify_forgotten runs automatically and shows '0 results, proven gone' in teal. The deletion is both shown and proven.",
  },
  {
    title: "Live chain waveform",
    image: "/concepts/i3-chain-waveform.png",
    alt: "Color-coded audit event waveform with hash chain nodes and a verification scan line",
    how: "Each audit event is a bar. Actions anywhere in the app add a new bar in real time. Verify chain runs a scan line across the bars and links each one as it passes.",
  },
]
