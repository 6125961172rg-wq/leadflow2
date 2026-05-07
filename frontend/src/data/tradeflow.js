// TradeFlow Marketing - Site Data

export const companyInfo = {
  name: "TradeFlow",
  tagline: "PERFORMANCE MARKETING FOR THE TRADES",
  description: "TradeFlow is the performance marketing agency built exclusively for residential trades contractors. Google Ads, Meta, SEO, and AI-powered lead follow-up — done for you, every month.",
  email: "hello@tradeflowmarketing.com",
  phone: "+1 (555) 123-4567",
};

export const heroData = {
  badge: "One contractor per market — guaranteed",
  headline: "Your phone should be",
  headlineEmphasis: "ringing off the hook.",
  headlineSuffix: "We make that happen.",
  description: "TradeFlow is the performance marketing agency built exclusively for residential trades contractors. Google Ads, Meta, SEO, and AI-powered lead follow-up — done for you, every month.",
  ctaPrimary: "Claim your territory",
  ctaSecondary: "See pricing",
  features: [
    "No long-term contracts",
    "Fixed monthly pricing",
    "Exclusive territory protection",
    "Live lead dashboard"
  ]
};

export const statsData = [
  { value: "22×", label: "Average return on ad spend" },
  { value: "60s", label: "AI lead response time — even at 2am" },
  { value: "5×", label: "More lead contact with automation" },
  { value: "<5%", label: "Monthly churn — clients stay because results stick" }
];

export const tradesData = [
  "Roofing",
  "Plumbing", 
  "Electrical",
  "HVAC",
  "Concrete & Masonry",
  "Decks & Fencing",
  "Landscaping",
  "General Contracting",
  "Renovations",
  "Windows & Doors",
  "Insulation",
  "Painting"
];

export const leadMachineSteps = [
  {
    step: "01",
    label: "Search",
    title: "Hyper-targeted Google Ads",
    description: "High-intent keywords built around your trade and geography. Homeowners searching right now see you first."
  },
  {
    step: "02",
    label: "Convert",
    title: "Conversion landing pages",
    description: "Purpose-built pages with one goal: turn clicks into calls and form fills — not your general website."
  },
  {
    step: "03",
    label: "Dominate",
    title: "Google Business Profile",
    description: "Own the local map pack. Reviews, weekly posts, and Google Guaranteed badge on Growth and above."
  },
  {
    step: "04",
    label: "Reach",
    title: "Meta retargeting ads",
    description: "Stay in front of homeowners who visited your page. Facebook and Instagram reinforce your brand locally."
  },
  {
    step: "05",
    label: "Close",
    title: "AI lead nurture 24/7",
    description: "Every lead gets an SMS response in 60 seconds. AI pre-qualifies, books appointments, and follows up for 14 days."
  }
];

export const pricingPlans = [
  {
    id: "starter",
    name: "Starter",
    subtitle: "Solo operator",
    description: "Owner-operators and small crews getting started with digital marketing.",
    price: "$800–$1,200",
    period: "/mo",
    adSpend: "$500–1,000/mo ad spend (billed direct to Google/Meta)",
    setupFee: "$500 one-time setup fee",
    territory: "Trade + 15 km radius",
    features: [
      { text: "Google Search Ads management", included: true },
      { text: "Meta (Facebook/Instagram) Ads", included: true },
      { text: "Custom landing page (built & hosted)", included: true },
      { text: "Google Business Profile optimization", included: true },
      { text: "AI lead follow-up automation", included: true },
      { text: "Monthly performance report", included: true },
      { text: "SEO content posts", included: false },
      { text: "Google Local Services Ads", included: false },
      { text: "Live lead dashboard", included: false }
    ],
    highlighted: false
  },
  {
    id: "growth",
    name: "Growth",
    subtitle: "5–15 crew",
    description: "Growing operations ready to dominate their local market consistently.",
    price: "$1,500–$2,000",
    period: "/mo",
    adSpend: "$1,500–3,000/mo ad spend (billed direct to Google/Meta)",
    setupFee: "$750 one-time setup fee",
    territory: "Trade + 25 km radius",
    features: [
      { text: "Everything in Starter", included: true },
      { text: "SEO content (2 posts/month)", included: true },
      { text: "Google Local Services (Google Guaranteed)", included: true },
      { text: "Live lead-tracking dashboard", included: true },
      { text: "Dedicated Slack channel", included: true },
      { text: "Monthly performance call", included: true },
      { text: "Quarterly strategy review", included: true }
    ],
    highlighted: true
  },
  {
    id: "market-leader",
    name: "Market Leader",
    subtitle: "15+ crew",
    description: "Established operations ready to own their market and lock out every competitor.",
    price: "$2,500–$3,500",
    period: "/mo",
    adSpend: "$3,000–6,000/mo ad spend (billed direct to Google/Meta)",
    setupFee: "$1,000 one-time setup fee",
    territory: "Trade + 50 km radius",
    features: [
      { text: "Everything in Growth", included: true },
      { text: "SEO content (4 posts/month)", included: true },
      { text: "50 km exclusive territory lock", included: true },
      { text: "AI monthly report summary", included: true },
      { text: "Predictive spend optimization", included: true },
      { text: "Reputation management automation", included: true },
      { text: "Priority account management", included: true }
    ],
    highlighted: false
  }
];

export const includedFeatures = [
  {
    title: "No long-term contracts",
    description: "Month-to-month, cancel anytime. We keep you because results keep you."
  },
  {
    title: "Fixed pricing always",
    description: "Your retainer never changes as ad spend scales. No surprise invoices."
  },
  {
    title: "Exclusive territory lock",
    description: "Once you claim your trade and area, no competitor joins TradeFlow in your market."
  },
  {
    title: "10-day launch guarantee",
    description: "Campaigns built and live within 10 business days of onboarding completion."
  }
];

export const claimSteps = [
  {
    step: 1,
    title: "We audit your market.",
    description: "We check Google rankings, competitor ad spend, and your current online presence in your city."
  },
  {
    step: 2,
    title: "You get a free report.",
    description: "Within one business day we send a personalized audit showing exactly where you're losing leads to competitors right now."
  },
  {
    step: 3,
    title: "We schedule a 20-minute call.",
    description: "We walk through the findings, recommend a plan, and confirm your territory exclusivity — no hard sell."
  }
];

export const teamSizes = [
  { value: "solo", label: "Solo operator (1)" },
  { value: "small", label: "Small crew (2–4)" },
  { value: "mid", label: "Mid-size (5–15)" },
  { value: "large", label: "Large (15+)" }
];
