/**
 * Central content for the portfolio. Edit text, links, and row membership here.
 * Add images later by setting `image` to a path under `/public` (e.g. `/posters/uav.jpg`).
 */

/** @typedef {{ github?: string, demo?: string, report?: string, video?: string }} ItemLinks */

/**
 * @typedef {object} PortfolioItem
 * @property {string} id
 * @property {string} title
 * @property {string} subtitle
 * @property {string} category
 * @property {string} description
 * @property {string[]} tech
 * @property {number} year
 * @property {ItemLinks} [links]
 * @property {string} [image] public URL
 * @property {string} gradient tailwind gradient classes for placeholder art
 * @property {object} detail
 * @property {string} detail.summary
 * @property {string} detail.problem
 * @property {string} detail.built
 * @property {string[]} detail.technologies
 * @property {string} detail.impact
 */

/** @type {Record<string, PortfolioItem>} */
export const portfolioItems = {
  'uav-path-planning': {
    id: 'uav-path-planning',
    title: 'UAV Path Planning & Waypoint Tool',
    subtitle: 'Robotics · Path planning',
    category: 'Robotics & Simulation',
    description:
      'Planning utilities and workflows for UAV coverage paths, waypoints, and façade-oriented trajectories.',
    tech: ['Python', 'Geometry', 'Simulation', 'ROS-adjacent workflows'],
    year: 2024,
    gradient: 'from-slate-900 via-indigo-950 to-zinc-950',
    links: { github: '', report: '' },
    detail: {
      summary:
        'Tooling focused on generating and evaluating UAV paths for structured environments, including waypoint generation and geometry-aware constraints.',
      problem:
        'Autonomous aerial systems need repeatable, inspectable path plans that respect vehicle dynamics and task geometry—especially for structured surfaces and operational envelopes.',
      built:
        'Implemented planning utilities, waypoint generation logic, and supporting scripts/visualizations to iterate on trajectories and export plans for downstream simulation or field workflows.',
      technologies: [
        'Python',
        '3D / façade geometry reasoning',
        'Path & waypoint generation',
        'Simulation-oriented exports',
      ],
      impact:
        'Reduced iteration time on mission planning by making path variants easy to generate, compare, and hand off to simulation or hardware teams.',
    },
  },
  'blender-path-addon': {
    id: 'blender-path-addon',
    title: 'Blender / Python 3D Path Planning Add-on',
    subtitle: 'Simulation · Blender',
    category: 'Robotics & Simulation',
    description:
      'Blender-based tooling to author and visualize 3D paths inside a familiar DCC environment.',
    tech: ['Python', 'Blender API', '3D Math'],
    year: 2024,
    gradient: 'from-zinc-900 via-orange-950/40 to-zinc-950',
    links: { github: '', demo: '' },
    detail: {
      summary:
        'A Blender-oriented add-on workflow for experimenting with 3D path plans with immediate visual feedback.',
      problem:
        'Pure numeric planners can be hard to interpret; stakeholders benefit from spatial context and rapid visualization when tuning paths.',
      built:
        'Used Blender’s Python API to integrate planning helpers, visualize segments and constraints, and streamline iteration inside a 3D scene graph.',
      technologies: ['Python', 'Blender scripting', 'Vector math', 'UI panels (Blender)'],
      impact:
        'Made path hypotheses tangible in-scene, improving communication between planning, perception, and simulation stakeholders.',
    },
  },
  'patchcore-anomaly': {
    id: 'patchcore-anomaly',
    title: 'PatchCore Anomaly Detection Experiments',
    subtitle: 'AI / Vision',
    category: 'AI & Computer Vision',
    description:
      'Exploration of memory-bank anomaly detection for industrial-style defect discovery.',
    tech: ['Python', 'PyTorch', 'Vision', 'PatchCore'],
    year: 2023,
    gradient: 'from-violet-950 via-zinc-900 to-zinc-950',
    links: { github: '', report: '' },
    detail: {
      summary:
        'Experiments around PatchCore-style representation learning for anomaly localization and scoring.',
      problem:
        'Defect datasets are often imbalanced; strong baselines should separate nominal structure from subtle faults without exhaustive defect labels.',
      built:
        'Implemented and tuned PatchCore-style pipelines, evaluated scoring maps, and compared configurations on representative image sets.',
      technologies: ['Python', 'PyTorch', 'Feature banks', 'k-NN scoring', 'Augmentations'],
      impact:
        'Built intuition for when memory-bank methods outperform simpler baselines and how preprocessing affects localization quality.',
    },
  },
  'fast-lio-rtab': {
    id: 'fast-lio-rtab',
    title: 'FAST-LIO2 + RTAB-Map SLAM Simulation Workflow',
    subtitle: 'SLAM · Simulation',
    category: 'Robotics & Simulation',
    description:
        'Integrated simulation workflow combining lidar-inertial odometry with RTAB-Map mapping pipelines.',
    tech: ['ROS', 'SLAM', 'Simulation', 'C++ / Python tooling'],
    year: 2024,
    gradient: 'from-emerald-950/80 via-zinc-900 to-zinc-950',
    links: { github: '', video: '' },
    detail: {
      summary:
        'A repeatable simulation-oriented workflow for FAST-LIO2 style odometry feeding RTAB-Map mapping outputs.',
      problem:
        'SLAM stacks are sensitive to timing, calibration, and sensor models—teams need a reproducible harness before moving to hardware.',
      built:
        'Wired together simulation assets, launch sequences, and logging/checking steps so maps and trajectories can be compared run-to-run.',
      technologies: ['ROS / ROS2-adjacent workflows', 'RTAB-Map', 'FAST-LIO2', 'Bag playback / sim'],
      impact:
        'Improved confidence in mapping behavior under controlled conditions and reduced onboarding friction for new contributors.',
    },
  },
  'mc68k-fpga-vga': {
    id: 'mc68k-fpga-vga',
    title: 'MC68K FPGA VGA Arcade System',
    subtitle: 'Embedded · FPGA',
    category: 'FPGA & Embedded',
    description:
      'Motorola 68K-based system on FPGA driving VGA output for a retro arcade-style platform.',
    tech: ['Verilog / VHDL (course context)', 'FPGA', 'VGA', '68K'],
    year: 2023,
    gradient: 'from-rose-950/50 via-zinc-900 to-zinc-950',
    links: { github: '', report: '' },
    detail: {
      summary:
        'Course-scale system integrating a classic processor model with VGA timing and simple interactive graphics.',
      problem:
        'Bridging CPU bring-up, memory-mapped I/O, and pixel timing requires disciplined hardware/software co-design.',
      built:
        'Implemented datapath and control for VGA timing, memory interfaces, and software bring-up to host a minimal arcade experience.',
      technologies: ['FPGA', 'VGA timing', 'Processor integration', 'Low-level C/ASM (as applicable)'],
      impact:
        'Demonstrated end-to-end embedded graphics competency from clocks and sync signals to interactive software.',
    },
  },
  'cosmic-impalas-fpga': {
    id: 'cosmic-impalas-fpga',
    title: 'Cosmic Impalas FPGA Game',
    subtitle: 'FPGA · Game systems',
    category: 'FPGA & Embedded',
    description:
      'Game-style project synthesizing graphics, input, and game loop logic on FPGA fabric.',
    tech: ['FPGA', 'Game loop', 'Graphics logic'],
    year: 2023,
    gradient: 'from-fuchsia-950/40 via-purple-950/30 to-zinc-950',
    links: { demo: '', report: '' },
    detail: {
      summary:
        'A cohesive FPGA game delivering sprites/background logic, collision-style behaviors, and player controls.',
      problem:
        'Real-time games on FPGA require predictable timing, resource budgeting, and clear partitioning between rendering and game state.',
      built:
        'Structured modules for video generation, input sampling, and deterministic update steps; iterated on playability and visual clarity.',
      technologies: ['FPGA', 'RTL design', 'Timing closure mindset', 'IO debouncing'],
      impact:
        'Showed ability to ship a complete interactive experience on constrained hardware—not only a demo waveform.',
    },
  },
  'ursina-car-game': {
    id: 'ursina-car-game',
    title: 'Car Avoidance Game (Ursina)',
    subtitle: 'Python · Real-time 3D',
    category: 'Software & Web',
    description:
      'Lightweight 3D avoidance gameplay prototype using the Ursina engine in Python.',
    tech: ['Python', 'Ursina', 'Gameplay scripting'],
    year: 2022,
    gradient: 'from-sky-950/60 via-zinc-900 to-zinc-950',
    links: { github: '', demo: '' },
    detail: {
      summary:
        'A small 3D game loop with obstacles, scoring, and vehicle controls implemented quickly in Python.',
      problem:
        'Rapid gameplay iteration benefits from expressive scripting without sacrificing readable structure.',
      built:
        'Authored entity updates, spawn logic, collision responses, and simple UI feedback within Ursina’s component model.',
      technologies: ['Python', 'Ursina', 'Vectors & kinematics'],
      impact:
        'Practice in readable gameplay code organization and real-time tuning loops.',
    },
  },
  'portfolio-website': {
    id: 'portfolio-website',
    title: 'Portfolio Website',
    subtitle: 'React · UI',
    category: 'Software & Web',
    description:
      'This site — a cinematic, row-based portfolio tuned for recruiters and collaborators.',
    tech: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    year: 2026,
    gradient: 'from-amber-950/40 via-zinc-900 to-zinc-950',
    links: { github: '', demo: '' },
    detail: {
      summary:
        'Single-page portfolio with modular data, responsive layout, and GitHub Pages–friendly routing.',
      problem:
        'Technical portfolios should feel premium and scannable without relying on heavy backends or copyrighted branding.',
      built:
        'Implemented modular rows/cards, modal details, motion accents, and static JSON-driven content for easy updates.',
      technologies: ['React 19', 'Vite', 'Tailwind v4', 'Framer Motion', 'react-router-dom'],
      impact:
        'A deployable, professional front door for employers and research contacts—editable in one data file.',
    },
  },
  cpen412: {
    id: 'cpen412',
    title: 'CPEN 412 — Microcomputer Systems / FPGA',
    subtitle: 'Coursework',
    category: 'Courses & Academic Work',
    description:
      'Microcomputer architecture, FPGA labs, and system integration topics bridging hardware and software.',
    tech: ['FPGA', 'Assembly / low-level', 'Computer organization'],
    year: 2023,
    gradient: 'from-zinc-800 via-zinc-900 to-black',
    links: {},
    detail: {
      summary:
        'Upper-year coverage of microcomputer systems with emphasis on FPGA implementation skills.',
      problem:
        'Students must connect ISA concepts, timing, and practical lab bring-up under resource constraints.',
      built:
        'Completed labs and projects involving datapath pieces, memory systems, and integration milestones (details vary by term offering).',
      technologies: ['FPGA toolchains', 'Simulation', 'Timing analysis', 'System integration'],
      impact:
        'Strengthened foundation for embedded graphics projects and hardware/software co-design tasks.',
    },
  },
  cpen411: {
    id: 'cpen411',
    title: 'CPEN 411 — Computer Architecture',
    subtitle: 'Coursework',
    category: 'Courses & Academic Work',
    description:
      'Pipelines, memory hierarchies, and performance-oriented processor architecture concepts.',
    tech: ['Architecture', 'Performance', 'Caches', 'Pipelining'],
    year: 2023,
    gradient: 'from-neutral-800 via-zinc-900 to-zinc-950',
    links: {},
    detail: {
      summary:
        'Deep dive into modern processor microarchitecture and quantitative evaluation.',
      problem:
        'Hardware performance is rarely intuitive; architects need models for latency, throughput, and hazards.',
      built:
        'Worked through analytical problems and labs reinforcing pipeline behavior, caching, and memory ordering intuition.',
      technologies: ['Performance modeling', 'SIMD / parallelism concepts', 'ISA implications'],
      impact:
        'Better reasoning for embedded and acceleration workloads encountered in robotics and vision stacks.',
    },
  },
  cpen491: {
    id: 'cpen491',
    title: 'CPEN 491 — Capstone Design Project',
    subtitle: 'Capstone',
    category: 'Courses & Academic Work',
    description:
      'Team capstone with UAV façade-cleaning path planning and systems integration themes.',
    tech: ['Systems integration', 'Robotics', 'Path planning'],
    year: 2024,
    gradient: 'from-indigo-950 via-slate-900 to-zinc-950',
    links: { report: '' },
    detail: {
      summary:
        'Capstone project spanning requirements, design reviews, and multi-subsystem integration.',
      problem:
        'Real capstone problems demand cross-functional coordination—mechanical, electrical, software, and validation.',
      built:
        'Contributed to UAV façade-cleaning mission planning threads alongside integration and documentation expectations set by the course.',
      technologies: ['Path planning', 'Team engineering design process', 'Risk & test planning'],
      impact:
        'End-to-end experience presenting engineering trade studies to stakeholders and instructors.',
    },
  },
  os161: {
    id: 'os161',
    title: 'Operating Systems — OS/161',
    subtitle: 'Coursework',
    category: 'Courses & Academic Work',
    description:
      'Kernel-level programming: synchronization, virtual memory, and system call paths.',
    tech: ['C', 'Concurrency', 'Kernels'],
    year: 2023,
    gradient: 'from-stone-800 via-zinc-900 to-black',
    links: {},
    detail: {
      summary:
        'Foundational OS coursework on threads, locks, and memory management inside a teaching kernel.',
      problem:
        'Correctness under concurrency is subtle; small mistakes become system-wide failures.',
      built:
        'Implemented and debugged synchronization primitives and VM-related milestones with careful invariant reasoning.',
      technologies: ['C', 'Locks / CVs', 'Virtual memory', 'Debugging without modern comforts'],
      impact:
        'Stronger mental model for real-time and robotics stacks where timing and resource ownership matter.',
    },
  },
  'computer-graphics': {
    id: 'computer-graphics',
    title: 'Computer Graphics',
    subtitle: 'Coursework',
    category: 'Courses & Academic Work',
    description:
      'Rendering pipelines, transforms, shading models, and interactive graphics principles.',
    tech: ['OpenGL / GLAD-style workflows', 'Linear algebra', 'Shaders'],
    year: 2023,
    gradient: 'from-cyan-950/40 via-zinc-900 to-zinc-950',
    links: {},
    detail: {
      summary:
        'Graphics fundamentals connecting math, GPU stages, and interactive applications.',
      problem:
        '3D intuition must align with programmable pipeline realities—state, buffers, and shader responsibilities.',
      built:
        'Assignments spanning transforms, lighting models, and interactive rendering techniques (exact toolchain varies by offering).',
      technologies: ['GLSL', 'Rasterization', 'Camera & projection math'],
      impact:
        'Directly supports simulation visualization, Blender-facing tooling, and geometry-heavy robotics work.',
    },
  },
  'machine-learning': {
    id: 'machine-learning',
    title: 'Machine Learning & AI-related work',
    subtitle: 'Coursework · Projects',
    category: 'Courses & Academic Work',
    description:
      'Supervised learning, evaluation metrics, and project work connecting models to tasks.',
    tech: ['Python', 'NumPy', 'Models', 'Evaluation'],
    year: 2023,
    gradient: 'from-violet-900/50 via-zinc-900 to-zinc-950',
    links: {},
    detail: {
      summary:
        'Course-driven coverage of ML workflows from data hygiene to generalization measurement.',
      problem:
        'Models fail quietly; practitioners need disciplined splits, baselines, and error analysis.',
      built:
        'Completed assignments and project milestones emphasizing reproducible training loops and fair comparisons.',
      technologies: ['Python', 'Classic ML + intro deep learning topics', 'Visualization'],
      impact:
        'Grounding for anomaly detection experiments and perception-adjacent robotics tasks.',
    },
  },
  skydweller: {
    id: 'skydweller',
    title: 'Skydweller Technologies Inc.',
    subtitle: 'UAV · Robotics · Simulation',
    category: 'Work Experience',
    description:
      'Placeholder: robotics, simulation, and UAV-related engineering contributions (update with your scope and dates).',
    tech: ['Robotics', 'Simulation', 'UAV systems'],
    year: 2024,
    gradient: 'from-amber-950/30 via-zinc-900 to-zinc-950',
    links: {},
    detail: {
      summary:
        'Professional experience supporting UAV-centric robotics and simulation initiatives (details to be filled in).',
      problem:
        'High-assurance aerial platforms require rigorous validation, clear interfaces between subsystems, and repeatable analysis.',
      built:
        'Placeholder — describe tools you built, flight software you touched, simulation assets you owned, and cross-team collaborations.',
      technologies: ['Update with stack: e.g., Python, C++, ROS, avionics interfaces, CI, etc.'],
      impact:
        'Placeholder — quantify reliability improvements, cycle time reductions, or coverage metrics where possible.',
    },
  },
  'ubc-capstone-work': {
    id: 'ubc-capstone-work',
    title: 'UBC Engineering Capstone',
    subtitle: 'UAV façade-cleaning · Path planning',
    category: 'Work Experience',
    description:
      'Capstone team role focused on façade-oriented UAV path planning and mission engineering.',
    tech: ['Path planning', 'Systems', 'Documentation'],
    year: 2024,
    gradient: 'from-blue-950/40 via-zinc-900 to-zinc-950',
    links: { report: '' },
    detail: {
      summary:
        'Capstone-level engineering delivery with emphasis on mission planning for façade cleaning tasks.',
      problem:
        'Structured surfaces impose coverage constraints; planners must respect safety envelopes and vehicle capabilities.',
      built:
        'Collaborated on planning approaches, validation steps, and integration milestones with teammates across disciplines.',
      technologies: ['Python / tooling', 'Geometry reasoning', 'Design reviews'],
      impact:
        'Demonstrated ability to carry a multidisciplinary project from concept to demonstrable milestones.',
    },
  },
  'research-slam': {
    id: 'research-slam',
    title: 'SLAM & Spatial AI',
    subtitle: 'Research interest',
    category: 'Research Interests',
    description:
      'Robust mapping and localization under sensor noise; sim-to-real for navigation stacks.',
    tech: ['SLAM', 'Sensor fusion', 'Simulation'],
    year: 2024,
    gradient: 'from-teal-950/50 via-zinc-900 to-black',
    links: {},
    detail: {
      summary:
        'Interest in reliable spatial perception for mobile robots and aerial platforms.',
      problem:
        'Real environments violate textbook assumptions; robust SLAM needs thoughtful failure modes and validation.',
      built:
        'Exploratory reading and hands-on workflows (simulation harnesses, dataset playback) to stress-test pipeline assumptions.',
      technologies: ['LiDAR-inertial odometry', 'Mapping frameworks', 'ROS ecosystems'],
      impact:
        'Positions future work toward fieldable autonomy with measurable replayability.',
    },
  },
  'research-embedded-ml': {
    id: 'research-embedded-ml',
    title: 'Embedded Perception & Efficient ML',
    subtitle: 'Research interest',
    category: 'Research Interests',
    description:
      'Closing the loop between edge hardware constraints and perception models that can run on them.',
    tech: ['Edge ML', 'FPGA/SoC', 'DSP'],
    year: 2024,
    gradient: 'from-orange-950/40 via-zinc-900 to-zinc-950',
    links: {},
    detail: {
      summary:
        'Interest in co-designing models and platforms for latency-bounded perception.',
      problem:
        'Model accuracy is meaningless if inference cannot meet power and timing envelopes.',
      built:
        'Course and project foundations across ML, computer architecture, and FPGA systems to inform future research directions.',
      technologies: ['Quantization-aware thinking', 'HW/SW partitioning', 'Benchmarking'],
      impact:
        'Targets research questions where measurability and deployability are first-class.',
    },
  },
  'research-uav-perception': {
    id: 'research-uav-perception',
    title: 'UAV Mission Autonomy',
    subtitle: 'Research interest',
    category: 'Research Interests',
    description:
      'Planning, perception, and validation for long-endurance or structured-environment aerial missions.',
    tech: ['UAV', 'Planning', 'Verification'],
    year: 2024,
    gradient: 'from-yellow-950/20 via-zinc-900 to-zinc-950',
    links: {},
    detail: {
      summary:
        'Connecting mission-level autonomy with engineering rigor in simulation and analysis.',
      problem:
        'Aerial autonomy must reconcile regulatory, mechanical, and algorithmic constraints simultaneously.',
      built:
        'Applied coursework and internship-style exposure to mission tooling, simulation, and planning workflows.',
      technologies: ['Path planning', 'Scenario testing', 'Operational analysis'],
      impact:
        'Frames graduate-level questions around trustworthy autonomy under real operational pressures.',
    },
  },
}

