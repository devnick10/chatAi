export interface Feature {
  name: string;
  included: boolean;
  highlight?: boolean;
}

export interface CTA {
  text: string;
  href?: string;
  onClick?: () => void;
}

interface Plan {
  name: string;
  price: number;
  interval: string;
  description: string;
  highlight?: boolean;
  features: Feature[];
  cta: CTA;
}

export const plans: Plan[] = [
  {
    name: "Free",
    price: 0,
    interval: "forever",
    description: "Perfect for getting started with AI aggregation",
    features: [
      { name: "100 queries per month", included: true },
      { name: "Access to 3 AI models", included: true },
      { name: "Basic analytics", included: true },
      { name: "Community support", included: true },
      { name: "Standard response time", included: true },
      { name: "API access", included: false },
      { name: "Custom integrations", included: false },
    ],
    cta: {
      text: "Start for free",
      href: "/signin",
    },
  },
  {
    name: "Pro",
    price: 8,
    interval: "monthly",
    description: "Ideal for professionals and growing teams",
    highlight: true,
    features: [
      { name: "Unlimited queries", included: true },
      { name: "Access to all AI models", included: true },
      { name: "Advanced analytics", included: true },
      { name: "Priority support", included: true },
      { name: "Custom integrations", included: true },
      { name: "API access", included: true, highlight: true },
      { name: "Team collaboration", included: true },
    ],
    cta: {
      text: "Upgrade to Pro",
      href: "/signin",
    },
  },
  {
    name: "Enterprise",
    price: 0,
    interval: "contact us",
    description: "Tailored solutions for large organizations",
    features: [
      { name: "Everything in Pro", included: true },
      { name: "Dedicated infrastructure", included: true },
      { name: "SLA guarantees", included: true },
      { name: "Custom model training", included: true },
      { name: "On-premise deployment", included: true },
      { name: "Dedicated support team", included: true },
      { name: "Advanced security features", included: true },
    ],
    cta: {
      text: "Contact sales",
      onClick: () => console.log("Contact sales clicked"),
    },
  },
]

export interface Testimonial {
  id: number;
  quote: string;
  name: string;
  company: string;
  avatar: string;
  featured: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "This AI assistant has completely transformed how I work. From writing emails to planning complex projects, it handles everything with remarkable intelligence and understanding.",
    name: "Annette Black",
    company: "Sony",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%201171275494-4-qMafHzyfZxs0dpGYhdbWbRHswRjWl7.png",
    featured: true
  },
  {
    id: 2,
    quote: "Integrating this AI into my daily workflow was seamless. It saved me hours of work each week by handling routine tasks and complex research alike.",
    name: "Dianne Russell",
    company: "McDonald's",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%201171275494-3-FAI1sjNYP2Y0bSsXrq4xDeJeR0Qimy.png",
    featured: false
  },
  {
    id: 3,
    quote: "The multi-tasking capability is incredible. I can switch from data analysis to creative writing to planning without losing context or quality.",
    name: "Cameron Williamson",
    company: "IBM",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%201171275494-2-8CtKRDNCORx2jc8RSQwxo59erTxZTJ.png",
    featured: false
  },
  {
    id: 4,
    quote: "We no longer juggle multiple specialized tools. This one AI handles all our needs across different departments and use cases.",
    name: "Robert Fox",
    company: "MasterCard",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%201171275494-5-mhWfY5xW4fWennYjznJ4Lot5eXYGdt.png",
    featured: false
  },
  {
    id: 5,
    quote: "Started with the free plan to test it out, but upgraded within days. Now I can't imagine my workday without this AI assistant.",
    name: "Darlene Robertson",
    company: "Ferrari",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%201171275494-1-w4FBr5TSqiRuL4Ejkk6Hl6qZHobFaK.png",
    featured: false
  },
  {
    id: 6,
    quote: "Collaboration feels effortless now. The AI maintains context across different conversations and team members, making group projects incredibly smooth.",
    name: "Cody Fisher",
    company: "Apple",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%201171275494-O0uFsty8qjC3hOSRgQSfOVRxuzh4rK.png",
    featured: false
  },
  {
    id: 7,
    quote: "From complex research to simple daily tasks, this AI delivers consistent quality. It's like having a brilliant assistant who never sleeps and always understands exactly what I need.",
    name: "Albert Flores",
    company: "Louis Vuitton",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sss-OievisDuoAbHqA7oOHwTfWfuRpf7YN.png",
    featured: true
  }
];


