import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowDownRight,
  ArrowUpRight,
  Braces,
  Code2,
  Clock3,
  Layers3,
  Mail,
  Menu,
  MoveRight,
  Moon,
  Search,
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

type TilSection = {
  heading: string
  paragraphs: string[]
  bullets?: string[]
  steps?: string[]
  code?: string
  quotes?: string[]
  callouts?: { label: string; text: string }[]
}

type TilPost = {
  id: string
  date: string
  displayDate: string
  title: string
  summary: string
  readTime: string
  tags: string[]
  contextLabel: string
  sections: TilSection[]
}

const tilPosts: TilPost[] = [
  {
    id: 'review-behavior-not-commits',
    date: '2026-07-14',
    displayDate: '14 Jul 2026',
    title: 'TIL: A good review follows behavior, not just commits.',
    summary: 'While working on Firelink, I learned that trustworthy review starts with behavior and invariants: map the blast radius, verify platform claims, consult narrowly, and fix only evidence-backed failures.',
    readTime: '7 min read',
    tags: ['Firelink', 'Code Review', 'Dependencies', 'Security'],
    contextLabel: 'Firelink · review practice',
    sections: [
      {
        heading: 'Programmer’s mindset',
        paragraphs: ['The most useful shift was treating review as an investigation into behavior, not a ceremony around commits.'],
        bullets: [
          '“Review the commits” can mean reviewing the actual code changes, not just Git history. Clarify the scope early and inspect the last behavioral changes, especially when the current diff is only dependency metadata.',
          'Dependency updates are runtime changes. Their blast radius includes direct APIs and feature flags, transitive crates and packages, lockfiles, compiler behavior, packaging and sidecars, OS-specific implementations, concurrency, and security behavior.',
          'A lockfile is part of the product. Updating Cargo.toml or package.json without understanding lockfile removals and additions can hide meaningful behavior changes.',
          '“Works on my machine” is narrower than “cross-platform works.” Local macOS tests proved host compatibility, but missing Windows MSVC and Linux GTK/WebKit environments prevented true cross-target compilation.',
          'Worst-case review should follow state transitions, not just functions. Ask what happens if completion races with pause, a stale event arrives after retry, a process exits while a file is locked, a redirect crosses hosts, an old extension sends unsafe data, or an RPC result is ambiguous.',
          'Security boundaries should be enforced at multiple layers. Media cookies were filtered in the desktop server and guarded again before metadata handling; defense in depth makes old clients less dangerous.',
          '“No bug found” is a valid engineering result. Do not add speculative retries or behavior changes merely because an unusual scenario can be imagined. Require evidence, a violated invariant, or a reproducible failure.',
          'Tests should mirror failure modes. The queue tests were valuable because they covered stale events, duplicate terminal events, late GIDs, permit leaks, retry races, and lifecycle epochs.',
          'An issue reference should be truthful. When no dependency-specific issue existed, using “Refs #16” was safer than falsely claiming the dependency update fixed or closed that issue.',
        ],
      },
      {
        heading: 'Guiding LLMs effectively',
        paragraphs: ['The model became more useful when the task was framed as an evidence-gathering workflow with explicit boundaries.'],
        callouts: [
          { label: 'Scope', text: 'Review behavioral code changes, not only Git commits. Include normal usage, worst-case scenarios, races, security boundaries, and cross-platform behavior.' },
          { label: 'Investigation', text: 'First inspect the live repository, issue history, tests, and actual runtime paths. Do not rely on summaries or assumptions. Report findings before editing.' },
          { label: 'Decision standard', text: 'Only fix issues supported by code evidence, tests, logs, or a reproducible failure. Do not add speculative retries, fallbacks, or compatibility hacks.' },
          { label: 'Second opinions', text: 'Scan only these files and this diff. Do not edit, commit, push, or inspect secrets. Return each finding with severity, affected path, reasoning, and evidence.' },
          { label: 'Untrusted output', text: 'Treat the consultant’s findings as untrusted hypotheses. Verify every actionable claim against the live code and tests before changing anything.' },
          { label: 'Blast radius', text: 'For every proposed update, identify direct API changes, transitive dependency changes, platform-specific behavior, packaging impact, security implications, and race-condition risks.' },
          { label: 'Validation', text: 'Report separately: unit tests, integration tests, build checks, packaging checks, security checks, and cross-platform checks. Do not call host-only validation cross-platform validation.' },
          { label: 'Git', text: 'Stage only these files, use a Conventional Commit, mention issue #N without falsely closing it, push directly to origin main, then verify local and remote hashes.' },
          { label: 'Negative evidence', text: 'State what you inspected, what failure modes were considered, what was not reproducible, and why no code change is justified.' },
        ],
      },
      {
        heading: 'The pattern',
        paragraphs: ['The strongest pattern is:'],
        quotes: ['Investigate → map invariants and blast radius → consult narrowly → verify independently → fix root causes only → run targeted and broad tests → publish narrowly → verify the remote result.'],
      },
    ],
  },
  {
    id: 'ready-is-a-safety-boundary',
    date: '2026-07-16',
    displayDate: '16 Jul 2026',
    title: 'TIL: “Ready” is a safety boundary, not a loading flag.',
    summary: 'A Keychain prompt race taught me that frontend readiness is a contract between the backend, UI, browser extension, clipboard, and operating system.',
    readTime: '3 min read',
    tags: ['Firelink', 'Backend', 'Frontend', 'Async Systems'],
    contextLabel: 'Firelink · lifecycle design',
    sections: [
      {
        heading: 'The real bug',
        paragraphs: [
          'The bug looked like a modal-rendering problem: macOS showed its Keychain prompt before Firelink showed its explanation.',
          'The actual issue was that several independent systems could trigger actions while startup was still in progress.',
        ],
        bullets: [
          'React being mounted does not mean the application is ready.',
          'Async callbacks may still use stale state.',
          'Operating-system prompts need an explicit consent boundary.',
          'Backend events must not bypass frontend readiness.',
        ],
      },
      {
        heading: 'The fix',
        paragraphs: ['We defined readiness as a real cross-layer contract:'],
        code: 'frontendMayAcceptInput = coreReady && !showKeychainModal',
        callouts: [
          { label: 'Backend', text: 'Buffer deep links and return retryable responses for extension requests while blocked.' },
          { label: 'Frontend', text: 'Check current state when events arrive, not only captured React state.' },
          { label: 'Lifecycle', text: 'Serialize readiness changes so cleanup cannot race initialization.' },
          { label: 'Identity', text: 'Use the build revision, not only the semantic version, for consent migrations.' },
        ],
      },
      {
        heading: 'The programmer’s checklist',
        paragraphs: ['When debugging a similar issue:'],
        steps: [
          'List every event producer and consumer.',
          'Define the state required before each side effect is allowed.',
          'Test events before readiness, during modals, after cleanup, and after retries.',
          'Make stale, duplicate, and late events harmless.',
          'Verify new changes do not bypass previously hardened guards.',
        ],
      },
      {
        heading: 'The pattern',
        paragraphs: ['The lesson is simple:'],
        quotes: ['Trace the event timeline → define the lifecycle contract → gate side effects → test the worst race.'],
      },
    ],
  },
]

