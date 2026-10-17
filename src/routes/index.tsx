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
  { w: "ramalaii", t: "12%", l: "55%", r: "-6deg" }, { w: "ramalaii", t: "45%", l: "8%", r: "5deg" },
  { w: "ramalaii", t: "72%", l: "80%", r: "-4deg" }, { w: "ramalaii", t: "85%", l: "42%", r: "7deg" },
  { w: "ramalaii", t: "28%", l: "78%", r: "-8deg" },
  { img: clipRasamalai, t: "10%", l: "22%", r: "-10deg" }, { img: clipRasamalai, t: "52%", l: "88%", r: "8deg" },
  { img: clipRasamalai, t: "95%", l: "12%", r: "6deg" },
  { img: clipBooks, t: "38%", l: "70%", r: "8deg" }, { img: clipBooks, t: "88%", l: "55%", r: "-6deg" },
  { img: clipBooks, t: "5%", l: "92%", r: "12deg" },
  { img: clipRuler, t: "58%", l: "20%", r: "-14deg" }, { img: clipRuler, t: "25%", l: "48%", r: "12deg" },
  { img: clipRuler, t: "75%", l: "32%", r: "-8deg" },
];


// Real photos are attached to each memory below
type Memory = { e: string; title: string; text: string; img?: string };
const memories: Memory[] = [
  { e: "🍦", img: m1.url, title: "Ice cream > everything", text: "Ice cream is a food group for her. Dinner is optional. Ice cream isn't." },
  { e: "😴", img: m2.url, title: "Professional sleeper", text: "Sleeps like it's an Olympic sport. Gold medal every year." },
  { e: "🥞", img: m3.url, title: "Dosa devotion", text: "If dosa were a person, I'd honestly be scared of the competition." },
  { e: "🌥️", img: m4.url, title: "Cloudy days", text: "Grey sky, cold breeze, and suddenly she's the happiest panda alive." },
  { e: "🎓", img: m5.url, title: "Topper ji", text: "Says 'I didn't study at all' and then tops. Every. Single. Time." },
  { e: "🖤", img: m6.url, title: "Black everything", text: "Wardrobe colour palette: black, black, and a little more black." },
];


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
            <div className="mt-10 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {memories.map((m, i) => (
                <div key={i} className="rounded-md bg-foreground p-3 pb-5 text-primary-foreground shadow-2xl transition-transform hover:scale-105"
                  style={{ transform: `rotate(${i % 2 ? 2 : -2}deg)` }}>
                  {m.img ? (
                    <img src={m.img} alt={m.title} loading="lazy" className="h-36 w-full rounded object-cover" />
                  ) : (
                    <div className="flex h-36 items-center justify-center rounded bg-muted text-7xl">{m.e}</div>
                  )}
                  <h3 className="mt-3 font-display text-2xl">{m.title}</h3>

                  <p className="mt-1 text-sm">{m.text}</p>
                </div>
              ))}
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
