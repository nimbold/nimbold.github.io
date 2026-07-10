import { useEffect, useState } from 'react'
import {
  ArrowDownRight,
  ArrowUpRight,
  Braces,
  Code2,
  Layers3,
  Mail,
  Menu,
  MoveRight,
  Sparkles,
  Moon,
  Sun,
  X,
} from 'lucide-react'
import './App.css'

import firelinkDark from '../Screenshots/Firelink-Dark.png'
import firelinkLight from '../Screenshots/Firelink-Light.png'
import companionDark from '../Screenshots/Firelink-Extension-dark.jpg'
import companionLight from '../Screenshots/Firelink-Extension-Light.jpg'
import lifeXpDark from '../Screenshots/LifeXP-Dark.png'
import lifeXpLight from '../Screenshots/LifeXP-Light.png'

type Project = {
  title: string
  label: string
  category: 'Systems' | 'Product'
  description: string
  technologies: string[]
  highlights: string[]
  preview: {
    overview: string
    features: string[]
    facts: { label: string; value: string }[]
  }
  href: string
  visual: 'firelink' | 'companion' | 'lifexp'
}

const projects: Project[] = [
  {
    title: 'Firelink',
    label: 'Desktop application',
    category: 'Systems',
    description:
      'A cross-platform native download manager for fast transfers, media capture, scheduling, and browser-to-desktop handoff.',
    technologies: ['Rust', 'Tauri', 'React', 'TypeScript', 'SQLite'],
    highlights: ['Segmented aria2 transfers', 'yt-dlp and FFmpeg media flows', 'Persistent queues and scheduling'],
    preview: {
      overview: 'A fast, focused desktop download manager for macOS, Windows, and Linux. Firelink combines a native Rust and Tauri backend with a React interface to make transfers, media extraction, queues, and file placement feel deliberate.',
      features: [
        'Segmented aria2 transfers with retries, connection controls, and speed limits.',
        'yt-dlp, FFmpeg, and Deno-powered media downloads with live progress and ETA.',
        'Persistent queues, scheduling rules, bulk actions, and per-download placement.',
        'Secure browser handoff with pairing, signed local requests, and Add-window review.',
      ],
      facts: [
        { label: 'Platforms', value: 'macOS · Windows · Linux' },
        { label: 'Architecture', value: 'Rust + Tauri' },
        { label: 'Storage', value: 'SQLite' },
      ],
    },
    href: 'https://github.com/nimbold/Firelink',
    visual: 'firelink',
  },
  {
    title: 'Firelink Companion',
    label: 'Browser extension',
    category: 'Systems',
    description:
      'The secure browser companion for Firelink, turning browser downloads, selected links, and media requests into reviewed desktop tasks.',
    technologies: ['WebExtensions', 'JavaScript', 'Manifest V3', 'HMAC-SHA256'],
    highlights: ['Firefox and Chromium support', 'Authenticated localhost handoff', 'Safe browser-download fallback'],
    preview: {
      overview: 'The browser bridge for Firelink. It turns browser downloads, selected links, and explicit media requests into reviewed desktop tasks while keeping control in the browser when Firelink cannot accept a handoff.',
      features: [
        'Captures ordinary downloads, selected links, and explicit media-fetch requests.',
        'Supports Firefox and Chromium browsers through a Manifest V3 extension.',
        'Signs local requests with HMAC-SHA256 and verifies the desktop app before trust.',
        'Falls back safely to the browser download when Firelink is closed or declines a request.',
      ],
      facts: [
        { label: 'Browsers', value: 'Firefox + Chromium' },
        { label: 'Protocol', value: 'Signed localhost handoff' },
        { label: 'Privacy', value: 'No remote service' },
      ],
    },
    href: 'https://github.com/nimbold/Firelink-Extension',
    visual: 'companion',
  },
  {
    title: 'LifeXP',
    label: 'Personal product',
    category: 'Product',
    description:
      'A lightweight desktop productivity tool that gives everyday tasks an RPG-style loop of quests, XP, attributes, and milestones.',
    technologies: ['Python', 'Tkinter', 'JSON persistence'],
    highlights: ['Five core character attributes', 'Trophies and level milestones', 'Daily, weekly, and monthly chronicles'],
    preview: {
      overview: 'A lightweight desktop productivity application that turns everyday tasks into an RPG-style character progression loop. Complete quests, gain XP, grow attributes, unlock trophies, and look back on consistent effort.',
      features: [
        'Links quests to Strength, Agility, Intelligence, Charisma, and Vitality.',
        'Lets you batch add, edit, complete, or abandon active quests.',
        'Unlocks trophies at levels 5, 10, 25, 50, and 100.',
        'Visualizes daily, weekly, and monthly activity through chronicles.',
      ],
      facts: [
        { label: 'Runtime', value: 'Python + Tkinter' },
        { label: 'State', value: 'Local JSON persistence' },
        { label: 'Style', value: 'Customizable themes' },
      ],
    },
    href: 'https://github.com/nimbold/LifeXP',
    visual: 'lifexp',
  },
]

