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

function ProjectVisual({ project }: { project: Project }) {
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
              <ProjectVisual project={project} />
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
    </main>
  )
}

export default App
