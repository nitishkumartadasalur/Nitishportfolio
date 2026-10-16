import { useEffect, useState, type ReactNode } from "react";
import { motion, MotionConfig } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { profile, roles, stack, learning, projects } from "./data";

const nav = [["About", "#about"], ["Stack", "#stack"], ["Projects", "#projects"], ["GitHub", "#github"], ["Learning", "#learning"], ["Contact", "#contact"]];
const panel = ["#4a1a26", "#26262b"];

function useTyping(words: string[]) {
  const [text, setText] = useState(""); const [i, setI] = useState(0); const [del, setDel] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setText(words[0]); return; }
    const w = words[i]; let t: number;
    if (!del && text === w) t = window.setTimeout(() => setDel(true), 1600);
    else if (del && text === "") { setDel(false); setI((i + 1) % words.length); }
    else t = window.setTimeout(() => setText(del ? w.slice(0, text.length - 1) : w.slice(0, text.length + 1)), del ? 35 : 70);
    return () => clearTimeout(t);
  }, [text, del, i, words]);
  return text;
}

const Reveal = ({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) => (
  <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, delay }}>{children}</motion.div>
);
const Section = ({ id, n, label, title, children }: { id: string; n: string; label: string; title: string; children: ReactNode }) => (
  <section id={id} className="mx-auto max-w-6xl px-5 py-20 sm:px-10">
    <Reveal><div className="h-2 w-16 bg-wine" /><p className="label mt-4 text-wine/70">{n} — {label}</p><h2 className="display mt-3 text-3xl text-wine sm:text-5xl">{title}</h2></Reveal>
    <div className="mt-12">{children}</div>
  </section>
);
const Btn = ({ href, children, primary = false }: { href: string; children: ReactNode; primary?: boolean }) => (
  <a href={href} target={href.startsWith("#") ? undefined : "_blank"} rel="noopener noreferrer"
    className={`inline-flex items-center gap-2 border border-wine px-6 py-3 text-xs font-semibold uppercase tracking-[.2em] transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wine ${primary ? "bg-wine text-cream hover:bg-ink" : "text-wine hover:bg-wine hover:text-cream"}`}>{children}</a>
);

function Photo({ className = "", pos = "object-top" }: { className?: string; pos?: string }) {
  const [bad, setBad] = useState(false);
  return bad
    ? <div className={`display flex items-center justify-center bg-wine text-6xl text-cream ${className}`} role="img" aria-label="Initials NK">NK</div>
    : <img src="/profile.jpg" alt={`Portrait of ${profile.name}`} width={800} height={1000} loading="lazy" onError={() => setBad(true)} className={`object-cover grayscale contrast-110 ${pos} ${className}`} />;
}

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-wine/15 bg-cream/90 backdrop-blur">
      <nav aria-label="Main" className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-10">
        <a href="#top" className="display text-xl text-wine">NK</a>
        <ul className="hidden gap-8 md:flex">{nav.map(([n, h]) => <li key={h}><a href={h} className="label text-wine/70 transition hover:text-wine">{n}</a></li>)}</ul>
        <button className="text-wine md:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </nav>
      {open && <ul className="border-t border-wine/15 px-5 pb-4 md:hidden">{nav.map(([n, h]) => <li key={h}><a href={h} onClick={() => setOpen(false)} className="label block py-3 text-wine">{n}</a></li>)}</ul>}
    </header>
  );
}