/**
 * @param {{ itemIds: string[] }} row
 * @returns {PortfolioItem[]}
 */
export function getItemsForRow(row) {
  return row.itemIds
    .map((id) => portfolioItems[id])
    .filter((item) => item !== undefined)
}

export const contentRows = [
  /**
   * Each row can set:
   * - `cardBackVariant`: preset CSS art — ember | circuit | prism | goldleaf | lattice | folio | steel | nebula
   * - `cardBackImage`: optional path under `public/` (e.g. `cards/featured.png`) or full URL; overrides variant when set
   */
  {
    id: 'featured',
    title: 'Featured Projects',
    itemIds: [
      'uav-path-planning',
      'fast-lio-rtab',
      'portfolio-website',
      'blender-path-addon',
    ],
    cardBackVariant: 'ember',
    cardBackImage: '',
  },
  {
    id: 'robotics',
    title: 'Robotics & Simulation',
    itemIds: [
      'uav-path-planning',
      'blender-path-addon',
      'fast-lio-rtab',
      'ubc-capstone-work',
    ],
    cardBackVariant: 'circuit',
    cardBackImage: '',
  },
  {
    id: 'ai-vision',
    title: 'AI & Computer Vision',
    itemIds: ['patchcore-anomaly', 'machine-learning'],
    cardBackVariant: 'prism',
    cardBackImage: '',
  },
  {
    id: 'fpga',
    title: 'FPGA & Embedded Systems',
    itemIds: ['mc68k-fpga-vga', 'cosmic-impalas-fpga', 'cpen412'],
    cardBackVariant: 'goldleaf',
    cardBackImage: '',
  },
  {
    id: 'software',
    title: 'Software & Web Development',
    itemIds: ['portfolio-website', 'ursina-car-game', 'cpen411'],
    cardBackVariant: 'lattice',
    cardBackImage: '',
  },
  {
    id: 'courses',
    title: 'Courses & Academic Work',
    itemIds: [
      'cpen412',
      'cpen411',
      'cpen491',
      'os161',
      'computer-graphics',
      'machine-learning',
    ],
    cardBackVariant: 'folio',
    cardBackImage: '',
  },
  {
    id: 'work',
    title: 'Work Experience',
    itemIds: ['skydweller', 'ubc-capstone-work'],
    cardBackVariant: 'steel',
    cardBackImage: '',
  },
  {
    id: 'research',
    title: 'Research Interests',
    itemIds: ['research-slam', 'research-embedded-ml', 'research-uav-perception'],
    cardBackVariant: 'nebula',
    cardBackImage: '',
  },
]

export const heroContent = {
  name: 'Edward Han',
  location: 'Vancouver, BC',
  role:
    'Computer Engineering @ the University of British Columbia',
  tagline:
    'I enjoy working on all kinds of tech: software, embedded systems, robotics & simulation, HCI, AI/ML, and projects that bring them together!',
  /** Path under `public/` (respects Vite `BASE_URL` on GitHub Pages) */
  coverImage: 'images/cover-photo.png',
}

export const contactContent = {
  email: 'edwardhan20020806@gmail.com',
  /** Prefill for mailto / web compose links */
  emailSubject: 'Portfolio inquiry',
  /** If mailto does nothing: 'gmail' | 'outlook' web compose */
  webMailFallback: 'gmail',
  /** Full URLs work best */
  linkedin: 'https://www.linkedin.com/in/edwardhan86/',
  github: 'https://github.com/YOUR_USERNAME',
  /** PDFs in `public/` — paths are resolved with `publicAsset()` for GitHub Pages base */
  resumeFile: 'resume_edward_han.pdf',
  transcriptFile: 'transcript_edward_han.pdf',
}

export const siteNav = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'work', label: 'Explore', href: '#work' },
  { id: 'contact', label: 'Contact', href: '#contact' },
]