const orderedTilPosts = [...tilPosts].sort((left, right) => right.date.localeCompare(left.date))

type NavigationItem = { name: string; href: string }

const navigation: NavigationItem[] = [
  { name: 'Work', href: '/#work' },
  { name: 'About', href: '/#about' },
  { name: 'Socials', href: '/#socials' },
  { name: 'TIL', href: '/til' },
  { name: 'Contact', href: '/#contact' },
]

type Route =
  | { type: 'home' }
  | { type: 'til-index' }
  | { type: 'til-post'; id: string }

function getRoute(pathname: string): Route {
  const normalizedPath = pathname.replace(/\/+$/, '') || '/'

  if (normalizedPath === '/til') return { type: 'til-index' }
  if (normalizedPath.startsWith('/til/')) {
    return { type: 'til-post', id: decodeURIComponent(normalizedPath.slice('/til/'.length)) }
  }

  return { type: 'home' }
}

type Theme = 'light' | 'dark'

// Explicit toggle choices are stored separately from the legacy key so existing
// visitors fall back to their browser/system preference after this update.
const themeStorageKey = 'nimbold-theme-override'

function readStoredTheme(): Theme | null {
  if (typeof window === 'undefined') return null

  try {
    const storedTheme = window.localStorage.getItem(themeStorageKey)
    return storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : null
  } catch {
    return null
  }
}

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  return readStoredTheme() ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
}

const projectScreenshots = {
  firelink: { dark: firelinkDark, light: firelinkLight },
  companion: { dark: companionDark, light: companionLight },
  lifexp: { dark: lifeXpDark, light: lifeXpLight },
} as const

type FieldLayer = 'back' | 'front' | 'halo' | 'dust'

type FieldParticle = {
  baseX: number
  baseY: number
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  phase: number
  intensity: number
  layer: FieldLayer
  angle: number
  distance: number
  spawnDistance: number
  orbitScale: number
  angularSpeed: number
  angularMomentum: number
  infallSpeed: number
  spin: number
  heat: number
  shade: number
}