function Hero() {
  const typed = useTyping(roles);
  return (
    <section id="top" className="relative mx-auto grid min-h-screen max-w-6xl items-center gap-14 px-5 pb-16 pt-28 sm:px-10 lg:grid-cols-[1.15fr_1fr]">
      <div>
        <div className="mb-8 flex items-center gap-4"><span className="h-px w-16 bg-wine" /><span className="label text-wine/70">Portfolio 2026</span></div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="display break-words text-4xl text-wine sm:text-6xl">Hey, I'm Nitish Kumar Tadasalur.</motion.h1>
        <p className="mt-6 h-8 text-lg font-medium text-ink sm:text-xl" aria-live="off">{typed}<span className="caret" aria-hidden="true" /></p>
        <p className="mt-4 max-w-lg leading-relaxed text-ink/75">I'm a Computer Science student specializing in Data Science. I learn by building — turning ideas in AI, NLP and software into practical applications people can actually use.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Btn href="#projects" primary>Explore My Projects <ArrowUpRight className="h-4 w-4" /></Btn>
          <Btn href="#contact">Contact Me</Btn>
          <Btn href={profile.github}>GitHub</Btn>
        </div>
      </div>
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.7 }} className="relative mx-auto w-full max-w-sm">
        <div className="absolute -right-5 -top-5 h-2/3 w-3/5 bg-wine" aria-hidden="true" />
        <div className="absolute -bottom-4 -left-4 h-24 w-3 bg-wine" aria-hidden="true" />
        <Photo className="relative aspect-[4/5] w-full" />
        <span className="label vtext absolute -right-8 bottom-4 hidden text-wine/60 sm:block" aria-hidden="true">Presentation 001</span>
      </motion.div>
      <a href="#about" className="label absolute bottom-5 left-5 text-wine/60 hover:text-wine sm:left-10">Scroll ↓</a>
    </section>
  );
}

const About = () => (
  <Section id="about" n="01" label="About" title="Learning by building.">
    <div className="grid gap-10 md:grid-cols-[auto_1fr]">
      <Reveal className="flex gap-4"><div className="relative"><div className="absolute -bottom-3 -right-3 h-1/2 w-full bg-wine" aria-hidden="true" /><Photo pos="object-[50%_20%]" className="relative h-72 w-52 sm:h-96 sm:w-64" /></div>
        <span className="display vtext text-4xl text-wine sm:text-6xl" aria-hidden="true">About — Me</span></Reveal>
      <div className="grid content-start gap-8 sm:grid-cols-3">
        {[["My approach", "I learn best by building. Every project is a chance to turn a concept into something that works."],
          ["What I enjoy", "Programming, problem-solving, and exploring how data and AI can solve everyday problems."],
          ["What drives me", "A motivation to build useful applications — tools that are practical, clear and genuinely helpful."]].map(([t, d], i) => (
          <Reveal key={t} delay={i * 0.1}><h3 className="label border-t-2 border-wine pt-3 font-bold text-wine">{t}</h3><p className="mt-3 text-sm leading-7 text-ink/75">{d}</p></Reveal>))}
      </div>
    </div>
  </Section>
);

const Stack = () => (
  <Section id="stack" n="02" label="Tech Stack" title="Tools I work with.">
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {stack.map((g, i) => (
        <Reveal key={g.group} delay={i * 0.08}><h3 className="label border-t-2 border-wine pt-3 font-bold text-wine">{g.group}</h3>
          <ul className="mt-4">{g.items.map(t => <li key={t} className="cursor-default border-b border-wine/15 py-2.5 text-sm transition hover:translate-x-1 hover:text-wine">{t}</li>)}</ul></Reveal>))}
    </div>
  </Section>
);

const Projects = () => (
  <Section id="projects" n="03" label="Projects" title="Things I've built.">
    <div className="space-y-10">
      {projects.map((p, i) => (
        <Reveal key={p.title}>
          <article className="grid overflow-hidden bg-paper shadow-[0_10px_40px_-20px_rgba(74,26,38,.45)] transition hover:-translate-y-1 md:grid-cols-[240px_1fr]">
            <div className="flex items-end justify-between gap-4 p-6 text-cream md:flex-col md:items-start md:justify-between" style={{ background: panel[i % 2] }}>
              <span className="display text-6xl md:text-8xl">0{i + 1}</span>
              <span className="display vtext hidden text-3xl md:block" aria-hidden="true">{p.title}</span>
              <span className="label md:hidden">{p.title}</span>
            </div>
            <div className="p-6 sm:p-10">
              <h3 className="display text-2xl text-wine sm:text-3xl">{p.title}</h3><p className="label mt-2 text-wine/70">{p.tagline}</p>
              <p className="mt-5 leading-7 text-ink/80">{p.description}</p>
              <ul className="mt-5 grid gap-1.5 text-sm sm:grid-cols-2">{p.features.map(f => <li key={f} className="flex gap-2"><span className="text-wine">—</span>{f}</li>)}</ul>
              <ul className="mt-5 flex flex-wrap gap-2">{p.tags.map(t => <li key={t} className="border border-wine/40 px-3 py-1 text-[11px] uppercase tracking-widest text-wine">{t}</li>)}</ul>
              <div className="mt-7 flex flex-wrap gap-3">
                {p.demo && <Btn href={p.demo} primary>Live Demo <ArrowUpRight className="h-4 w-4" /></Btn>}
                <Btn href={p.repo}>Repository</Btn>
              </div>
            </div>
          </article>
        </Reveal>))}
    </div>
  </Section>
);

