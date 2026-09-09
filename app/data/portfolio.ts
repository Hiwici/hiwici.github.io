export type ResourceType = 'forest' | 'field' | 'mountain' | 'pasture' | 'harbor'

export interface PortfolioTile {
  id: string
  title: string
  eyebrow: string
  resource: ResourceType
  x: number
  y: number
  icon: string
  accent: string
  introduction: string
  highlights: string[]
  tags: string[]
  cta?: string
}

export const portfolioTiles: PortfolioTile[] = [
  {
    id: 'about',
    title: 'About me',
    eyebrow: 'Home tile',
    resource: 'forest',
    x: 0,
    y: 0,
    icon: '⌂',
    accent: 'from-emerald-300 to-teal-500',
    introduction:
      'A curious product-minded developer who turns friendly ideas into considered digital places.',
    highlights: [
      'Based between code, illustration, and long walks for fresh ideas.',
      'I care about clear systems, tiny delightful details, and products people remember.',
      'Currently collecting sketches, recipes, and great interface references.',
    ],
    tags: ['Creative developer', 'UI craft', 'Open to collaborate'],
  },
  {
    id: 'skills',
    title: 'Skill grove',
    eyebrow: 'My toolkit',
    resource: 'pasture',
    x: -1,
    y: -1,
    icon: '✦',
    accent: 'from-lime-300 to-emerald-500',
    introduction: 'Tools I reach for to make experiences feel calm, useful, and full of character.',
    highlights: [
      'Vue, Nuxt, TypeScript, and component systems for sturdy front-end foundations.',
      'Interaction design, prototyping, and animation that gives interfaces a little life.',
      'Figma, visual direction, and thoughtful hand-off across design and engineering.',
    ],
    tags: ['Vue / Nuxt', 'TypeScript', 'Tailwind CSS', 'UX motion'],
  },
  {
    id: 'projects',
    title: 'Project peaks',
    eyebrow: 'Selected work',
    resource: 'mountain',
    x: 1,
    y: -1,
    icon: '▲',
    accent: 'from-violet-300 to-indigo-500',
    introduction: 'A few expeditions where strategy, interface craft, and technology meet.',
    highlights: [
      'A playful visual identity and storefront for an independent maker.',
      'A focused dashboard that helps a small team find the signal in their data.',
      'An experimental web toy built to make learning feel like a game.',
    ],
    tags: ['Product design', 'Web apps', 'Experiments'],
    cta: 'Ask me about a project',
  },
  {
    id: 'journey',
    title: 'Golden fields',
    eyebrow: 'My journey',
    resource: 'field',
    x: 1,
    y: 1,
    icon: '↗',
    accent: 'from-amber-200 to-orange-400',
    introduction: 'A path made from learning in public, making often, and sharing what I discover.',
    highlights: [
      'Started with a fascination for how games guide people through complex worlds.',
      'Grew into designing and building interfaces where every interaction has a reason.',
      'Always looking for the next kind team and meaningful challenge to learn from.',
    ],
    tags: ['Always learning', 'Team player', 'Game-inspired'],
  },
  {
    id: 'contact',
    title: 'Harbor hello',
    eyebrow: 'Let’s connect',
    resource: 'harbor',
    x: -1,
    y: 1,
    icon: '✉',
    accent: 'from-sky-300 to-cyan-500',
    introduction:
      'Have a friendly idea, a creative brief, or simply want to exchange recommendations?',
    highlights: [
      'Email: hello@example.com',
      'Find my current experiments and notes on social platforms.',
      'I am happiest collaborating with kind people who care about the details.',
    ],
    tags: ['Freelance', 'Collaborations', 'Coffee chats'],
    cta: 'Send a message',
  },
]