const navigation = [
  ['Work', '#work'],
  ['About', '#about'],
  ['Notes', '#notes'],
  ['Contact', '#contact'],
]

const projectScreenshots = {
  firelink: { dark: firelinkDark, light: firelinkLight },
  companion: { dark: companionDark, light: companionLight },
  lifexp: { dark: lifeXpDark, light: lifeXpLight },
} as const

function ProjectVisual({ project, onPreview }: { project: Project; onPreview: () => void }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const image = projectScreenshots[project.visual][theme]

  return (
    <div className={`project-visual screenshot-visual ${theme === 'light' ? 'is-light' : ''}`}>
      <img
        className="project-screenshot"
        key={image}
        src={image}
        alt={`${project.title} in ${theme} theme`}
      />
      <div className="screenshot-shade" aria-hidden="true" />
      <div className="screenshot-meta" aria-hidden="true">
        <span>Product preview</span>
        <span>{theme} theme</span>
      </div>
      <button className="preview-trigger" type="button" onClick={onPreview}>
        Quick preview <ArrowUpRight size={16} />
      </button>
      <div className="theme-switch" role="group" aria-label={`${project.title} preview theme`}>
        <button
          className={theme === 'dark' ? 'active' : ''}
          type="button"
          onClick={() => setTheme('dark')}
          aria-label={`Show ${project.title} in dark theme`}
          aria-pressed={theme === 'dark'}
        >
          <Moon size={13} fill="currentColor" />
        </button>
        <button
          className={theme === 'light' ? 'active' : ''}
          type="button"
          onClick={() => setTheme('light')}
          aria-label={`Show ${project.title} in light theme`}
          aria-pressed={theme === 'light'}
        >
          <Sun size={14} />
        </button>
      </div>
    </div>
  )
}