function LivingField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const pointer = { x: -1000, y: -1000, vx: 0, vy: 0, activity: 0 }
    let width = 0
    let height = 0
    let pixelRatio = 1
    let particles: FieldParticle[] = []
    let coreX = 0
    let coreY = 0
    let coreRadius = 0
    let cuspRadius = 0
    let scrollVelocity = 0
    let lastScroll = window.scrollY
    let lastScrollTime = performance.now()
    let lastPointerTime = performance.now()
    let lastFrame = performance.now()
    let frame = 0
    let pointerDownAt = 0
    let leftPointerDown = false
    let gravityStrength = 1

    const buildParticles = () => {
      coreX = width * .53
      coreY = height * .47
      coreRadius = Math.min(width, height) * .185
      cuspRadius = coreRadius * 1.08
      const nextParticle = (baseX: number, baseY: number, index: number, layer: FieldLayer, intensity: number): FieldParticle => {
        const seed = Math.sin(index * 21.71) * .5 + .5
        const sizeSeed = Math.sin(index * 7.37 + 1.8) * .5 + .5
        const shade = Math.sin(index * 17.23 + 3.1) * .5 + .5
        return {
          baseX,
          baseY,
          x: baseX,
          y: baseY,
          vx: 0,
          vy: 0,
          radius: layer === 'dust'
            ? .35 + sizeSeed * 1.15 + (sizeSeed > .84 ? .65 : 0)
            : .65 + seed * 1.7 + (layer === 'front' ? .65 : 0),
          phase: index * .61 + seed * Math.PI,
          intensity,
          layer,
          angle: 0,
          distance: 0,
          spawnDistance: 0,
          orbitScale: .76,
          angularSpeed: 0,
          angularMomentum: 0,
          infallSpeed: 0,
          spin: 0,
          heat: 0,
          shade,
        }
      }

      const fieldParticles: FieldParticle[] = []
      const discCount = 0
      for (let index = 0; index < discCount; index += 1) {
        const seed = Math.sin(index * 21.71) * .5 + .5
        const span = index / (discCount - 1) * 2 - 1
        const density = 1 - Math.abs(span)
        const band = (seed - .5) * height * (.025 + density * .075)
        const lensCurve = Math.sin(span * Math.PI) * height * .035
        const layer = Math.abs(span) < .48 && seed > .3 ? 'front' : 'back'
        fieldParticles.push(nextParticle(
          coreX + span * width * .63,
          coreY - span * height * .19 + band + lensCurve,
          index,
          layer,
          .25 + density * .6 + seed * .15,
        ))
      }

      const haloCount = 0
      for (let index = 0; index < haloCount; index += 1) {
        const particleIndex = discCount + index
        const seed = Math.sin(particleIndex * 21.71) * .5 + .5
        const angle = index / haloCount * Math.PI * 2
        const radius = coreRadius * (1.08 + seed * .45)
        fieldParticles.push(nextParticle(
          coreX + Math.cos(angle) * radius,
          coreY + Math.sin(angle) * radius * .84,
          particleIndex,
          'halo',
          .2 + seed * .56,
        ))
      }

      const dustCount = 512
      for (let index = 0; index < dustCount; index += 1) {
        const particleIndex = discCount + haloCount + index
        const seed = Math.sin(particleIndex * 21.71) * .5 + .5
        const angle = seed * Math.PI * 2 + index * .43
        // Bias the stream toward the inner disc so the field becomes denser
        // as it approaches the cusp instead of looking evenly distributed.
        const distance = coreRadius * (1.14 + Math.pow(seed, 2.05) * 3.2)
        const particle = nextParticle(
          coreX + Math.cos(angle) * distance,
          coreY + Math.sin(angle) * distance * .76,
          particleIndex,
          'dust',
          .11 + seed * .25,
        )
        particle.angle = angle
        particle.distance = distance
        particle.spawnDistance = distance
        particle.orbitScale = .66 + particle.shade * .18
        particle.angularSpeed = .1 + seed * .08
        particle.angularMomentum = distance * distance * particle.angularSpeed
        particle.infallSpeed = .18 + seed * .2
        particle.spin = .025 + seed * .035
        fieldParticles.push(particle)
      }

      particles = fieldParticles
    }

    const render = (time: number) => {
      const delta = Math.min((time - lastFrame) / 1000, .032)
      lastFrame = time
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      context.clearRect(0, 0, width, height)

      const centerX = coreX
      const centerY = coreY
      const pointerDistance = pointer.x < 0
        ? Number.POSITIVE_INFINITY
        : Math.hypot(pointer.x - centerX, pointer.y - centerY)
      const pointerProximity = Number.isFinite(pointerDistance)
        ? Math.max(0, 1 - pointerDistance / (Math.max(width, height) * .72))
        : 0
      const holdProgress = leftPointerDown
        ? Math.min(1, (time - pointerDownAt) / 2600)
        : 0
      const targetGravityStrength = 1
        + pointer.activity * .95
        + pointerProximity * .9
        + holdProgress * (2.6 + pointerProximity * 1.5)
      gravityStrength += (targetGravityStrength - gravityStrength) * Math.min(1, delta * 5.5)
      particles.forEach((particle) => {
        if (particle.layer === 'dust') {
          if (!prefersReducedMotion) {
            const gravityRadius = Math.max(particle.distance, cuspRadius)
            const radiusRatio = coreRadius / gravityRadius
            const gravitationalPull = Math.min(3.2, .72 * Math.pow(radiusRatio, 1.85))
            const frameDragging = particle.spin * Math.pow(radiusRatio, 1.55)

            // Angular momentum makes the orbit accelerate inward, while the
            // inverse-square pull makes the final approach visibly steeper.
            particle.infallSpeed += gravitationalPull * gravityStrength * delta
            particle.infallSpeed *= Math.pow(.994, delta * 60)
            particle.distance -= particle.infallSpeed * gravityStrength * delta
            particle.angularSpeed = Math.min(
              3.6,
              particle.angularMomentum / (gravityRadius * gravityRadius) + frameDragging,
            )
            particle.angle += particle.angularSpeed * gravityStrength * delta

            if (particle.distance <= cuspRadius) {
              // Turn the stream smoothly at the cusp instead of teleporting
              // particles back to the outer edge, which caused visible pops.
              particle.distance = cuspRadius
              particle.infallSpeed = -8 - particle.shade * 6
            } else if (particle.distance >= particle.spawnDistance && particle.infallSpeed < 0) {
              particle.distance = particle.spawnDistance
              particle.infallSpeed = .18 + particle.shade * .2
            }

            particle.x = centerX + Math.cos(particle.angle) * particle.distance
            particle.y = centerY + Math.sin(particle.angle) * particle.distance * particle.orbitScale + scrollVelocity * .006
          }
          return
        }

        const orbital = particle.layer === 'halo' ? 2.1 : .7
        const driftX = Math.sin(time * .0008 * orbital + particle.phase) * 1.4
        const driftY = Math.cos(time * .0011 * orbital + particle.phase) * 1.1
        const targetX = particle.baseX + driftX
        const targetY = particle.baseY + driftY + scrollVelocity * .006
        const accelerationX = (targetX - particle.x) * 18 - particle.vx * 7.5
        const accelerationY = (targetY - particle.y) * 18 - particle.vy * 7.5

        if (!prefersReducedMotion) {
          particle.vx += accelerationX * delta
          particle.vy += accelerationY * delta
          particle.x += particle.vx * delta
          particle.y += particle.vy * delta
        }

      })
      pointer.activity *= Math.pow(.055, delta)

      const drawLayer = (layer: 'back' | 'front' | 'halo' | 'dust') => {
        particles.forEach((particle) => {
          if (particle.layer !== layer) return

          const flicker = layer === 'dust' ? 1 : .58 + Math.sin(time * .005 + particle.phase) * .28
          const radius = particle.radius * (layer === 'front' ? 1.2 : 1)
          const targetHeat = layer === 'dust'
            ? Math.max(0, Math.min(1, 1 - (particle.distance - cuspRadius) / (coreRadius * 2.6)))
            : 0
          const heatResponse = prefersReducedMotion ? 1 : Math.min(1, delta * 12)
          particle.heat += (targetHeat - particle.heat) * heatResponse
          const cuspProximity = particle.heat
          const particleRadius = radius * (1 + cuspProximity * .42)
          const streakLength = layer === 'dust' ? 1.1 + cuspProximity * 1.7 : 1
          const dustHeading = layer === 'dust'
            ? Math.atan2(Math.cos(particle.angle) * particle.orbitScale, -Math.sin(particle.angle))
            : 0
          const heading = layer === 'dust' ? dustHeading : Math.atan2(particle.vy, particle.vx)
          const dustRgb = particle.shade > .78
            ? '214, 150, 88'
            : particle.shade > .5
              ? '137, 99, 68'
              : particle.shade > .22
                ? '91, 73, 59'
                : '48, 44, 40'
          const color = layer === 'front'
            ? `rgba(255, 203, 127, ${particle.intensity * flicker * .46})`
            : layer === 'back'
              ? `rgba(166, 91, 54, ${particle.intensity * flicker * .3})`
              : layer === 'halo'
                ? `rgba(236, 157, 87, ${particle.intensity * flicker * .68})`
                : `rgba(${dustRgb}, ${particle.intensity * flicker * (.32 + cuspProximity * 1.25)})`

          context.save()
          context.translate(particle.x, particle.y)
          context.rotate(heading + (layer === 'dust' ? -.2 : -.3))
          context.fillStyle = color
          if (layer === 'front' || layer === 'halo') {
            context.shadowColor = 'rgba(236, 135, 72, .45)'
            context.shadowBlur = 4 + particle.intensity * 7
          }
          context.beginPath()
          if (layer === 'back' || layer === 'front') {
            context.ellipse(0, 0, radius * 1.8, radius * .34, 0, 0, Math.PI * 2)
          } else if (layer === 'dust') {
            context.ellipse(0, 0, particleRadius * streakLength, particleRadius * .62, 0, 0, Math.PI * 2)
          } else {
            context.ellipse(0, 0, radius, radius * .72, 0, 0, Math.PI * 2)
          }
          context.fill()
          context.restore()
        })
      }

      const drawAccretionBand = (front: boolean) => {
        const startX = centerX - width * .62
        const endX = centerX + width * .62
        const startY = centerY + height * .2
        const endY = centerY - height * .2
        const gradient = context.createLinearGradient(startX, startY, endX, endY)
        gradient.addColorStop(0, 'rgba(190, 101, 56, 0)')
        gradient.addColorStop(.2, front ? 'rgba(232, 155, 89, .45)' : 'rgba(183, 96, 53, .16)')
        gradient.addColorStop(.5, front ? 'rgba(255, 225, 164, .92)' : 'rgba(224, 132, 73, .26)')
        gradient.addColorStop(.8, front ? 'rgba(232, 155, 89, .45)' : 'rgba(183, 96, 53, .16)')
        gradient.addColorStop(1, 'rgba(190, 101, 56, 0)')

        context.save()
        context.strokeStyle = gradient
        context.lineCap = 'round'
        context.shadowColor = front ? 'rgba(245, 166, 91, .46)' : 'rgba(190, 101, 56, .18)'
        context.shadowBlur = front ? 18 : 10
        context.lineWidth = front ? 2.6 : 10
        context.beginPath()
        context.moveTo(startX, startY)
        context.bezierCurveTo(centerX - width * .22, centerY + height * .08, centerX + width * .22, centerY - height * .08, endX, endY)
        context.stroke()
        context.restore()
      }

      const drawLensingArc = () => {
        context.save()
        context.translate(centerX, centerY)
        context.rotate(-.3)
        context.strokeStyle = 'rgba(240, 170, 97, .38)'
        context.lineWidth = 2.4
        context.shadowColor = 'rgba(236, 145, 73, .35)'
        context.shadowBlur = 13
        context.beginPath()
        context.ellipse(0, 0, coreRadius * 1.28, coreRadius * .62, 0, .1, Math.PI * 1.05)
        context.stroke()
        context.strokeStyle = 'rgba(255, 221, 159, .45)'
        context.lineWidth = 1.15
        context.beginPath()
        context.ellipse(0, 0, coreRadius * 1.18, coreRadius * .52, 0, Math.PI * 1.14, Math.PI * 2.08)
        context.stroke()
        context.restore()
      }

      drawLayer('dust')
      drawAccretionBand(false)
      drawLensingArc()

      const halo = context.createRadialGradient(centerX, centerY, coreRadius * .48, centerX, centerY, coreRadius * 1.75)
      halo.addColorStop(0, 'rgba(20, 18, 16, 0)')
      halo.addColorStop(.54, 'rgba(29, 24, 20, 0)')
      halo.addColorStop(.68, 'rgba(199, 113, 61, .17)')
      halo.addColorStop(.83, 'rgba(232, 166, 97, .11)')
      halo.addColorStop(1, 'rgba(232, 166, 97, 0)')
      context.fillStyle = halo
      context.beginPath()
      context.arc(centerX, centerY, coreRadius * 1.75, 0, Math.PI * 2)
      context.fill()

      context.save()
      context.shadowColor = 'rgba(243, 175, 101, .28)'
      context.shadowBlur = 16
      context.fillStyle = '#1c1a18'
      context.beginPath()
      context.arc(centerX, centerY, coreRadius, 0, Math.PI * 2)
      context.fill()
      context.restore()

      context.strokeStyle = 'rgba(255, 218, 157, .5)'
      context.lineWidth = 1
      context.beginPath()
      context.arc(centerX, centerY, coreRadius * 1.018, 0, Math.PI * 2)
      context.stroke()

      drawAccretionBand(true)

      const applyEdgeFade = (vertical: boolean) => {
        const gradient = vertical
          ? context.createLinearGradient(0, 0, 0, height)
          : context.createLinearGradient(0, 0, width, 0)
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0)')
        gradient.addColorStop(.12, 'rgba(0, 0, 0, .72)')
        gradient.addColorStop(.23, 'rgba(0, 0, 0, 1)')
        gradient.addColorStop(.77, 'rgba(0, 0, 0, 1)')
        gradient.addColorStop(.88, 'rgba(0, 0, 0, .72)')
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
        context.fillStyle = gradient
        context.fillRect(0, 0, width, height)
      }

      context.save()
      context.globalCompositeOperation = 'destination-in'
      applyEdgeFade(false)
      applyEdgeFade(true)
      context.restore()

      pointer.vx *= .89
      pointer.vy *= .89
      scrollVelocity *= .9
    }

    const draw = (time: number) => {
      render(time)
      if (!prefersReducedMotion) frame = window.requestAnimationFrame(draw)
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = Math.max(1, rect.width)
      height = Math.max(1, rect.height)
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.round(width * pixelRatio)
      canvas.height = Math.round(height * pixelRatio)
      buildParticles()
      render(performance.now())
    }

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      const now = performance.now()
      const elapsed = Math.max((now - lastPointerTime) / 1000, .016)
      const nextX = event.clientX - rect.left
      const nextY = event.clientY - rect.top
      pointer.vx = Math.max(-1500, Math.min(1500, (nextX - pointer.x) / elapsed))
      pointer.vy = Math.max(-1500, Math.min(1500, (nextY - pointer.y) / elapsed))
      pointer.x = nextX
      pointer.y = nextY
      pointer.activity = Math.min(1, pointer.activity + .16 + Math.min(1, Math.hypot(pointer.vx, pointer.vy) / 1400) * .28)
      lastPointerTime = now
    }

    const onPointerLeave = () => {
      pointer.x = -1000
      pointer.y = -1000
      pointer.vx = 0
      pointer.vy = 0
    }

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return
      leftPointerDown = true
      pointerDownAt = performance.now()
      pointer.activity = 1
      canvas.setPointerCapture?.(event.pointerId)
    }

    const releasePointer = () => {
      leftPointerDown = false
      pointerDownAt = 0
    }

    const onPointerUp = (event: PointerEvent) => {
      if (event.button === 0) releasePointer()
    }

    const onScroll = () => {
      const now = performance.now()
      const elapsed = Math.max((now - lastScrollTime) / 1000, .016)
      scrollVelocity = Math.max(-1500, Math.min(1500, (window.scrollY - lastScroll) / elapsed))
      lastScroll = window.scrollY
      lastScrollTime = now
    }

    const observer = new ResizeObserver(resize)
    observer.observe(canvas)
    canvas.addEventListener('pointermove', onPointerMove, { passive: true })
    canvas.addEventListener('pointerdown', onPointerDown)
    canvas.addEventListener('pointerup', onPointerUp)
    canvas.addEventListener('pointercancel', releasePointer)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('pointerup', onPointerUp)
    canvas.addEventListener('pointerleave', onPointerLeave)
    resize()
    if (!prefersReducedMotion) frame = window.requestAnimationFrame(draw)

    return () => {
      observer.disconnect()
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerdown', onPointerDown)
      canvas.removeEventListener('pointerup', onPointerUp)
      canvas.removeEventListener('pointercancel', releasePointer)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointerup', onPointerUp)
      canvas.removeEventListener('pointerleave', onPointerLeave)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  return <canvas ref={canvasRef} className="living-field" aria-hidden="true" />
}

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

