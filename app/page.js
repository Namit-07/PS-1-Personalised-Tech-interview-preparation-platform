'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

/* ────────────────────────────────────
   Hooks
   ──────────────────────────────────── */

function useInView(opts = {}) {
  const ref = useRef(null);
  const [ visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold: opts.threshold ?? 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [opts.threshold]);
  return [ref, visible];
}

function useCountUp(end, duration = 2000) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const t0 = performance.now();
        const tick = (now) => {
          const p = Math.min((now - t0) / duration, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          setVal(Math.floor(ease * end));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end, duration]);
  return [val, ref];
}

/* ────────────────────────────────────
   Icons (clean SVG, no emojis)
   ──────────────────────────────────── */
const I = {
  brain: (cls = 'w-5 h-5') => <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2a3.5 3.5 0 0 0-3 5.27A4 4 0 0 0 5 11a4.5 4.5 0 0 0 1.41 3.27A3.5 3.5 0 0 0 9.5 22h5a3.5 3.5 0 0 0 3.09-7.73A4.5 4.5 0 0 0 19 11a4 4 0 0 0-1.5-3.73A3.5 3.5 0 0 0 14.5 2"/><path d="M12 2v20"/></svg>,
  target: (cls = 'w-5 h-5') => <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  chart: (cls = 'w-5 h-5') => <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M7 16l4-6 4 4 5-8"/></svg>,
  book: (cls = 'w-5 h-5') => <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15z"/></svg>,
  route: (cls = 'w-5 h-5') => <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="19" r="3"/><circle cx="18" cy="5" r="3"/><path d="M12 19h4.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H12"/></svg>,
  flame: (cls = 'w-5 h-5') => <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2c.5 3.5 4 6 4 10a4 4 0 1 1-8 0c0-4 3.5-6.5 4-10z"/></svg>,
  code: (cls = 'w-5 h-5') => <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  users: (cls = 'w-5 h-5') => <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  arrow: (cls = 'w-4 h-4') => <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>,
  check: (cls = 'w-4 h-4') => <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  sparkle: (cls = 'w-5 h-5') => <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z"/></svg>,
  zap: (cls = 'w-5 h-5') => <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  shield: (cls = 'w-5 h-5') => <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>,
};

