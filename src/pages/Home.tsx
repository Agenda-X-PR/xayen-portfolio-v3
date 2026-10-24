import { useEffect, useRef, useState, type MouseEvent } from "react";
import {
  ArrowDown,
  ArrowRight,
  Asterisk,
  Download,
  Github,
  Mail,
  Menu,
  Sparkles,
  X,
} from "lucide-react";
import { PopButton } from "@/components/PopButton";

const EMAIL = "belikexen@proton.me";
const GITHUB = "https://github.com/Agenda-X-PR";
const CV = "/cv/Ekundayo_Oyinkansola_Resume_2026_v3.docx";

type Theme = "ink" | "yellow" | "blue" | "pink" | "mint" | "paper";

type ProjectLink = { label: string; href: string; icon: "live" | "code" };

type Project = {
  id: string;
  title: string;
  origin: string;
  category: string;
  summary: string;
  impact: string;
  theme: Theme;
  file: string;
  note: string;
  facts: [string, string][];
  tags: string[];
  links: ProjectLink[];
};

const repo = (name: string) => `${GITHUB}/${name}`;

const projects: Project[] = [
  {
    id: "triage-engine",
    title: "Triage Engine",
    origin: "Agenda X",
    category: "Crisis early-warning for Nigerian fintech",
    summary:
      "Scores each bank or fintech against its own baseline and drafts holding statements for a person to review.",
    impact:
      "Replayed on public coverage of Flutterwave 2024, Paystack 2025 and OPay 2026: the score hit Critical within two days of the first story each time and never passed Watch in the three weeks before. Weights were tuned on those same three incidents, so the result is in-sample.",
    theme: "ink",
    file: "triage-engine",
    note: "n=3, in-sample",
    facts: [
      ["Watches", "Nigerian news, Nairaland and Reddit, every 2 hours"],
      ["Score", "0–100 against the company’s own baseline"],
      ["Backtest", "3 real incidents, Critical within 2 days"],
      ["Output", "Reasons shown, responses human-reviewed"],
    ],
    tags: ["Baseline scoring", "Source spread", "Backtesting"],
    links: [
      { label: "Live demo", href: "https://agendax.com.ng/demo", icon: "live" },
      { label: "Method", href: "https://agendax.com.ng/methodology", icon: "live" },
    ],
  },
  {
    id: "ai-triage-dashboard",
    title: "AI Triage Dashboard",
    origin: "Open source",
    category: "Full-stack AI security dashboard",
    summary:
      "Security findings in, plain-language incident summaries out, written by Llama 3.3 on top of a tested detection engine.",
    impact:
      "The frontend runs on Vercel and the FastAPI backend on Render, with auto-generated API docs. The model is set through environment variables, so it can be swapped without code changes.",
    theme: "yellow",
    file: "ai-triage-dashboard",
    note: "live demo",
    facts: [
      ["Frontend", "React 19, TypeScript, Vite"],
      ["Backend", "FastAPI with auto-generated docs"],
      ["Model", "Llama 3.3 via Groq"],
      ["Tests", "25 unit tests on the detection engine"],
    ],
    tags: ["React 19", "TypeScript", "FastAPI", "Llama 3.3", "Groq"],
    links: [
      { label: "Live demo", href: "https://ai-triage-dashboard.vercel.app", icon: "live" },
      { label: "Code", href: repo("ai-triage-dashboard"), icon: "code" },
    ],
  },
  {
    id: "webhook-relay",
    title: "Webhook Relay",
    origin: "Open source",
    category: "Reliable payment webhook delivery",
    summary:
      "Every event is verified, deduplicated and retried until it lands or reaches the dead-letter queue.",
    impact:
      "Signatures are checked in constant time, duplicates are dropped by provider and event id, and failures back off exponentially instead of hammering the endpoint. Nothing disappears silently.",
    theme: "blue",
    file: "webhook-relay",
    note: "live on Render",
    facts: [
      ["Signatures", "HMAC-SHA256, constant-time compare"],
      ["Idempotency", "By (provider, event_id)"],
      ["Retries", "Exponential backoff, 30s to 480s"],
      ["Checks", "28 tests, CI on Python 3.10 to 3.12"],
    ],
    tags: ["Python", "FastAPI", "HMAC-SHA256", "GitHub Actions"],
    links: [
      { label: "Live docs", href: "https://webhook-relay-xxvu.onrender.com/docs", icon: "live" },
      { label: "Code", href: repo("webhook-relay"), icon: "code" },
    ],
  },
  {
    id: "alatpay-java-sdk",
    title: "ALATPay Java SDK",
    origin: "Open source",
    category: "SDK for ALAT Pay (Wema Bank)",
    summary:
      "A typed, tested Java SDK for ALAT Pay payment integration, documented end to end.",
    impact:
      "Built on a shared HTTP client with Jackson deserialisation and a typed exception hierarchy. Ships with full Javadoc, a README, a CHANGELOG and an MIT licence.",
    theme: "pink",
    file: "alatpay-java-sdk",
    note: "MIT licence",
    facts: [
      ["Errors", "Typed exception hierarchy"],
      ["JSON", "Jackson deserialisation"],
      ["Tests", "JUnit 5 with MockWebServer"],
      ["CI", "GitHub Actions, pinned Surefire"],
    ],
    tags: ["Java", "Jackson", "JUnit 5", "MockWebServer"],
    links: [{ label: "Code", href: repo("alatpay-java-sdk"), icon: "code" }],
  },
  {
    id: "multi-gateway-java",
    title: "Multi-Gateway Java SDK",
    origin: "Open source",
    category: "One interface for four payment providers",
    summary:
      "Paystack, Flutterwave, Monnify and Interswitch behind a single PaymentGateway interface.",
    impact:
      "Amounts are normalised from major to minor units and webhook signatures are verified, so each provider’s quirks stay inside the SDK.",
    theme: "mint",
    file: "multi-gateway-java",
    note: "4 providers",
    facts: [
      ["Interface", "A single PaymentGateway"],
      ["Amounts", "Major to minor unit normalisation"],
      ["Webhooks", "Signature verification"],
      ["Checks", "23 MockWebServer tests, CI on Java 17 and 21"],
    ],
    tags: ["Java", "MockWebServer", "GitHub Actions"],
    links: [{ label: "Code", href: repo("multi-gateway-java"), icon: "code" }],
  },
  {
    id: "sec-triage",
    title: "sec-triage",
    origin: "Open source",
    category: "Defensive log-triage CLI",
    summary:
      "An offline Python CLI for first-pass triage of web and SSH logs, using only the standard library.",
    impact:
      "Point it at a log and it flags the patterns worth a human look first: repeated auth denials, SSH password guessing, sensitive-path probes and 404 bursts.",
    theme: "paper",
    file: "sec-triage",
    note: "stdlib only",
    facts: [
      ["Parses", "Apache/Nginx, JSON-lines, SSH auth"],
      ["Flags", "Auth denials, password guessing, path probes, 404 bursts"],
      ["Runs", "Offline, standard library only"],
      ["Checks", "25 tests, CI on Python 3.9 to 3.12"],
    ],
    tags: ["Python", "Log analysis", "Threat detection"],
    links: [{ label: "Code", href: repo("sec-triage"), icon: "code" }],
  },
];