function App() {
  const [filter, setFilter] = useState<'All' | Project['category']>('All')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [previewProject, setPreviewProject] = useState<Project | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!previewProject) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPreviewProject(null)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [previewProject])

  const visibleProjects = filter === 'All' ? projects : projects.filter((project) => project.category === filter)

  return (
    <main>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <a className="brand" href="#top" aria-label="NimBold home">N<span>°</span></a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map(([name, href]) => <a key={name} href={href}>{name}</a>)}
        </nav>
        <a className="availability" href="#contact"><i /> Available for select work</a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`}>
          {navigation.map(([name, href]) => <a key={name} href={href} onClick={() => setMenuOpen(false)}>{name}</a>)}
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-glow glow-one" /><div className="hero-glow glow-two" />
        <div className="hero-copy reveal">
          <p className="eyebrow"><span /> Independent developer · Iran</p>
          <h1>Building quiet,<br /><em>useful</em> software.</h1>
          <p className="hero-summary">I design and build thoughtful tools at the intersection of product craft, dependable systems, and everyday life.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">Explore selected work <MoveRight size={18} /></a>
            <a className="text-link" href="https://github.com/nimbold" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={15} /></a>
          </div>
        </div>
        <div className="hero-art reveal-delay" aria-hidden="true">
          <div className="art-frame">
            <span className="art-index">01 / 03</span>
            <div className="art-line line-a" /><div className="art-line line-b" /><div className="art-line line-c" />
            <div className="art-mark">N</div>
            <span className="art-caption">DESIGNING FOR<br />MOMENTUM</span>
          </div>
        </div>
        <a className="scroll-cue" href="#work"><span>Scroll to explore</span><ArrowDownRight size={17} /></a>
      </section>

      <section className="work section" id="work">
        <div className="section-heading">
          <div><p className="eyebrow"><span /> Selected work</p><h2>Things I’ve made<br />with care.</h2></div>
          <div className="project-filter" role="tablist" aria-label="Filter projects">
            {(['All', 'Systems', 'Product'] as const).map((item) => (
              <button key={item} onClick={() => setFilter(item)} className={filter === item ? 'active' : ''} role="tab" aria-selected={filter === item}>{item}</button>
            ))}
          </div>
        </div>
        <div className="project-grid">
          {visibleProjects.map((project, index) => (
            <article className={`project-card project-${project.visual}`} key={project.title} style={{ '--delay': `${index * 85}ms` } as React.CSSProperties}>
              <ProjectVisual project={project} onPreview={() => setPreviewProject(project)} />
              <div className="project-content">
                <div className="project-topline"><span>{project.label}</span><span>{String(index + 1).padStart(2, '0')}</span></div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <ul className="project-highlights" aria-label={`${project.title} highlights`}>
                  {project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                </ul>
                <div className="project-footer">
                  <ul>{project.technologies.map((tech) => <li key={tech}>{tech}</li>)}</ul>
                  <a className="round-link" href={project.href} target="_blank" rel="noreferrer" aria-label={`View ${project.title} on GitHub`}><ArrowUpRight size={18} /></a>
                </div>
              </div>
            </article>
          ))}
        </div>
        <a className="all-projects" href="https://github.com/nimbold?tab=repositories" target="_blank" rel="noreferrer">View all repositories <ArrowUpRight size={17} /></a>
      </section>

      <section className="about section" id="about">
        <div className="about-intro"><p className="eyebrow"><span /> A little about me</p><h2>Curious by default.<br /><em>Intentional</em> in detail.</h2></div>
        <div className="about-copy">
          <p className="large-copy">I’m an independent developer focused on making software that feels clear, calm, and capable. My current work ranges from native Rust and Tauri applications to secure browser integrations and focused Python desktop products.</p>
          <p>Across every project, I care about the full path from a small interaction to a dependable system: the interface, state, storage, security boundaries, packaging, and the details people feel.</p>
          <a className="text-link" href="#contact">Let’s work together <ArrowDownRight size={16} /></a>
        </div>
        <div className="capabilities">
          <div><Code2 size={21} /><h3>Product engineering</h3><p>From first idea to a polished, usable release.</p></div>
          <div><Layers3 size={21} /><h3>Desktop & web</h3><p>Thoughtful interfaces that connect to robust native systems.</p></div>
          <div><Braces size={21} /><h3>Systems thinking</h3><p>Secure integrations, clear states, and reliable behavior.</p></div>
        </div>
      </section>

      <section className="experience section">
        <div className="section-heading compact"><div><p className="eyebrow"><span /> Experience</p><h2>The path so far.</h2></div><p className="section-note">A fuller work history is being prepared.</p></div>
        <div className="timeline placeholder-block">
          <div><span>Now</span><b>Independent developer</b><em>Building and shipping personal software products.</em></div>
          <div><span>Next</span><b>Your next collaboration</b><em>Open to the right product or engineering challenge.</em></div>
        </div>
      </section>

      <section className="notes section" id="notes">
        <div><p className="eyebrow"><span /> Notes & writing</p><h2>Ideas worth<br />keeping close.</h2></div>
        <div className="notes-empty"><Sparkles size={25} /><h3>Writing is coming soon.</h3><p>Notes on building products, software craft, and the occasional thing I’ve learned the hard way.</p><span>IN THE WORKS</span></div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-orb" />
        <p className="eyebrow"><span /> Get in touch</p>
        <h2>Have a thoughtful<br />idea in mind?</h2>
        <p>I’m open to select collaborations and interesting conversations.</p>
        <div className="contact-actions">
          <a className="button button-light" href="https://github.com/nimbold" target="_blank" rel="noreferrer"><Code2 size={18} /> Find me on GitHub</a>
          <a className="contact-email" href="mailto:nimbold.io@gmail.com"><Mail size={17} /> nimbold.io@gmail.com</a>
        </div>
      </section>

      <footer>
        <a className="brand" href="#top">N<span>°</span></a>
        <p>© {new Date().getFullYear()} NimBold. Built with focus.</p>
        <a href="#top">Back to top <ArrowUpRight size={14} /></a>
      </footer>

      {previewProject && (
        <div className="preview-backdrop" onClick={(event) => { if (event.target === event.currentTarget) setPreviewProject(null) }}>
          <section className="project-preview" role="dialog" aria-modal="true" aria-labelledby="preview-title">
            <button className="preview-close" type="button" onClick={() => setPreviewProject(null)} aria-label="Close project preview" autoFocus><X size={20} /></button>
            <p className="eyebrow"><span /> {previewProject.label}</p>
            <div className="preview-heading">
              <div>
                <h2 id="preview-title">{previewProject.title}</h2>
                <p>{previewProject.preview.overview}</p>
              </div>
              <a className="button button-primary" href={previewProject.href} target="_blank" rel="noreferrer">View source <ArrowUpRight size={17} /></a>
            </div>
            <div className="preview-details">
              <div>
                <p className="preview-label">What it brings</p>
                <ul className="preview-features">
                  {previewProject.preview.features.map((feature) => <li key={feature}>{feature}</li>)}
                </ul>
              </div>
              <dl className="preview-facts">
                {previewProject.preview.facts.map((fact) => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}
              </dl>
            </div>
            <div className="preview-tech"><span>Built with</span><ul>{previewProject.technologies.map((tech) => <li key={tech}>{tech}</li>)}</ul></div>
          </section>
        </div>
      )}
    </main>
  )
}

export default App
