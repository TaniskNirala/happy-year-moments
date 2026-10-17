import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import panda from "@/assets/panda.png";
import mixer from "@/assets/mixer.png";
import m1 from "@/assets/mem1.jpg.asset.json";
import m2 from "@/assets/mem2.jpg.asset.json";
import m3 from "@/assets/mem3.jpg.asset.json";
import m4 from "@/assets/mem4.jpg.asset.json";
import m5 from "@/assets/mem5.jpg.asset.json";
import m6 from "@/assets/mem6.jpg.asset.json";
import m7 from "@/assets/mem7.jpg.asset.json";
import m8 from "@/assets/mem8.jpg.asset.json";
import m9 from "@/assets/mem9.jpg.asset.json";
import m10 from "@/assets/mem10.jpg.asset.json";
import m11 from "@/assets/mem11.jpg.asset.json";
import m12 from "@/assets/mem12.jpg.asset.json";
import m13 from "@/assets/mem13.jpg.asset.json";
import { Button } from "@/components/ui/button";
import clipRasamalai from "@/assets/clip-rasamalai.png";
import clipBooks from "@/assets/clip-books.png";
import clipRuler from "@/assets/clip-ruler.png";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy 1 Year of Tanging You, Topper!" },
      { name: "description", content: "One year of friendship, pandas, ice creams and war against the mixer." },
      { property: "og:title", content: "Happy 1 Year of Tanging You, Topper!" },
      { property: "og:description", content: "One year of friendship, pandas, ice creams and war against the mixer." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Chewy&family=Nunito:wght@400;700;800&display=swap" },
    ],
  }),
  component: Index,
});

// Background scattered "photos" — replace emojis with real photos anytime
const scattered: { e?: string; w?: string; img?: string; t: string; l: string; r: string }[] = [
  { e: "🐼", t: "8%", l: "6%", r: "-8deg" }, { e: "🍦", t: "15%", l: "82%", r: "10deg" },
  { e: "😴", t: "42%", l: "3%", r: "6deg" }, { e: "🥞", t: "60%", l: "88%", r: "-6deg" },
  { e: "☁️", t: "78%", l: "10%", r: "-4deg" }, { e: "🍨", t: "88%", l: "70%", r: "8deg" },
  { e: "🐼", t: "30%", l: "92%", r: "-12deg" }, { e: "🎓", t: "70%", l: "45%", r: "5deg" },
  { e: "🌻", t: "5%", l: "40%", r: "12deg" }, { e: "🌻", t: "50%", l: "75%", r: "-10deg" },
  { e: "🌻", t: "92%", l: "25%", r: "7deg" }, { e: "🌻", t: "35%", l: "18%", r: "-6deg" },
  { e: "🌻", t: "65%", l: "60%", r: "9deg" }, { e: "🌻", t: "20%", l: "65%", r: "-14deg" },
  { img: clipRasamalai, t: "10%", l: "22%", r: "-10deg" }, { img: clipRasamalai, t: "52%", l: "88%", r: "8deg" },
  { img: clipRasamalai, t: "95%", l: "12%", r: "6deg" },
  { img: clipBooks, t: "38%", l: "70%", r: "8deg" }, { img: clipBooks, t: "88%", l: "55%", r: "-6deg" },
  { img: clipBooks, t: "5%", l: "92%", r: "12deg" },
  { img: clipRuler, t: "58%", l: "20%", r: "-14deg" }, { img: clipRuler, t: "25%", l: "48%", r: "12deg" },
  { img: clipRuler, t: "75%", l: "32%", r: "-8deg" },
];