const stack: { group: string; tone: string; items: string[] }[] = [
  { group: "Languages", tone: "butter", items: ["Java", "Python", "TypeScript", "PHP", "C++", "SQL"] },
  { group: "Frontend", tone: "sky", items: ["React", "Vite", "Tailwind CSS"] },
  { group: "Backend and APIs", tone: "rose", items: ["FastAPI", "REST APIs", "SDK development", "Jackson"] },
  { group: "AI and LLMs", tone: "mint", items: ["Llama 3.3", "Groq API", "Gemini", "Prompt engineering"] },
  {
    group: "Security",
    tone: "butter",
    items: ["Splunk SIEM", "IDS/IPS", "Threat hunting", "MITRE ATT&CK", "NIST", "Bug bounty"],
  },
  {
    group: "Testing, CI and deploy",
    tone: "sky",
    items: ["JUnit 5", "Pytest", "MockWebServer", "GitHub Actions", "Maven", "Git", "Render", "Vercel", "Netlify"],
  },
];

const buttonToneFor = (theme: Theme) => (theme === "ink" || theme === "paper" ? "yellow" : "ink");

function ProjectSpec({ project }: { project: Project }) {
  return (
    <div className="spec">
      <div className="spec-bar" aria-hidden="true">
        <span />
        <span />
        <span />
        <b>{project.file}</b>
      </div>
      <dl className="spec-body">
        {project.facts.map(([label, value]) => (
          <div className="spec-row" key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <span className="spec-note">{project.note}</span>
    </div>
  );
}

export default function Home() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!activeProject) return;
    closeButtonRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveProject(null);
      if (event.key === "Tab" && modalRef.current) {
        const controls = modalRef.current.querySelectorAll<HTMLElement>(
          'button, a[href], [tabindex]:not([tabindex="-1"])',
        );
        if (!controls.length) return;
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.classList.add("modal-open");
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("modal-open");
      lastTriggerRef.current?.focus();
    };
  }, [activeProject]);

  const openProject = (project: Project, event: MouseEvent<HTMLElement>) => {
    lastTriggerRef.current = event.currentTarget;
    setActiveProject(project);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="paper-site" id="home">
      <header className="site-header">
        <a className="brand-lockup" href="#home" aria-label="xayen home" onClick={closeMenu}>
          <span className="brand-mark"><img src="/images/xayen-mark.webp" alt="Portrait of xayen"/></span>
          <span className="brand-name">xayen<span>✳</span></span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>

        <nav id="main-navigation" className={`main-nav${menuOpen ? " is-open" : ""}`} aria-label="Main navigation">
          <a className="nav-link nav-home" href="#home" onClick={closeMenu}><span className="nav-glyph">✳</span> home</a>
          <a className="nav-link" href="#about" onClick={closeMenu}><span className="nav-glyph">▦</span> about</a>
          <a className="nav-link" href="#projects" onClick={closeMenu}><span className="nav-glyph">▣</span> projects</a>
          <a className="nav-link" href="#stack" onClick={closeMenu}><span className="nav-glyph">▸</span> stack</a>
        </nav>

        <div className="header-right">
          <div className="orbit-dots" aria-hidden="true"><span>✳</span><span>◉</span><span>✦</span></div>
          <PopButton href="#contact" tone="paper" size="sm" onClick={closeMenu}>Contact</PopButton>
        </div>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-note hero-note--mint">cybersecurity analyst <Asterisk size={15} /></div>
          <div className="hero-note hero-note--butter">sdk author <Sparkles size={14} /></div>
          <div className="hero-intro">hey, I’m <span className="intro-underline" /></div>
          <div className="wordmark-frame">
            <span className="wordmark-spark wordmark-spark--left">✳</span>
            <h1 id="hero-title" className="wordmark">xayen</h1>
            <span className="wordmark-spark wordmark-spark--right">✳</span>
          </div>
          <p className="availability"><span className="availability-dot" /> Open to global remote roles</p>
          <p className="hero-statement">
            I build secure software,<br className="desktop-break" /> SDKs and AI tooling. <span className="statement-marker">✿</span>
          </p>
          <div className="hero-actions">
            <PopButton href="#projects" icon={<ArrowDown size={17} strokeWidth={2.6} />}>See the projects</PopButton>
            <PopButton href={CV} download tone="paper" icon={<Download size={16} strokeWidth={2.6} />}>Get my CV</PopButton>
          </div>
          <div className="hero-doodle hero-doodle--left" aria-hidden="true"><span>✳</span><i /></div>
          <div className="hero-doodle hero-doodle--right" aria-hidden="true"><span>✿</span><i /></div>
        </section>

        <section className="about-section section-rule" id="about" aria-labelledby="about-title">
          <div className="section-kicker"><span>about</span><i /></div>
          <div className="about-heading-row">
            <span className="handwritten">the short intro</span>
            <h2 id="about-title">who’s behind this<span className="heading-period">?</span></h2>
            <span className="tiny-stamp"><Asterisk size={20} /></span>
          </div>

          <div className="about-layout">
            <div className="portrait-wrap">
              <span className="tape tape--blue" />
              <span className="tape tape--cream" />
              <figure className="portrait-card">
               <img src="/images/portrait.png" alt="Portrait of xayen" />
                <figcaption><span>Ekundayo Oyinkansola</span><span>✳</span></figcaption>
              </figure>
              <span className="portrait-caption">nice to meet you! <span>↗</span></span>
            </div>

            <div className="about-copy">
              <p className="bio-lede">I’m a cybersecurity analyst and full-stack developer.</p>
              <p className="bio-detail"><span className="bio-spark">✦</span> I build detection tools, payment SDKs and AI dashboards, and I put tests and CI on all of them.</p>
              <p className="bio-detail bio-detail--last">I’m also the founder of <a className="underlined-word" href="https://agendax.com.ng" target="_blank" rel="noopener noreferrer">Agenda X</a>, where I’m building Triage Engine.</p>
              <div className="signature">xayen <span>♥</span></div>
            </div>

            <aside className="facts-wrap" aria-label="Quick facts">
              <span className="preview-pin">✦</span>
              <dl className="facts">
                <div><dt>Based in</dt><dd>Nigeria, remote-first (GMT+1)</dd></div>
                <div><dt>Open to</dt><dd>Global remote roles</dd></div>
                <div><dt>Founder of</dt><dd>Agenda X</dd></div>
              </dl>
              <span className="preview-caption">the quick version</span>
            </aside>
          </div>
        </section>

        <section className="projects-section section-rule" id="projects" aria-labelledby="projects-title">
          <div className="section-kicker"><span>projects</span><i /></div>
          <div className="projects-heading-row">
            <div><span className="handwritten">built, tested, shipped</span><h2 id="projects-title">things I’ve made<span className="heading-period">.</span></h2></div>
            <p>Five open-source repos and<br />one product, all with CI.</p>
          </div>
          <div className="project-stack">
            {projects.map((project, index) => (
              <article className={`project-card theme-${project.theme}`} key={project.id} style={{ zIndex: index + 1 }}>
                <div className="project-tab"><span className="tab-dot">✦</span> {project.origin}</div>
                <div className="project-card-content">
                  <div className="project-copy">
                    <span className="project-category">{project.category}</span>
                    <h3>{project.title}<span className="project-title-dot">.</span></h3>
                    <p>{project.summary}</p>
                    <div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                    <PopButton tone={buttonToneFor(project.theme)} size="sm" icon={<ArrowRight size={14} strokeWidth={2.6} />} onClick={(event) => openProject(project, event)}>
                      Peek inside
                    </PopButton>
                  </div>
                  <ProjectSpec project={project} />
                </div>
              </article>
            ))}
          </div>
          <div className="projects-endnote">
            <span className="handwritten">that’s the short list. the rest is on my CV.</span>
            <PopButton href={CV} download tone="paper" size="sm" icon={<Download size={14} strokeWidth={2.6} />}>Get my CV</PopButton>
          </div>
        </section>

        <section className="stack-section section-rule" id="stack" aria-labelledby="stack-title">
          <div className="section-kicker"><span>stack</span><i /></div>
          <div className="projects-heading-row">
            <div><span className="handwritten">what I reach for</span><h2 id="stack-title">my stack<span className="heading-period">.</span></h2></div>
            <p>The tools behind the<br />projects above.</p>
          </div>
          <div className="stack-grid">
            {stack.map(({ group, tone, items }) => (
              <section className={`stack-card stack-card--${tone}`} key={group} aria-label={group}>
                <h3>{group}</h3>
                <ul className="chips">
                  {items.map((item) => <li className="chip" key={item}>{item}</li>)}
                </ul>
              </section>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <span className="contact-eyebrow"><span className="availability-dot" /> Open to global remote roles</span>
          <h2 id="contact-title">Let’s build<br className="mobile-only" /> something.</h2>
          <p>Hiring, or got a security or API problem? Send it over.</p>
          <div className="contact-actions">
            <PopButton href={`mailto:${EMAIL}`} icon={<Mail size={16} strokeWidth={2.6} />}>Email me</PopButton>
            <PopButton href={GITHUB} external tone="paper" icon={<Github size={16} strokeWidth={2.6} />}>GitHub</PopButton>
            <PopButton href={CV} download tone="pink" icon={<Download size={16} strokeWidth={2.6} />}>Get my CV</PopButton>
          </div>
          <span className="contact-flower contact-flower--one">✿</span>
          <span className="contact-flower contact-flower--two">✳</span>
          <span className="contact-scribble">say hi <ArrowRight size={14} /></span>
        </section>
      </main>

      <footer className="site-footer">
        <a className="footer-brand" href="#home"><span className="footer-mark"><img src="/images/xayen-mark.webp" alt="" /></span> xayen<span className="footer-dot">.</span></a>
        <span className="footer-note">designed and built by Ekundayo Oyinkansola</span>
        <PopButton href="#home" tone="paper" size="sm" icon={<ArrowDown size={14} strokeWidth={2.6} style={{ transform: "rotate(180deg)" }} />}>Back to top</PopButton>
        <span className="footer-year">© 2026 xayen</span>
      </footer>

      {activeProject && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setActiveProject(null)}>
          <div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" ref={modalRef}>
            <button className="modal-close" ref={closeButtonRef} type="button" onClick={() => setActiveProject(null)} aria-label="Close project details"><X size={19} /></button>
            <span className="modal-kicker">{activeProject.category}</span>
            <h2 id="modal-title">{activeProject.title}<span>.</span></h2>
            <p className="modal-summary">{activeProject.summary}</p>
            <div className={`modal-art theme-${activeProject.theme}`}><ProjectSpec project={activeProject} /></div>
            <p className="modal-impact">{activeProject.impact}</p>
            <div className="modal-tags">{activeProject.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            <div className="modal-links">
              {activeProject.links.map((link) => (
                <PopButton
                  key={link.href}
                  href={link.href}
                  external
                  size="sm"
                  tone={link.icon === "code" ? "ink" : "yellow"}
                  icon={link.icon === "code" ? <Github size={14} strokeWidth={2.6} /> : undefined}
                >
                  {link.label}
                </PopButton>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