type Navigate = (href: string) => void

function TilCard({
  tilPost,
  index,
  onNavigate,
  variant = 'archive',
}: {
  tilPost: TilPost
  index: number
  onNavigate: Navigate
  variant?: 'teaser' | 'archive'
}) {
  const href = `/til/${tilPost.id}`

  return (
    <a
      className={`til-card til-card-${variant}`}
      href={href}
      onClick={(event) => { event.preventDefault(); onNavigate(href) }}
      aria-labelledby={`til-card-title-${variant}-${tilPost.id}`}
    >
      <div className="til-card-topline">
        <span className="til-card-label">Note {String(index + 1).padStart(2, '0')}</span>
        <time dateTime={tilPost.date}>{tilPost.displayDate}</time>
      </div>
      <h3 id={`til-card-title-${variant}-${tilPost.id}`}>{tilPost.title}</h3>
      <p className="til-summary">{tilPost.summary}</p>
      <div className="til-meta">
        <span><Clock3 size={14} /> {tilPost.readTime}</span>
        <ul aria-label={`${tilPost.title} topics`}>
          {tilPost.tags.map((tag) => <li key={tag}>{tag}</li>)}
        </ul>
      </div>
      <div className="til-card-footer">
        <span>{tilPost.contextLabel}</span>
      </div>
    </a>
  )
}