// Dates come from the uploaded filenames; undated photos stay separate.
// big: show this photo larger (about 2/3 of the row) at the top of its day-group.
// crop: show only part of a photo, as fractions of the full image (x, y = top-left corner; w, h = size).
//       For phone screenshots the photo area is auto-detected; these numbers are only the fallback.
// rotate: use when a photo was saved sideways. 90 = clockwise, -90 = counter-clockwise, 180 = upside down.
type Memory = { title: string; text: string; photos: { src: string; alt: string; big?: boolean; rotate?: 90 | -90 | 180; crop?: { x: number; y: number; w: number; h: number } }[] };
const memories: Memory[] = [
  { title: "5 September 2026", text: "Ek din, itni saari memories… madam ji aur unke alag-alag moods 🖤", photos: [
    { src: m7.url, alt: "Together at the mall", big: true },
    { src: m6.url, alt: "With friends in the car" },
    { src: m8.url, alt: "At the food court" },
    { src: m9.url, alt: "Arcade fun" },
    { src: m10.url, alt: "With the Spider-Man plush" },
    { src: m11.url, alt: "Holding a sunflower" },
  ] },
  { title: "16 September 2026", text: "Topper ji aur company 🎓", photos: [{ src: m12.url, alt: "Friends together at a desk" }] },
  { title: "29 August 2026", text: "Double cuteness, ek hi photo mein 💛", photos: [{ src: m13.url, alt: "With her little sister", crop: { x: 0.04, y: 0.377, w: 0.9, h: 0.222 } }] },
  { title: "12 July 2026", text: "School wali memories 🖤", photos: [{ src: m4.url, alt: "Group photo in school uniforms", rotate: -90 }] },
  { title: "8 December 2025", text: "Ice cream is a food group for her. Dinner is optional. Ice cream isn't.", photos: [{ src: m2.url, alt: "Holding a chocolate ice cream" }] },
  { title: "28 January 2026", text: "Bachpan se hi favourite headache 😜", photos: [{ src: m3.url, alt: "Childhood photo on a phone screen" }] },
  { title: "31 July 2026", text: "Chhoti si photo, badi si cuteness 🐼", photos: [{ src: m5.url, alt: "Baby photo" }] },
  { title: "Hum dono", text: "Madam ji ke saamne toh haath jodne hi padenge 😌", photos: [{ src: m1.url, alt: "Together with hands folded in namaste" }] },
];


// Picks how many outer columns of memory groups fit the screen (1 / 2 / 3).
function useColumns() {
  const [n, setN] = useState(2);
  useEffect(() => {
    const calc = () => setN(window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1);
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);
  return n;
}

type Crop = { x: number; y: number; w: number; h: number };

// Finds the bright photo area inside a phone screenshot (skips black bars, Reply bar, nav buttons).
// Returns fractions of the full image, or null if it can't tell.
function findPhotoBox(img: HTMLImageElement): Crop | null {
  const W = 120;
  const H = Math.max(1, Math.round((W * img.naturalHeight) / img.naturalWidth));
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;
  ctx.drawImage(img, 0, 0, W, H);
  const d = ctx.getImageData(0, 0, W, H).data; // throws if the image is cross-origin
  const lum = (x: number, y: number) => { const i = (y * W + x) * 4; return 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2]; };
  const xa = Math.round(W * 0.08), xb = Math.round(W * 0.92);
  // longest run of bright rows (tolerating tiny gaps) = the photo band
  let best: [number, number] | null = null, start = -1, last = -1;
  const close = () => { if (start >= 0 && (!best || last - start > best[1] - best[0])) best = [start, last]; start = -1; };
  for (let y = 0; y < H; y++) {
    let sum = 0;
    for (let x = xa; x < xb; x++) sum += lum(x, y);
    if (sum / (xb - xa) > 60) { if (start < 0) start = y; last = y; }
    else if (start >= 0 && y - last > 3) close();
  }
  close();
  if (!best) return null;
  const [y0, y1] = best as [number, number];
  if (y1 - y0 < H * 0.08) return null;
  // left / right edges of the photo inside that band
  let x0 = -1, x1 = -1;
  for (let x = 0; x < W; x++) {
    let sum = 0;
    for (let y = y0; y <= y1; y++) sum += lum(x, y);
    if (sum / (y1 - y0 + 1) > 40) { if (x0 < 0) x0 = x; x1 = x; }
  }
  if (x0 < 0 || x1 - x0 < W * 0.3) return null;
  // step 1 sample inside each edge so blurry borders never show
  return { x: (x0 + 1) / W, y: (y0 + 1) / H, w: (x1 - x0 - 1) / W, h: (y1 - y0 - 1) / H };
}

