import { useEffect, useState } from 'react'
import {
  ArrowDownRight,
  ArrowUpRight,
  BadgeCheck,
  Braces,
  Code2,
  Layers3,
  Mail,
  Menu,
  MoveRight,
  Sparkles,
  X,
} from 'lucide-react'
import './App.css'

type Project = {
  title: string
  label: string
  category: 'Systems' | 'Product'
  description: string
  technologies: string[]
  href: string
  visual: 'firelink' | 'companion' | 'lifexp'
}

const projects: Project[] = [
  {
    title: 'Firelink',
    label: 'Desktop application',
    category: 'Systems',
    description:
      'A focused download manager that brings high-performance transfers, media extraction, and resilient scheduling into one native desktop experience.',
    technologies: ['Rust', 'Tauri', 'React', 'TypeScript'],
    href: 'https://github.com/nimbold/Firelink',
    visual: 'firelink',
  },
  {
    title: 'Firelink Companion',
    label: 'Browser extension',
    category: 'Systems',
    description:
      'A security-conscious browser bridge that hands downloads and explicit media requests to Firelink through an authenticated local connection.',
    technologies: ['WebExtensions', 'JavaScript', 'Manifest V3'],
    href: 'https://github.com/nimbold/Firelink-Extension',
    visual: 'companion',
  },
  {
    title: 'LifeXP',
    label: 'Personal product',
    category: 'Product',
    description:
      'A gamified task tracker where everyday quests turn into experience, attributes, trophies, and a personal activity chronicle.',
    technologies: ['Python', 'Tkinter', 'SQLite'],
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

function ProjectVisual({ visual }: { visual: Project['visual'] }) {
  if (visual === 'firelink') {
    return (
      <div className="project-visual firelink-visual" aria-hidden="true">
        <div className="download-orbit orbit-one" />
        <div className="download-orbit orbit-two" />
        <div className="download-core"><ArrowDownRight size={38} strokeWidth={1.4} /></div>
        <span className="visual-label">TRANSFER ENGINE</span>
        <span className="visual-stat">12.8 <small>MB/s</small></span>
      </div>
    )
  }

  if (visual === 'companion') {
    return (
      <div className="project-visual companion-visual" aria-hidden="true">
        <div className="browser-panel">
          <div className="browser-dots"><i /><i /><i /></div>
          <div className="browser-address" />
          <div className="extension-chip"><Sparkles size={16} /> LINKED</div>
          <div className="browser-lines"><span /><span /><span /></div>
        </div>
        <div className="secure-path"><i /><i /><i /><i /><i /></div>
        <span className="visual-label">LOCAL / VERIFIED</span>
      </div>
    )
  }

  return (
    <div className="project-visual lifexp-visual" aria-hidden="true">
      <div className="xp-window">
        <div className="xp-heading"><span>LVL</span><strong>24</strong><BadgeCheck size={18} /></div>
        <div className="xp-bar"><span /></div>
        <div className="xp-stats"><b>STR <em>08</em></b><b>FOC <em>14</em></b><b>WIS <em>11</em></b></div>
      </div>
      <div className="xp-spark spark-one">✦</div><div className="xp-spark spark-two">✧</div>
      <span className="visual-label">DAILY QUEST LOG</span>
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
        <a className="brand" href="#top" aria-label="Nimbold home">N<span>°</span></a>
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
              <ProjectVisual visual={project.visual} />
              <div className="project-content">
                <div className="project-topline"><span>{project.label}</span><span>{String(index + 1).padStart(2, '0')}</span></div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
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
          <p className="large-copy">I’m an independent developer focused on making software that feels clear, calm, and capable. From native desktop tools to browser extensions, I care about the full path from a small interaction to a dependable system.</p>
          <p>My work is guided by a simple belief: the best tools earn their place by making a difficult thing feel obvious.</p>
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
          <span className="contact-placeholder"><Mail size={17} /> Email details coming soon</span>
        </div>
      </section>

      <footer>
        <a className="brand" href="#top">N<span>°</span></a>
        <p>© {new Date().getFullYear()} Nimbold. Built with focus.</p>
        <a href="#top">Back to top <ArrowUpRight size={14} /></a>
      </footer>
    </main>
  )
}

export default App