/* Reveal wrapper */
function Reveal({ children, className = '', delay = 0 }) {
  const [ref, vis] = useInView();
  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-out ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ────────────────────────────────────
   Features data
   ──────────────────────────────────── */
const features = [
  { icon: I.brain, title: 'AI-Powered Hints', desc: 'Progressive hints that teach the underlying concept — not just the answer. Like a mentor sitting next to you.', accent: 'blue' },
  { icon: I.target, title: 'Smart Recommendations', desc: 'After every session the system finds problems that target your weakest areas. Zero wasted reps.', accent: 'violet' },
  { icon: I.chart, title: 'Deep Analytics', desc: 'Topic-level proficiency, time trends, difficulty distributions. Real data, not a solved counter.', accent: 'emerald' },
  { icon: I.book, title: '8 Learning Paths', desc: 'DSA, System Design, LLD, OOP, CS Fundamentals, MERN, Java Spring Boot, AI/ML.', accent: 'amber' },
  { icon: I.route, title: 'Adaptive Difficulty', desc: 'Problems get harder as you improve. Always in the productive struggle zone.', accent: 'rose' },
  { icon: I.flame, title: 'Streaks & Badges', desc: 'Daily streak calendar, achievement milestones, and leaderboard to keep momentum.', accent: 'orange' },
];

const accentMap = {
  blue:    { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20', glow: 'group-hover:shadow-blue-500/10' },
  violet:  { bg: 'bg-violet-500/10', text: 'text-violet-400', border: 'border-violet-500/20', glow: 'group-hover:shadow-violet-500/10' },
  emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20', glow: 'group-hover:shadow-emerald-500/10' },
  amber:   { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20', glow: 'group-hover:shadow-amber-500/10' },
  rose:    { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/20', glow: 'group-hover:shadow-rose-500/10' },
  orange:  { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20', glow: 'group-hover:shadow-orange-500/10' },
};

const topics = ['DSA', 'System Design', 'Low-Level Design', 'OOP', 'MERN Stack', 'Java / Spring', 'AI & ML', 'CS Fundamentals'];

/* ────────────────────────────────────
   Page
   ──────────────────────────────────── */
export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const [problemCount, problemRef] = useCountUp(500);
  const [pathCount, pathRef] = useCountUp(8);
  const [userCount, userRef] = useCountUp(1000);

  // typing animation for hero
  const [typedText, setTypedText] = useState('');
  const fullText = 'Personalized. Adaptive. Effective.';

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTypedText(fullText.slice(0, i));
      if (i >= fullText.length) clearInterval(interval);
    }, 45);
    return () => clearInterval(interval);
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="lp">

      {/* ══════════════ NAVBAR ══════════════ */}
      <nav className="sticky top-0 z-50 lp-nav">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2 select-none">
            <div className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center">
              <span className="text-[11px] font-bold text-white leading-none">SF</span>
            </div>
            <span className="text-[15px] font-semibold text-white/90 tracking-tight">
              SkillForge<span className="text-blue-400">.AI</span>
            </span>
          </Link>

          <div className="hidden sm:flex items-center gap-6 text-[13px] text-white/50">
            <a href="#features" className="hover:text-white/80 transition-colors">Features</a>
            <a href="#how" className="hover:text-white/80 transition-colors">How it works</a>
            <a href="#paths" className="hover:text-white/80 transition-colors">Paths</a>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/login" className="px-3.5 py-1.5 text-[13px] font-medium text-white/60 hover:text-white transition-colors">
              Log in
            </Link>
            <Link href="/signup" className="px-4 py-1.5 text-[13px] font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors">
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* ══════════════ HERO ══════════════ */}
      <section className="relative overflow-hidden lp-hero">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[800px] h-[600px] lp-hero-glow pointer-events-none" />

        <div className="relative max-w-[1200px] mx-auto px-5 sm:px-8 pt-24 pb-8 sm:pt-32 sm:pb-12 text-center">

          <h1 className="lp-fade-in lp-d1 text-[42px] sm:text-[56px] lg:text-[72px] font-extrabold leading-[1.05] tracking-tight text-white max-w-4xl mx-auto">
            The smarter way to<br />
            <span className="lp-gradient-text">crack tech interviews</span>
          </h1>

          <p className="lp-fade-in lp-d2 mt-6 text-[16px] sm:text-[18px] leading-relaxed text-white/40 max-w-xl mx-auto">
            Structured paths, AI-driven hints, and real analytics — stop guessing
            what to study and start preparing with a system that works.
          </p>

          {/* Typed text */}
          <p className="lp-fade-in lp-d3 mt-5 text-[14px] font-mono text-blue-400/70 h-5">
            {typedText}<span className="lp-cursor">|</span>
          </p>

          {/* CTAs */}
          <div className="lp-fade-in lp-d3 mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/signup" className="group inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-blue-600 text-white text-[15px] font-semibold hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-500/30">
              Start for free
              <span className="transition-transform group-hover:translate-x-0.5">{I.arrow()}</span>
            </Link>
            <Link href="/login" className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-[15px] font-medium text-white/70 border border-white/10 hover:border-white/20 hover:bg-white/[0.04] transition-all">
              Sign in
            </Link>
          </div>

          {/* Social proof */}
          <div className="lp-fade-in lp-d4 mt-10 flex items-center justify-center gap-3">
            <div className="flex -space-x-2">
              {['bg-blue-500','bg-emerald-500','bg-violet-500','bg-rose-500','bg-amber-500'].map((c,i)=>(
                <div key={i} className={`w-7 h-7 rounded-full ${c} ring-2 ring-[#0a0e1a] flex items-center justify-center text-[9px] font-bold text-white/80`}>
                  {['A','S','R','M','K'][i]}
                </div>
              ))}
            </div>
            <span className="text-[13px] text-white/30">1,000+ developers preparing with SkillForge</span>
          </div>
        </div>

        {/* ── Dashboard mockup ── */}
        <div className="relative max-w-[1100px] mx-auto px-5 sm:px-8 mt-4 pb-20">
          <div className="lp-fade-in lp-d4 lp-dashboard">
            <div className="lp-dashboard-inner rounded-xl overflow-hidden border border-white/[0.08] bg-[#0d1117] shadow-2xl">
              {/* Tab bar */}
              <div className="flex items-center gap-0 border-b border-white/[0.06] bg-[#0b0f19]">
                <div className="flex items-center gap-1.5 px-4 py-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>
                <div className="flex gap-0 text-[11px] font-medium ml-2">
                  <span className="px-3 py-2.5 text-white/60 border-b-2 border-blue-500 bg-white/[0.03]">Dashboard</span>
                  <span className="px-3 py-2.5 text-white/25">Problems</span>
                  <span className="px-3 py-2.5 text-white/25">Analytics</span>
                </div>
              </div>

              {/* Dashboard body */}
              <div className="grid grid-cols-12 min-h-[340px] sm:min-h-[380px]">
                {/* Sidebar */}
                <div className="col-span-3 border-r border-white/[0.06] p-3 hidden sm:block">
                  <p className="text-[10px] uppercase tracking-wider text-white/20 mb-3 px-2">Learning Paths</p>
                  {['DSA','System Design','OOP','MERN Stack','LLD'].map((t,i) => (
                    <div key={t} className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-[11px] mb-0.5 ${i === 0 ? 'bg-blue-500/10 text-blue-400' : 'text-white/30 hover:text-white/50'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-blue-400' : 'bg-white/15'}`} />
                      {t}
                    </div>
                  ))}
                  <div className="mt-5 px-2">
                    <p className="text-[10px] uppercase tracking-wider text-white/20 mb-2">Your Stats</p>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-[10px] mb-1"><span className="text-white/30">DSA</span><span className="text-emerald-400">72%</span></div>
                        <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden"><div className="h-full rounded-full bg-emerald-500 lp-bar-fill" style={{width:'72%'}}/></div>
                      </div>
                      <div>
                        <div className="flex justify-between text-[10px] mb-1"><span className="text-white/30">System Design</span><span className="text-blue-400">45%</span></div>
                        <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden"><div className="h-full rounded-full bg-blue-500 lp-bar-fill lp-bar-d1" style={{width:'45%'}}/></div>
                      </div>
                      <div>
                        <div className="flex justify-between text-[10px] mb-1"><span className="text-white/30">OOP</span><span className="text-violet-400">68%</span></div>
                        <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden"><div className="h-full rounded-full bg-violet-500 lp-bar-fill lp-bar-d2" style={{width:'68%'}}/></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main content */}
                <div className="col-span-12 sm:col-span-9 p-4 sm:p-5">
                  {/* Greeting */}
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <p className="text-[14px] font-semibold text-white/80">Good morning, Namit</p>
                      <p className="text-[11px] text-white/25 mt-0.5">You&apos;re on a 12-day streak. Keep going!</p>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-orange-500/10 border border-orange-500/20">
                      <span className="text-orange-400">{I.flame('w-3.5 h-3.5')}</span>
                      <span className="text-[11px] font-bold text-orange-400">12</span>
                    </div>
                  </div>

                  {/* Problem card */}
                  <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/20">Medium</span>
                        <span className="text-[13px] font-medium text-white/70">Two Sum</span>
                      </div>
                      <span className="text-[10px] text-white/20">Arrays &bull; Hash Map</span>
                    </div>
                    <pre className="text-[11px] leading-[1.6] font-mono text-white/40 overflow-hidden"><span className="text-blue-400">def</span> <span className="text-amber-400">two_sum</span>(nums, target):{'\n'}    seen = {'{}'}{'\n'}    <span className="text-blue-400">for</span> i, n <span className="text-blue-400">in</span> <span className="text-amber-400">enumerate</span>(nums):{'\n'}        diff = target - n{'\n'}        <span className="text-blue-400">if</span> diff <span className="text-blue-400">in</span> seen:{'\n'}            <span className="text-blue-400">return</span> [seen[diff], i]<span className="lp-cursor text-white/60">|</span></pre>
                  </div>

                  {/* AI hint */}
                  <div className="rounded-lg border border-blue-500/15 bg-blue-500/[0.04] p-3 flex items-start gap-2.5">
                    <span className="mt-0.5 text-blue-400 shrink-0">{I.sparkle('w-4 h-4')}</span>
                    <div>
                      <p className="text-[11px] font-semibold text-blue-400 mb-0.5">AI Hint</p>
                      <p className="text-[11px] leading-relaxed text-white/35">Think about what data structure gives O(1) lookups. Can you trade space for time here?</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Gradient fade at bottom */}
            <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-[#07090f] to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      {/* ══════════════ TOPICS TICKER ══════════════ */}
      <section className="lp-section-dark border-y border-white/[0.05] overflow-hidden py-5">
        <div className="lp-ticker">
          <div className="lp-ticker-track">
            {[...topics, ...topics].map((t, i) => (
              <span key={i} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] text-[12px] font-medium text-white/35 whitespace-nowrap mx-1.5">
                <span className="w-1 h-1 rounded-full bg-blue-400/50" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ STATS ══════════════ */}
      <section className="lp-section-dark py-20">
        <div className="max-w-[1000px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              { ref: problemRef, val: '1200', suffix: '+', label: 'Practice problems', icon: I.code },
              { ref: pathRef, val: '50', suffix: '', label: 'Learning paths', icon: I.book },
              { ref: null, val: '100', suffix: '%', label: 'AI-powered', icon: I.brain },
              { ref: userRef, val: '1000', suffix: '+', label: 'Active learners', icon: I.users },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 80} className="text-center">
                <div ref={s.ref}>
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white/30 mb-3">
                    {s.icon()}
                  </div>
                  <p className="text-3xl sm:text-4xl font-bold text-white tabular-nums">{s.val}{s.suffix}</p>
                  <p className="text-[12px] text-white/25 mt-1 font-medium">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ FEATURES BENTO ══════════════ */}
      <section id="features" className="lp-section-dark py-24">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <Reveal className="text-center mb-16">
            <p className="text-[12px] font-semibold tracking-widest uppercase text-blue-400/70 mb-3">Features</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Everything you need. Nothing you don&apos;t.
            </h2>
            <p className="mt-4 text-[15px] text-white/30 max-w-md mx-auto">
              Each feature exists to make your preparation more efficient.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => {
              const a = accentMap[f.accent];
              return (
                <Reveal key={f.title} delay={i * 60}>
                  <div className={`group relative p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 hover:shadow-xl ${a.glow} h-full`}>
                    <div className={`w-9 h-9 rounded-lg ${a.bg} ${a.text} flex items-center justify-center mb-4 border ${a.border}`}>
                      {f.icon()}
                    </div>
                    <h3 className="text-[15px] font-semibold text-white/85 mb-2">{f.title}</h3>
                    <p className="text-[13px] leading-relaxed text-white/30">{f.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════ HOW IT WORKS ══════════════ */}
      <section id="how" className="lp-section-dark py-24 border-t border-white/[0.04]">
        <div className="max-w-[900px] mx-auto px-5 sm:px-8">
          <Reveal className="text-center mb-16">
            <p className="text-[12px] font-semibold tracking-widest uppercase text-blue-400/70 mb-3">How it works</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Three steps to interview-ready
            </h2>
          </Reveal>

          <div className="space-y-0">
            {[
              { n: '01', title: 'Choose your path', desc: 'Pick your target role — SDE, Full-Stack, ML Engineer. We build a curriculum with the right topics and difficulty progression.', icon: I.target },
              { n: '02', title: 'Practice with AI guidance', desc: 'Work through curated problems. When you\'re stuck, our AI gives progressive hints that teach the concept — not just the answer.', icon: I.sparkle },
              { n: '03', title: 'Track and adapt', desc: 'Your dashboard shows real proficiency, not just completion. The system adjusts recommendations as you improve.', icon: I.chart },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 100}>
                <div className="flex gap-5 sm:gap-8 py-8 group">
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                      {s.icon()}
                    </div>
                    {i < 2 && <div className="w-px flex-1 bg-linear-to-b from-blue-500/20 to-transparent mt-3" />}
                  </div>
                  <div className="pb-2">
                    <p className="text-[11px] font-bold text-blue-400/50 tracking-wider uppercase mb-1">Step {s.n}</p>
                    <h3 className="text-[17px] font-semibold text-white/85 mb-2">{s.title}</h3>
                    <p className="text-[14px] leading-relaxed text-white/30 max-w-md">{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ PATHS ══════════════ */}
      <section id="paths" className="lp-section-dark py-24 border-t border-white/[0.04]">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="lg:grid lg:grid-cols-5 lg:gap-12 items-start">
            <Reveal className="lg:col-span-2 mb-10 lg:mb-0 lg:sticky lg:top-24">
              <p className="text-[12px] font-semibold tracking-widest uppercase text-blue-400/70 mb-3">What you get</p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
                More than just problems
              </h2>
              <p className="text-[14px] leading-relaxed text-white/30">
                SkillForge is a complete prep system — structured content, real-time AI tutoring,
                and analytics in one place.
              </p>
            </Reveal>

            <div className="lg:col-span-3 space-y-2.5">
              {[
                'Role-specific curriculum for SDE, Full-Stack, ML, and Backend roles',
                'AI tutor that gives progressive hints, never full solutions',
                'Topic-level proficiency tracking with visual analytics',
                'Daily streak calendar and achievement badges',
                'Personalized problem recommendations after each session',
                'Difficulty breakdown and weak-area identification',
                'Dark mode, mobile-optimized, and fast',
                'Competitive leaderboard across all users',
              ].map((item, i) => (
                <Reveal key={i} delay={i * 40}>
                  <div className="flex items-center gap-3 p-3.5 rounded-lg border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                    <span className="text-emerald-400 shrink-0">{I.check()}</span>
                    <span className="text-[13.5px] text-white/50">{item}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ CTA ══════════════ */}
      <section className="lp-section-dark py-28 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-blue-600/[0.07] blur-[100px] pointer-events-none" />
        <Reveal className="relative max-w-2xl mx-auto px-5 sm:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.03] mb-6">
            <span className="text-blue-400">{I.zap('w-3.5 h-3.5')}</span>
            <span className="text-[11px] font-medium text-white/40">Takes less than 2 minutes to start</span>
          </div>
          <h2 className="text-3xl sm:text-[42px] font-bold tracking-tight text-white leading-tight">
            Your next interview is<br />closer than you think
          </h2>
          <p className="mt-5 text-[15px] text-white/30 max-w-md mx-auto">
            Create a free account, pick your learning path, and solve your first problem today.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href="/signup" className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-blue-600 text-white text-[15px] font-semibold hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-500/30">
              Create free account
              <span className="transition-transform group-hover:translate-x-0.5">{I.arrow()}</span>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ══════════════ FOOTER ══════════════ */}
      <footer className="lp-section-dark border-t border-white/[0.05]">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center">
                  <span className="text-[9px] font-bold text-white">SF</span>
                </div>
                <span className="text-[14px] font-semibold text-white/70">SkillForge.AI</span>
              </div>
              <p className="text-[12px] text-white/20 max-w-xs leading-relaxed">
                A focused platform for technical interview preparation. Built by engineers.
              </p>
            </div>
            <div className="flex gap-5 text-[12px]">
              <Link href="/login" className="text-white/20 hover:text-white/50 transition-colors">Log in</Link>
              <Link href="/signup" className="text-white/20 hover:text-white/50 transition-colors">Sign up</Link>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-white/[0.04]">
            <p className="text-[11px] text-white/15">&copy; {new Date().getFullYear()} SkillForge.AI</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