// Shows only the photo part of a screenshot. Detects it automatically; `crop` is the fallback guess.
function CroppedImage({ src, alt, crop }: { src: string; alt: string; crop: Crop }) {
  const [ratio, setRatio] = useState(0.45); // stored width / height
  const [box, setBox] = useState<Crop>(crop);
  const [ready, setReady] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  const measure = (img: HTMLImageElement) => {
    if (!img.naturalWidth) return;
    setRatio(img.naturalWidth / img.naturalHeight);
    try { const found = findPhotoBox(img); if (found) setBox(found); } catch { /* keep the fallback crop */ }
    setReady(true);
  };
  useEffect(() => { if (ref.current?.complete) measure(ref.current); }, []);
  return (
    <div className={`relative w-full overflow-hidden rounded-lg transition-opacity duration-300 ${ready ? "opacity-100" : "opacity-0"}`}
      style={{ aspectRatio: `${(box.w / box.h) * ratio}` }}>
      <img ref={ref} src={src} alt={alt} onLoad={(e) => measure(e.currentTarget)}
        className="absolute block max-w-none"
        style={{ width: `${100 / box.w}%`, height: "auto", left: `${(-box.x / box.w) * 100}%`, top: `${(-box.y / box.h) * 100}%` }} />
    </div>
  );
}

// Shows a sideways-saved photo upright, still at its full uncropped size.
function RotatedImage({ src, alt, deg }: { src: string; alt: string; deg: number }) {
  const [ratio, setRatio] = useState(0.75); // stored width / height
  const ref = useRef<HTMLImageElement>(null);
  const measure = (img: HTMLImageElement) => img.naturalWidth && setRatio(img.naturalWidth / img.naturalHeight);
  useEffect(() => { if (ref.current?.complete) measure(ref.current); }, []);
  const quarter = deg === 90 || deg === -90;
  if (!quarter) return <img src={src} alt={alt} loading="lazy" className="block h-auto w-full rounded-lg" style={{ transform: `rotate(${deg}deg)` }} />;
  return (
    <div className="relative w-full overflow-hidden rounded-lg" style={{ aspectRatio: `${1 / ratio}` }}>
      <img ref={ref} src={src} alt={alt} onLoad={(e) => measure(e.currentTarget)}
        className="absolute left-1/2 top-1/2 block max-w-none"
        style={{ width: `${ratio * 100}%`, height: "auto", transform: `translate(-50%, -50%) rotate(${deg}deg)` }} />
    </div>
  );
}

