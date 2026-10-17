import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
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
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
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
type Memory = { title: string; text: string; photos: { src: string; alt: string }[] };
const memories: Memory[] = [
  { title: "5 September 2026", text: "Ek din, itni saari memories… madam ji aur unke alag-alag moods 🖤", photos: [
    { src: m7.url, alt: "Together at the mall" },
    { src: m6.url, alt: "With friends in the car" },
    { src: m8.url, alt: "At the food court" },
    { src: m9.url, alt: "Arcade fun" },
    { src: m10.url, alt: "With the Spider-Man plush" },
    { src: m11.url, alt: "Holding a sunflower" },
  ] },
  { title: "16 September 2026", text: "Topper ji aur company 🎓", photos: [{ src: m12.url, alt: "Friends together at a desk" }] },
  { title: "29 August 2026", text: "Double cuteness, ek hi photo mein 💛", photos: [{ src: m13.url, alt: "With her little sister" }] },
  { title: "12 July 2026", text: "School wali memories 🖤", photos: [{ src: m4.url, alt: "Group photo in school uniforms" }] },
  { title: "8 December 2025", text: "Ice cream is a food group for her. Dinner is optional. Ice cream isn't.", photos: [{ src: m2.url, alt: "Holding a chocolate ice cream" }] },
  { title: "28 January 2026", text: "Bachpan se hi favourite headache 😜", photos: [{ src: m3.url, alt: "Childhood photo on a phone screen" }] },
  { title: "31 July 2026", text: "Chhoti si photo, badi si cuteness 🐼", photos: [{ src: m5.url, alt: "Baby photo" }] },
  { title: "Hum dono", text: "Madam ji ke saamne toh haath jodne hi padenge 😌", photos: [{ src: m1.url, alt: "Together with hands folded in namaste" }] },
];


// Flatten memory groups into one photo wall; each photo keeps its group's date + caption for the lightbox.
const gallery = memories.flatMap((m) => m.photos.map((photo) => ({ ...photo, title: m.title, text: m.text })));
// Cycled aspect ratios give the masonry wall its mixed-size look.
const tileAspects = ["aspect-[4/5]", "aspect-square", "aspect-[3/4]", "aspect-[4/3]", "aspect-[4/5]", "aspect-[5/6]"];

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
  const [lightbox, setLightbox] = useState<number | null>(null);
  const step = (d: number) => setLightbox((i) => (i === null ? i : (i + d + gallery.length) % gallery.length));

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
            <div className="mt-10 w-full max-w-5xl columns-2 gap-3 sm:columns-3 lg:columns-4">
              {gallery.map((g, i) => (
                <button key={g.src} type="button" aria-label={`Open memory: ${g.title}`} onClick={() => setLightbox(i)}
                  className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-md bg-foreground p-1.5 shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:rotate-[0.5deg] focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary motion-reduce:transition-none">
                  <img src={g.src} alt={g.alt} loading="lazy" className={`${tileAspects[i % tileAspects.length]} w-full rounded-sm object-cover`} />
                  <span className="pointer-events-none absolute inset-x-1.5 bottom-1.5 rounded-b-sm bg-gradient-to-t from-black/70 to-transparent px-2 pb-1.5 pt-6 text-left text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                    {g.title}
                  </span>
                </button>
              ))}
            </div>

            <Dialog open={lightbox !== null} onOpenChange={(o) => !o && setLightbox(null)}>
              <DialogContent className="max-w-3xl border-0 bg-foreground p-3 text-primary-foreground"
                onKeyDown={(e) => { if (e.key === "ArrowRight") step(1); if (e.key === "ArrowLeft") step(-1); }}>
                {lightbox !== null && (
                  <div className="flex flex-col gap-3">
                    <div className="relative">
                      <img src={gallery[lightbox].src} alt={gallery[lightbox].alt} className="max-h-[70vh] w-full rounded-sm object-contain" />
                      <button type="button" aria-label="Previous photo" onClick={() => step(-1)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-3 py-2 text-2xl text-white hover:bg-black/70">‹</button>
                      <button type="button" aria-label="Next photo" onClick={() => step(1)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-3 py-2 text-2xl text-white hover:bg-black/70">›</button>
                    </div>
                    <div className="px-2 pb-2 text-left">
                      <DialogTitle className="font-display text-2xl">{gallery[lightbox].title}</DialogTitle>
                      <DialogDescription className="mt-1 text-sm text-primary-foreground/80">{gallery[lightbox].text}</DialogDescription>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>

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