function GitHub() {
  const [failed, setFailed] = useState(false);
  return (
    <Section id="github" n="04" label="GitHub" title="Activity on GitHub.">
      <Reveal><div className="bg-paper p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4"><p className="label text-wine">@{profile.githubUser}</p>
          <div className="flex flex-wrap gap-3"><Btn href={profile.github} primary>View Profile</Btn><Btn href={`${profile.github}?tab=repositories`}>All Repositories</Btn></div></div>
        <div className="mt-6 overflow-x-auto">
          {failed ? <p className="py-6 text-center text-ink/70">The contribution graph couldn't load right now. <a className="text-wine underline" href={profile.github}>See it on GitHub</a>.</p>
            : <img src={`https://ghchart.rshah.org/4a1a26/${profile.githubUser}`} alt="GitHub contribution graph" loading="lazy" onError={() => setFailed(true)} className="mx-auto min-w-[640px] max-w-full" />}
        </div>
      </div></Reveal>
    </Section>
  );
}

const Learning = () => (
  <Section id="learning" n="05" label="Learning" title="What I'm exploring.">
    <div className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
      {learning.map((l, i) => <Reveal key={l} delay={i * 0.06}><div className="flex items-baseline gap-4 border-t-2 border-wine py-5"><span className="display text-2xl text-wine/40">0{i + 1}</span><span className="font-semibold">{l}</span></div></Reveal>)}
    </div>
    <p className="mt-6 text-sm text-ink/60">Ongoing learning interests — always improving through projects.</p>
  </Section>
);

const Contact = () => (
  <section id="contact" className="bg-wine text-cream">
    <div className="mx-auto max-w-6xl px-5 py-24 sm:px-10">
      <Reveal><p className="label text-cream/60">06 — Contact</p><h2 className="display mt-3 text-4xl sm:text-6xl">Let's build something.</h2>
        <p className="mt-6 max-w-xl text-lg text-cream/80">I'm always happy to collaborate, hear feedback, or talk about projects. Reach out anytime.</p>
        <div className="mt-10 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[.2em]">
          <a href={`mailto:${profile.email}`} className="break-all border border-cream bg-cream px-6 py-3 text-wine hover:bg-transparent hover:text-cream">{profile.email}</a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="border border-cream px-6 py-3 hover:bg-cream hover:text-wine">LinkedIn</a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="border border-cream px-6 py-3 hover:bg-cream hover:text-wine">GitHub</a>
        </div></Reveal>
    </div>
  </section>
);

const Footer = () => (
  <footer className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-xs text-ink/60 sm:flex-row sm:px-10">
    <p className="label">© {new Date().getFullYear()} {profile.name}</p>
    <nav aria-label="Footer" className="label flex gap-5">{nav.slice(0, 4).map(([n, h]) => <a key={h} href={h} className="hover:text-wine">{n}</a>)}<a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-wine">GitHub</a></nav>
    <p className="font-mono">while (alive) {"{ learn(); build(); }"}</p>
  </footer>
);

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Navbar /><main><Hero /><About /><Stack /><Projects /><GitHub /><Learning /><Contact /></main><Footer />
    </MotionConfig>
  );
}