// One photo shown in full (never cropped). Tapping it slides its caption open underneath.
function MemoryTile({ photo, memory, open, dimmed, onToggle }: {
  photo: Memory["photos"][number]; memory: Memory; open: boolean; dimmed: boolean; onToggle: () => void;
}) {
  return (
    <div className={`overflow-hidden rounded-xl bg-foreground p-1.5 text-primary-foreground shadow-lg transition-all duration-500 ease-out motion-reduce:transition-none ${dimmed ? "scale-[0.97] opacity-70" : ""}`}>
      <button type="button" aria-expanded={open} aria-label={`Show memory: ${memory.title}`} onClick={onToggle} className="block w-full">
        {photo.crop ? <CroppedImage src={photo.src} alt={photo.alt} crop={photo.crop} /> : photo.rotate ? <RotatedImage src={photo.src} alt={photo.alt} deg={photo.rotate} /> : <img src={photo.src} alt={photo.alt} loading="lazy" className="block h-auto w-full rounded-lg" />}
      </button>
      <div aria-hidden={!open} className={`grid transition-all duration-500 ease-out motion-reduce:transition-none ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="min-h-0 overflow-hidden">
          <div className="px-2 pb-2 pt-3 text-left">
            <h3 className="font-display text-xl">{memory.title}</h3>
            <p className="mt-1 text-sm">{memory.text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// All photos from one day: packed tightly together (small gap) in 1 or 2 lanes.
function MemoryGroup({ memory, laneCount, ratioOf, openSrc, onToggle }: { memory: Memory; laneCount: number; ratioOf: (src: string) => number; openSrc: string | null; onToggle: (src: string) => void }) {
  const tile = (photo: Memory["photos"][number]) => (
    <MemoryTile key={photo.src} photo={photo} memory={memory} open={openSrc === photo.src}
      dimmed={openSrc !== null && openSrc !== photo.src} onToggle={() => onToggle(photo.src)} />
  );
  // A `big` photo (on wide screens) takes ~2/3 of the top row, with the next photo beside it.
  const feature = laneCount > 1 ? memory.photos.find((ph) => ph.big) : undefined;
  const others = memory.photos.filter((ph) => ph !== feature);
  const side = feature ? others[0] : undefined;
  const rest = feature ? others.slice(1) : others;
  // Put each photo into the currently shortest lane so the block ends up even (no empty holes).
  const lanes: Memory["photos"][] = Array.from({ length: laneCount }, () => []);
  const laneH: number[] = Array(laneCount).fill(0);
  rest.forEach((ph) => { const c = laneH.indexOf(Math.min(...laneH)); lanes[c].push(ph); laneH[c] += ratioOf(ph.src); });
  return (
    <div className="flex flex-col gap-1.5">
      {feature && (
        <div className="flex items-start gap-1.5">
          <div className="min-w-0 flex-[2]">{tile(feature)}</div>
          {side && <div className="min-w-0 flex-1">{tile(side)}</div>}
        </div>
      )}
      {rest.length > 0 && (
        <div className="flex items-start gap-1.5">
          {lanes.map((lane, c) => (
            <div key={c} className="flex min-w-0 flex-1 flex-col gap-1.5">{lane.map(tile)}</div>
          ))}
        </div>
      )}
    </div>
  );
}

const questions = [
  "How much did you enjoy being tanged this year?",
  "Rate my jokes (be honest... or kind)",
  "How good a friend am I compared to a dosa?",
];

function Stars({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div className="flex gap-1 text-3xl">
      {[1, 2, 3, 4, 5].map((n) => (
        <button key={n} onClick={() => onChange(n)} className="transition-transform hover:scale-125" aria-label={`${n} stars`}>
          {n <= value ? "🍦" : "🤍"}
        </button>
      ))}
    </div>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-20 text-center">{children}</section>;
}

function Index() {
  const [started, setStarted] = useState(false);
  const [ratings, setRatings] = useState([0, 0, 0]);
  const [submitted, setSubmitted] = useState(false);
  const [tries, setTries] = useState(0);
  const [note, setNote] = useState("");
  const [mixerClicks, setMixerClicks] = useState(0);
  const [openSrc, setOpenSrc] = useState<string | null>(null);
  const cols = useColumns();
  // Real height/width of every photo, measured once so columns can be balanced by actual height.
  const [ratios, setRatios] = useState<Record<string, number>>({});
  useEffect(() => {
    let alive = true;
    memories.forEach((m) => m.photos.forEach((ph) => {
      const img = new Image();
      img.onload = () => {
        if (!alive || !img.naturalWidth) return;
        let r = img.naturalHeight / img.naturalWidth;
        if (ph.rotate === 90 || ph.rotate === -90) r = 1 / r;
        else if (ph.crop) r = (ph.crop.h / ph.crop.w) * r;
        setRatios((o) => ({ ...o, [ph.src]: r }));
      };
      img.src = ph.src;
    }));
    return () => { alive = false; };
  }, []);
  const ratioOf = (src: string) => ratios[src] ?? 1.25;
  // Multi-photo days get their own full-width block (bigger photos); single photos flow in balanced columns.
  const BIG_LANES = cols === 1 ? 1 : 3; // photos per row inside a big day-group (phones: 1 = full width, set to 2 for smaller)
  const spread = (list: Memory[]) => {
    const out: Memory[][] = Array.from({ length: cols }, () => []);
    const heights: number[] = Array(cols).fill(0);
    list.forEach((m) => { const c = heights.indexOf(Math.min(...heights)); out[c].push(m); heights[c] += m.photos.reduce((t, ph) => t + ratioOf(ph.src), 0) + 0.1; });
    return out;
  };
  const segments: ({ big: Memory } | { cols: Memory[][] })[] = [];
  let batch: Memory[] = [];
  const flush = () => { if (batch.length) segments.push({ cols: spread(batch) }); batch = []; };
  memories.forEach((m) => { if (m.photos.length > 1) { flush(); segments.push({ big: m }); } else batch.push(m); });
  flush();
  const toggle = (src: string) => setOpenSrc((o) => (o === src ? null : src));

  const start = () => {
    setStarted(true);
    setTimeout(() => document.getElementById("msg")?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  return (
    <main className="relative overflow-hidden">
      {/* scattered background polaroids */}
      <div className="pointer-events-none fixed inset-0 z-0">
        {scattered.map((s, i) => (
          <div key={i} className={s.w ? "floaty absolute font-display opacity-20" : s.img ? "floaty absolute" : "floaty absolute rounded-md bg-foreground p-2 pb-6 opacity-20 shadow-xl"}
            style={{ top: s.t, left: s.l, ["--r" as string]: s.r, animationDelay: `${i * 0.7}s`, fontSize: s.w ? "2.2rem" : undefined, color: s.w ? "var(--primary)" : undefined }}>
            {s.w ? s.w : s.img ? <img src={s.img} alt="" loading="lazy" width={816} height={816} className="w-24 opacity-25" /> : <div className="flex h-20 w-20 items-center justify-center bg-muted text-5xl">{s.e}</div>}
          </div>
        ))}
        <div className="drift absolute top-[12%] text-7xl opacity-30">☁️</div>
        <div className="drift absolute top-[55%] text-6xl opacity-20" style={{ animationDelay: "-25s" }}>☁️</div>
        <div className="drift absolute top-[30%] text-6xl opacity-25" style={{ animationDelay: "-12s" }}>🌻</div>
        <div className="drift absolute top-[80%] text-5xl opacity-20" style={{ animationDelay: "-38s" }}>🌻</div>

      </div>

      <Section>
        <img src={panda} alt="Panda eating ice cream" width={816} height={816} className="w-56 md:w-72" />
        <p className="mt-4 font-display text-xl text-muted-foreground">Dear Topper ji,</p>
        <h1 className="font-display text-5xl leading-tight md:text-7xl">
          Happy <span className="text-primary">1 Year</span> of<br />Tanging You! 🎉
        </h1>
        {!started && (
          <button onClick={start} className="mt-10 animate-bounce rounded-full bg-primary px-8 py-4 font-display text-2xl text-primary-foreground shadow-lg">
            Tap here, madam ji 👇
          </button>
        )}
      </Section>

      {started && (
        <>
          <Section>
            <div id="msg" className="max-w-2xl rounded-[var(--radius)] border bg-card p-8 backdrop-blur md:p-12">
              <h2 className="font-display text-4xl text-accent">A small message 🐼</h2>
              <p className="mt-6 text-lg leading-relaxed">
                Pata hi nahi chala, madam, ji, kaise ek saal nikal gaya! Aapko pareshan karte-karte bahut dimaag khaya aapka, bahut chidhaya, faltu ki tension di aur mostly dukhi bhi bahut kiya.
                <br /><br />
                Kahan socha tha kabhi ki kahan se baat shuru hui thi hamari, kaise aur kahan par pahunch gaye hain aaj, aur aapko pareshan karte-karte...
                <br /><br />
                I guess, kaafi kuch bhi dekha hai humne. Weeks tak koi baat na hone se lekar ek hi din mein 7–8 ghante baat ho jaana, hamara Pinterest aur pins ke through maze karna, mera line maarna... 😜😝
              </p>
              <p className="mt-4 text-lg leading-relaxed">
                Thank you for suchh a wonderfull time and khusi ke pal... 💛💛
              </p>
            </div>
          </Section>

          <Section>
            <h2 className="font-display text-5xl">Sweet Memories 🍨</h2>
            <div className="mt-10 flex w-full max-w-6xl flex-col gap-6">
              {segments.map((seg, si) =>
                "big" in seg ? (
                  <MemoryGroup key={seg.big.title} memory={seg.big} laneCount={Math.min(BIG_LANES, seg.big.photos.length)} ratioOf={ratioOf} openSrc={openSrc} onToggle={toggle} />
                ) : (
                  <div key={si} className="flex items-start gap-6">
                    {seg.cols.map((col, c) => (
                      <div key={c} className="flex min-w-0 flex-1 flex-col gap-6">
                        {col.map((m) => <MemoryGroup key={m.title} memory={m} laneCount={1} ratioOf={ratioOf} openSrc={openSrc} onToggle={toggle} />)}
                      </div>
                    ))}
                  </div>
                ),
              )}
            </div>

            <div className="mt-16 max-w-md rounded-[var(--radius)] border bg-card p-6">
              <img src={mixer} alt="Evil mixer" width={816} height={816} loading="lazy"
                className="mx-auto w-32 cursor-pointer transition-transform hover:rotate-12"
                style={{ transform: `scale(${Math.max(0.3, 1 - mixerClicks * 0.15)})` }}
                onClick={() => setMixerClicks((c) => c + 1)} />
              <h3 className="font-display text-3xl text-primary">Her Greatest Enemy: The Mixer</h3>
              <p className="mt-2 text-muted-foreground">
                {mixerClicks === 0 ? "Hit it to defeat it! 👊" : mixerClicks < 5 ? `Hit ${mixerClicks} times... it's still loud 😤` : "Mixer defeated! The kitchen is safe again 🏆"}
              </p>
            </div>
          </Section>

          <Section>
            <h2 className="font-display text-5xl">Your 1 Year Review 📝</h2>
            <p className="mt-2 text-muted-foreground">Very official. Topper-level exam. No cheating.</p>
            <div className="mt-8 w-full max-w-lg space-y-6 rounded-[var(--radius)] border bg-card p-8">
              {questions.map((q, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <p className="font-bold">{q}</p>
                  <Stars value={ratings[i] ?? 0} onChange={(n) => setRatings((r) => r.map((v, j) => (j === i ? n : v)))} />
                </div>
              ))}
              <div className="flex flex-col items-center gap-2">
                <p className="font-bold">Write me a little message 💌</p>
                <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={4}
                  placeholder="Say something nice... or roast me 😏"
                  className="w-full rounded-md border bg-background p-3 text-foreground" />
              </div>
              <button onClick={() => { setSubmitted(true); setTries((t) => t + 1); }} className="rounded-full bg-primary px-6 py-3 font-display text-xl text-primary-foreground">
                Submit review
              </button>
              {submitted && (
                <p className="font-display text-xl text-accent">
                  {ratings.every((r) => r === 5)
                    ? "Full marks! As expected from a Topper 🎓"
                    : tries < 3
                      ? "So little?? 🥺 Think again, madam ji..."
                      : "Okay okay, honest review accepted 😌 Thank you for being real 🖤"}
                </p>
              )}
              {submitted && note.trim() && (ratings.every((r) => r === 5) || tries >= 3) && (
                <p className="italic text-muted-foreground">Your message: "{note}" — saved in my heart forever 🐼</p>
              )}
            </div>
          </Section>

          <Section>
            <img src={panda} alt="Happy panda" width={816} height={816} loading="lazy" className="w-48" />
            <h2 className="font-display text-5xl md:text-7xl">Thank You 🖤</h2>
            <p className="mt-6 max-w-xl text-xl leading-relaxed">
              For tolerating me and my flent nonsence.
            </p>
            <p className="mt-8 font-display text-3xl text-primary md:text-5xl">
              And I want to tang you forever, madam ji! 🐼🍦
            </p>
            <p className="mt-6 text-muted-foreground">— your favourite (shayad) headachee</p>
          </Section>
        </>
      )}
    </main>
  );
}