function TilIndex({ onNavigate }: { onNavigate: Navigate }) {
  const [query, setQuery] = useState('')
  const [topic, setTopic] = useState('All')
  const topics = useMemo(() => ['All', ...Array.from(new Set(tilPosts.flatMap((post) => post.tags))).sort()], [])
  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return orderedTilPosts.filter((post) => {
      const matchesTopic = topic === 'All' || post.tags.includes(topic)
      if (!matchesTopic) return false
      if (!normalizedQuery) return true

      const searchableText = [
        post.title,
        post.summary,
        post.tags.join(' '),
        post.sections.map((section) => [
          section.heading,
          section.paragraphs.join(' '),
          section.bullets?.join(' ') ?? '',
          section.steps?.join(' ') ?? '',
          section.code ?? '',
          section.quotes?.join(' ') ?? '',
          section.callouts?.map((callout) => `${callout.label} ${callout.text}`).join(' ') ?? '',
        ].join(' ')).join(' '),
      ].join(' ').toLowerCase()

      return searchableText.includes(normalizedQuery)
    })
  }, [query, topic])

  return (
    <div className="til-page-shell">
      <section className="til-page-intro section">
        <div>
          <p className="eyebrow"><span /> TIL · Today I learned</p>
          <h1>Things I learn<br /><em>while building.</em></h1>
          <p className="til-page-lede">Short, practical notes from the work behind the work — patterns, bugs, and decisions worth keeping close.</p>
        </div>
        <div className="til-page-index" aria-label={`${tilPosts.length} notes in the archive`}>
          <span>Archive</span>
          <strong>{tilPosts.length}</strong>
          <span>notes</span>
        </div>
      </section>

      <section className="til-browser section" aria-labelledby="til-archive-title">
        <div className="til-browser-toolbar">
          <div>
            <p className="eyebrow"><span /> Notebook index</p>
            <h2 id="til-archive-title">Browse the notes.</h2>
          </div>
          <label className="til-search">
            <Search size={16} />
            <span className="visually-hidden">Search TILs</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search notes" />
          </label>
        </div>

        <div className="til-topic-row">
          <div className="til-topics" aria-label="Filter TILs by topic">
            {topics.map((item) => (
              <button key={item} type="button" className={topic === item ? 'active' : ''} onClick={() => setTopic(item)}>
                {item === 'All' ? 'All notes' : item}
              </button>
            ))}
          </div>
          <p className="til-results">Showing {filteredPosts.length} of {tilPosts.length}</p>
        </div>

        <div className="til-archive-list">
          {filteredPosts.length > 0 ? filteredPosts.map((post, index) => (
            <TilCard key={post.id} tilPost={post} index={index} onNavigate={onNavigate} />
          )) : (
            <div className="til-no-results">
              <p className="eyebrow"><span /> No match</p>
              <h3>That note is not in the notebook yet.</h3>
              <button type="button" onClick={() => { setQuery(''); setTopic('All') }}>Clear filters</button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

function TilPostPage({ post, onNavigate }: { post: TilPost; onNavigate: Navigate }) {
  return (
    <div className="til-page-shell">
      <section className="til-post-intro section">
        <a className="text-link" href="/til" onClick={(event) => { event.preventDefault(); onNavigate('/til') }}><ArrowDownRight size={16} /> Back to all TILs</a>
        <p className="eyebrow"><span /> {post.displayDate} · {post.readTime}</p>
        <h1>{post.title}</h1>
        <p className="til-post-summary">{post.summary}</p>
        <ul className="til-dialog-tags" aria-label="TIL topics">
          {post.tags.map((tag) => <li key={tag}>{tag}</li>)}
        </ul>
      </section>

      <section className="til-article-shell section" aria-label="TIL article">
        <article className="til-weblog-post">
          <p className="til-article-kicker">Firelink · working notes</p>
          {post.sections.map((section) => (
            <section className="til-weblog-section" key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets && (
                <ul>
                  {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
              )}
              {section.steps && (
                <ol>
                  {section.steps.map((step) => <li key={step}>{step}</li>)}
                </ol>
              )}
              {section.code && <pre><code>{section.code}</code></pre>}
              {section.quotes?.map((quote) => <blockquote key={quote}>{quote}</blockquote>)}
              {section.callouts && (
                <div className="til-callouts">
                  {section.callouts.map((callout) => (
                    <div className="til-callout" key={callout.label}>
                      <span>{callout.label}</span>
                      <p>{callout.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
          <footer className="til-article-footer">
            <span>Filed under</span>
            <p>{post.tags.join(' · ')}</p>
          </footer>
        </article>
      </section>
    </div>
  )
}

function App() {
  const [filter, setFilter] = useState<'All' | Project['category']>('All')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [theme, setTheme] = useState<Theme>(getInitialTheme)
  const [previewProject, setPreviewProject] = useState<Project | null>(null)
  const [route, setRoute] = useState<Route>(() => getRoute(window.location.pathname))

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

  useEffect(() => {
    const onPopState = () => {
      setRoute(getRoute(window.location.pathname))
      setMenuOpen(false)
      window.scrollTo({ top: 0, behavior: 'auto' })
    }

    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  useEffect(() => {
    const title = route.type === 'home'
      ? 'NimBold — Independent Developer'
      : route.type === 'til-index'
        ? 'TIL — NimBold'
        : `${tilPosts.find((post) => post.id === route.id)?.title ?? 'TIL'} — NimBold`
    document.title = title
  }, [route])

  useEffect(() => {
    if (route.type !== 'home') {
      window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }

    window.requestAnimationFrame(() => {
      if (window.location.hash) {
        document.querySelector(window.location.hash)?.scrollIntoView({ behavior: 'smooth' })
      } else {
        window.scrollTo({ top: 0, behavior: 'auto' })
      }
    })
  }, [route])

  useEffect(() => {
    const root = document.documentElement
    root.dataset.theme = theme
    root.style.colorScheme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#111315' : '#f2f1ed')
  }, [theme])

  useEffect(() => {
    if (readStoredTheme()) return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const onSystemThemeChange = (event: MediaQueryListEvent) => setTheme(event.matches ? 'dark' : 'light')
    mediaQuery.addEventListener('change', onSystemThemeChange)
    return () => mediaQuery.removeEventListener('change', onSystemThemeChange)
  }, [])

  const toggleTheme = () => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)

    try {
      window.localStorage.setItem(themeStorageKey, nextTheme)
    } catch {
      // Keep the toggle usable when browser storage is unavailable.
    }
  }

  const navigate = (href: string) => {
    const nextUrl = new URL(href, window.location.origin)
    const nextPath = `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`

    window.history.pushState({}, '', nextPath)
    setRoute(getRoute(nextUrl.pathname))
    setMenuOpen(false)
    setPreviewProject(null)
  }

  const handleInternalNavigation = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('/')) return
    event.preventDefault()
    navigate(href)
  }

  const visibleProjects = filter === 'All' ? projects : projects.filter((project) => project.category === filter)
  const selectedTilPost = route.type === 'til-post' ? tilPosts.find((post) => post.id === route.id) : null

  return (
    <main className={route.type === 'home' ? undefined : 'til-route'}>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <a className="brand" href={route.type === 'home' ? '#top' : '/'} onClick={(event) => route.type !== 'home' && handleInternalNavigation(event, '/')} aria-label="NimBold home">N<span>°</span></a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map(({ name, href }) => <a key={name} href={href} onClick={(event) => handleInternalNavigation(event, href)}>{name}</a>)}
        </nav>
        <div className="header-actions">
          <a className="availability" href="/#contact" onClick={(event) => handleInternalNavigation(event, '/#contact')}><i /> Available for select work</a>
          <button
            className="site-theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            aria-live="polite"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
        </div>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`}>
          {navigation.map(({ name, href }) => <a key={name} href={href} onClick={(event) => handleInternalNavigation(event, href)}>{name}</a>)}
        </div>
      </header>

      {route.type === 'home' ? (
        <>
      <section className="hero" id="top">
        <div className="hero-glow glow-one" />
        <div className="hero-copy reveal">
          <p className="eyebrow"><span /> Independent developer</p>
          <h1>Building quiet,<br /><em>useful</em> software.</h1>
          <p className="hero-summary">I design and build thoughtful tools at the intersection of product craft, dependable systems, and everyday life.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">Explore selected work <MoveRight size={18} /></a>
            <a className="text-link" href="https://github.com/nimbold" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={15} /></a>
          </div>
        </div>
        <div className="hero-art reveal-delay" aria-hidden="true">
          <div className="art-frame interactive-art">
            <LivingField />
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

      <section className="socials section" id="socials">
        <div className="section-heading compact">
          <div><p className="eyebrow"><span /> Socials</p><h2>Find me<br /><em>elsewhere.</em></h2></div>
          <p className="section-note">A few places to follow the work and the thinking behind it.</p>
        </div>
        <div className="social-grid">
          <a className="social-card social-card-x" href="https://x.com/NimBold" target="_blank" rel="noreferrer">
            <div className="social-card-head"><span className="social-mark" aria-hidden="true">𝕏</span><ArrowUpRight size={18} /></div>
            <div><p className="social-kicker">Twitter / X</p><h3>@NimBold</h3><p>Thoughts on building software, product details, and the occasional work-in-progress.</p></div>
            <span className="social-cta">Visit profile <ArrowUpRight size={15} /></span>
          </a>
          <a className="social-card social-card-github" href="https://github.com/nimbold" target="_blank" rel="noreferrer">
            <div className="social-card-head"><Code2 size={23} /><ArrowUpRight size={18} /></div>
            <div><p className="social-kicker">Open source</p><h3>GitHub / nimbold</h3><p>Source, experiments, and the products I’m actively shaping in public.</p></div>
            <span className="social-cta">Browse repositories <ArrowUpRight size={15} /></span>
          </a>
        </div>
      </section>

      <section className="experience section">
        <div className="section-heading compact"><div><p className="eyebrow"><span /> Experience</p><h2>The path so far.</h2></div><p className="section-note">A fuller work history is being prepared.</p></div>
        <div className="timeline placeholder-block">
          <div><span>Now</span><b>Independent developer</b><em>Building and shipping personal software products.</em></div>
          <div><span>Next</span><b>Your next collaboration</b><em>Open to the right product or engineering challenge.</em></div>
        </div>
      </section>

      <section className="til-section section" id="til">
        <div className="til-heading"><p className="eyebrow"><span /> TIL · Today I learned</p><h2>Small lessons.<br /><em>Kept close.</em></h2><p className="til-heading-note">Short, practical notes from the work behind the work.</p></div>
        <div className="til-feed">
          <TilCard tilPost={orderedTilPosts[0]} index={0} onNavigate={navigate} variant="teaser" />
          <a className="til-browse-link" href="/til" onClick={(event) => handleInternalNavigation(event, '/til')}>Open the full notebook <ArrowUpRight size={17} /></a>
        </div>
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
        </>
      ) : route.type === 'til-index' ? (
        <TilIndex onNavigate={navigate} />
      ) : selectedTilPost ? (
        <TilPostPage post={selectedTilPost} onNavigate={navigate} />
      ) : (
        <TilIndex onNavigate={navigate} />
      )}

      <footer>
        <a className="brand" href={route.type === 'home' ? '#top' : '/'} onClick={(event) => route.type !== 'home' && handleInternalNavigation(event, '/')}>
          N<span>°</span>
        </a>
        <p>© {new Date().getFullYear()} NimBold. Built with focus.</p>
        <a href={route.type === 'home' ? '#top' : '/'} onClick={(event) => route.type !== 'home' && handleInternalNavigation(event, '/')}>Back to top <ArrowUpRight size={14} /></a>
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
