// Extended mock data for additional pages

export const pricingData = {
  headline: "Simple, Transparent Pricing",
  subheadline: "Choose the plan that's right for your business",
  plans: [
    {
      id: 1,
      name: "Starter",
      price: "$499",
      period: "per month",
      description: "Perfect for small businesses just getting started",
      features: [
        "Up to 5 team members",
        "Basic analytics dashboard",
        "Email support",
        "1 project at a time",
        "Standard templates",
        "48-hour response time"
      ],
      highlighted: false,
      ctaText: "Get Started"
    },
    {
      id: 2,
      name: "Professional",
      price: "$999",
      period: "per month",
      description: "Ideal for growing businesses with bigger ambitions",
      features: [
        "Up to 20 team members",
        "Advanced analytics & reporting",
        "Priority email & phone support",
        "Up to 5 concurrent projects",
        "Custom templates",
        "24-hour response time",
        "API access",
        "Dedicated account manager"
      ],
      highlighted: true,
      ctaText: "Start Free Trial"
    },
    {
      id: 3,
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      description: "For large organizations with complex requirements",
      features: [
        "Unlimited team members",
        "Custom analytics solutions",
        "24/7 premium support",
        "Unlimited projects",
        "White-label options",
        "1-hour response time",
        "Full API access",
        "Dedicated success team",
        "Custom integrations",
        "SLA guarantee"
      ],
      highlighted: false,
      ctaText: "Contact Sales"
    }
  ]
};

export const faqData = {
  headline: "Frequently Asked Questions",
  subheadline: "Find answers to common questions about our services",
  categories: [
    {
      name: "General",
      questions: [
        {
          id: 1,
          question: "What services do you offer?",
          answer: "We offer a comprehensive range of business services including consulting, digital solutions, customer support, and business growth strategies. Each service is tailored to meet your specific business needs and goals."
        },
        {
          id: 2,
          question: "How do I get started with your services?",
          answer: "Getting started is easy! Simply schedule a free consultation through our website or contact us directly. We'll discuss your needs, understand your goals, and create a customized plan for your business."
        },
        {
          id: 3,
          question: "Do you offer custom solutions?",
          answer: "Absolutely! We specialize in creating tailored solutions that fit your unique business requirements. Our team will work closely with you to understand your challenges and develop strategies that address them effectively."
        }
      ]
    },
    {
      name: "Pricing & Billing",
      questions: [
        {
          id: 4,
          question: "What are your payment terms?",
          answer: "We offer flexible payment options including monthly and annual billing. For enterprise clients, we can create custom payment schedules. All payments can be made via credit card, bank transfer, or check."
        },
        {
          id: 5,
          question: "Do you offer refunds?",
          answer: "We offer a 30-day money-back guarantee on all our services. If you're not satisfied with our work within the first 30 days, we'll provide a full refund, no questions asked."
        },
        {
          id: 6,
          question: "Are there any hidden fees?",
          answer: "No hidden fees, ever. The price we quote is the price you pay. We believe in transparent pricing and will always discuss any potential additional costs upfront before starting any work."
        }
      ]
    },
    {
      name: "Support",
      questions: [
        {
          id: 7,
          question: "What kind of support do you offer?",
          answer: "We offer multiple support channels including email, phone, and live chat. Professional and Enterprise plans include priority support with dedicated account managers and faster response times."
        },
        {
          id: 8,
          question: "What are your support hours?",
          answer: "Our standard support hours are Monday to Friday, 9 AM to 6 PM in your local timezone. Enterprise clients have access to 24/7 premium support for critical issues."
        },
        {
          id: 9,
          question: "How quickly can I expect a response?",
          answer: "Response times vary by plan: Starter plans receive responses within 48 hours, Professional plans within 24 hours, and Enterprise plans within 1 hour for critical issues."
        }
      ]
    },
    {
      name: "Technical",
      questions: [
        {
          id: 10,
          question: "Do you integrate with other platforms?",
          answer: "Yes, we integrate with most major business platforms including CRM systems, marketing automation tools, and analytics platforms. Custom integrations are available for Enterprise clients."
        },
        {
          id: 11,
          question: "Is my data secure?",
          answer: "Security is our top priority. We use industry-standard encryption, regular security audits, and comply with GDPR and other data protection regulations. Your data is always safe with us."
        },
        {
          id: 12,
          question: "Do you offer API access?",
          answer: "API access is available on Professional and Enterprise plans. Our well-documented REST API allows you to integrate our services into your existing workflows and applications."
        }
      ]
    }
  ]
};

export const portfolioData = {
  headline: "Our Portfolio",
  subheadline: "Explore our successful projects and client work",
  categories: ["All", "Web Development", "Consulting", "Digital Marketing", "Brand Design"],
  projects: [
    {
      id: 1,
      title: "TechCorp Digital Transformation",
      category: "Consulting",
      description: "Complete digital transformation strategy for a Fortune 500 tech company, resulting in 40% efficiency improvement.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      client: "TechCorp Inc.",
      year: "2025"
    },
    {
      id: 2,
      title: "E-Commerce Platform Redesign",
      category: "Web Development",
      description: "Modern e-commerce platform with 200% increase in conversion rates and improved user experience.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
      client: "ShopMax",
      year: "2025"
    },
    {
      id: 3,
      title: "Global Marketing Campaign",
      category: "Digital Marketing",
      description: "Multi-channel marketing campaign reaching 5 million users across 12 countries.",
      image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&q=80",
      client: "GlobalBrands",
      year: "2024"
    },
    {
      id: 4,
      title: "Healthcare App Development",
      category: "Web Development",
      description: "HIPAA-compliant healthcare management application serving 50,000+ patients.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
      client: "MedCare Health",
      year: "2024"
    },
    {
      id: 5,
      title: "Startup Brand Identity",
      category: "Brand Design",
      description: "Complete brand identity package including logo, guidelines, and marketing materials.",
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80",
      client: "InnovateLab",
      year: "2025"
    },
    {
      id: 6,
      title: "Financial Services Portal",
      category: "Web Development",
      description: "Secure financial services portal with real-time data integration and reporting.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      client: "FinanceFirst",
      year: "2024"
    },
    {
      id: 7,
      title: "Retail Strategy Consulting",
      category: "Consulting",
      description: "Omnichannel retail strategy leading to 35% revenue growth in first year.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
      client: "RetailGiant",
      year: "2025"
    },
    {
      id: 8,
      title: "Social Media Rebrand",
      category: "Digital Marketing",
      description: "Complete social media rebrand resulting in 300% follower growth and improved engagement.",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
      client: "TrendSetters",
      year: "2025"
    }
  ]
};

export const blogData = {
  headline: "Latest Insights",
  subheadline: "Stay updated with industry trends, tips, and best practices",
  posts: [
    {
      id: 1,
      slug: "digital-transformation-2025",
      title: "Digital Transformation Trends for 2025",
      excerpt: "Discover the key digital transformation trends that will shape businesses in 2025 and beyond.",
      content: `<p>Digital transformation continues to evolve at a rapid pace, and 2025 brings new opportunities and challenges for businesses worldwide. In this comprehensive guide, we explore the key trends that will define the digital landscape this year.</p>
      
<h2>1. AI-Powered Automation</h2>
<p>Artificial intelligence is no longer just a buzzword – it's becoming integral to business operations. From customer service chatbots to predictive analytics, AI is helping businesses make smarter decisions faster than ever before.</p>

<h2>2. Hybrid Work Solutions</h2>
<p>The hybrid work model is here to stay. Companies are investing in technologies that enable seamless collaboration between remote and in-office teams, including advanced video conferencing, project management tools, and virtual workspaces.</p>

<h2>3. Edge Computing</h2>
<p>As IoT devices proliferate, edge computing is becoming essential for processing data closer to its source. This reduces latency and enables real-time decision-making for critical applications.</p>

<h2>4. Cybersecurity Evolution</h2>
<p>With increased digitization comes increased cyber threats. Organizations are adopting zero-trust security models and investing in advanced threat detection and response capabilities.</p>

<h2>Conclusion</h2>
<p>Staying ahead in the digital age requires continuous adaptation and investment in emerging technologies. Contact us to learn how we can help your business navigate these trends successfully.</p>`,
      author: "Sarah Johnson",
      authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
      date: "2025-01-15",
      readTime: "8 min read",
      category: "Digital Transformation",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
      tags: ["Digital Transformation", "Technology", "Business Strategy"]
    },
    {
      id: 2,
      slug: "customer-experience-strategies",
      title: "5 Strategies to Elevate Customer Experience",
      excerpt: "Learn proven strategies to enhance customer experience and build lasting relationships with your clients.",
      content: `<p>Customer experience has become the primary differentiator in today's competitive marketplace. Here are five proven strategies to elevate your customer experience and build lasting relationships.</p>
      
<h2>1. Personalization at Scale</h2>
<p>Use data analytics to understand customer preferences and deliver personalized experiences across all touchpoints. From product recommendations to targeted communications, personalization drives engagement and loyalty.</p>

<h2>2. Omnichannel Consistency</h2>
<p>Ensure a seamless experience across all channels – website, mobile app, social media, and physical locations. Customers should be able to start an interaction on one channel and continue on another without friction.</p>

<h2>3. Proactive Support</h2>
<p>Don't wait for customers to report issues. Use predictive analytics to identify potential problems and reach out proactively with solutions. This builds trust and demonstrates your commitment to their success.</p>

<h2>4. Employee Empowerment</h2>
<p>Empower your frontline employees to make decisions that benefit customers. Remove unnecessary approval processes and give them the tools and authority to resolve issues quickly.</p>

<h2>5. Continuous Feedback Loop</h2>
<p>Regularly collect and act on customer feedback. Use surveys, reviews, and direct conversations to understand what's working and what needs improvement.</p>`,
      author: "Michael Chen",
      authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80",
      date: "2025-01-10",
      readTime: "6 min read",
      category: "Customer Experience",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
      tags: ["Customer Experience", "Business Growth", "Strategy"]
    },
    {
      id: 3,
      slug: "scaling-your-startup",
      title: "How to Scale Your Startup Successfully",
      excerpt: "A comprehensive guide to scaling your startup while maintaining quality and culture.",
      content: `<p>Scaling a startup is both exciting and challenging. This guide provides practical advice for growing your business while maintaining the quality and culture that made you successful.</p>
      
<h2>Build Scalable Systems</h2>
<p>Before aggressive growth, ensure your systems can handle increased demand. This includes technology infrastructure, customer support processes, and financial systems.</p>

<h2>Hire Strategically</h2>
<p>Growth requires the right team. Focus on hiring people who not only have the skills you need but also fit your company culture and can grow with the organization.</p>

<h2>Maintain Culture</h2>
<p>As you grow, it becomes harder to maintain the startup culture that drove your early success. Document your values, communicate them clearly, and make them part of your hiring and performance processes.</p>

<h2>Focus on Unit Economics</h2>
<p>Ensure your business model works at scale. Understand your customer acquisition costs, lifetime value, and margins before investing heavily in growth.</p>`,
      author: "Emily Rodriguez",
      authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
      date: "2025-01-05",
      readTime: "10 min read",
      category: "Entrepreneurship",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80",
      tags: ["Startups", "Business Growth", "Entrepreneurship"]
    },
    {
      id: 4,
      slug: "remote-team-management",
      title: "Effective Remote Team Management Tips",
      excerpt: "Best practices for managing remote teams and maintaining productivity in a distributed workforce.",
      content: `<p>Managing remote teams effectively requires different strategies than traditional office management. Here are proven tips for leading distributed teams successfully.</p>
      
<h2>Clear Communication</h2>
<p>Over-communicate in a remote setting. Use multiple channels, set clear expectations, and ensure everyone understands project goals and deadlines.</p>

<h2>Trust Your Team</h2>
<p>Focus on results rather than hours worked. Trust your team members to manage their time and deliver quality work.</p>

<h2>Regular Check-ins</h2>
<p>Schedule regular one-on-ones and team meetings to maintain connection and catch issues early. Video calls help maintain the human element of work relationships.</p>`,
      author: "David Kim",
      authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
      date: "2024-12-28",
      readTime: "5 min read",
      category: "Management",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
      tags: ["Remote Work", "Management", "Productivity"]
    },
    {
      id: 5,
      slug: "data-driven-marketing",
      title: "The Power of Data-Driven Marketing",
      excerpt: "How to leverage data analytics to create more effective marketing campaigns.",
      content: `<p>Data-driven marketing enables businesses to make informed decisions and create targeted campaigns that resonate with their audience. Learn how to harness the power of data in your marketing efforts.</p>
      
<h2>Collect the Right Data</h2>
<p>Focus on collecting data that provides actionable insights. This includes customer behavior data, campaign performance metrics, and market trends.</p>

<h2>Analyze and Segment</h2>
<p>Use analytics tools to segment your audience and understand their preferences. This enables personalized messaging that increases engagement and conversion rates.</p>

<h2>Test and Optimize</h2>
<p>Continuously test different approaches and optimize based on results. A/B testing, multivariate testing, and attribution modeling help improve campaign performance over time.</p>`,
      author: "Lisa Wang",
      authorImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&q=80",
      date: "2024-12-20",
      readTime: "7 min read",
      category: "Marketing",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      tags: ["Marketing", "Data Analytics", "Digital Marketing"]
    },
    {
      id: 6,
      slug: "sustainable-business-practices",
      title: "Building a Sustainable Business Model",
      excerpt: "How to integrate sustainability into your business strategy for long-term success.",
      content: `<p>Sustainability is no longer optional – it's a business imperative. Learn how to build sustainable practices into your business model for long-term success.</p>
      
<h2>Environmental Responsibility</h2>
<p>Reduce your environmental footprint through energy efficiency, waste reduction, and sustainable sourcing. This not only benefits the planet but often reduces costs.</p>

<h2>Social Impact</h2>
<p>Consider the social impact of your business decisions. This includes fair labor practices, community engagement, and diversity and inclusion initiatives.</p>

<h2>Governance</h2>
<p>Strong governance ensures ethical business practices and accountability. Transparent reporting and stakeholder engagement build trust with customers, employees, and investors.</p>`,
      author: "James Wilson",
      authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
      date: "2024-12-15",
      readTime: "6 min read",
      category: "Sustainability",
      image: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=800&q=80",
      tags: ["Sustainability", "Business Strategy", "ESG"]
    }
  ]
};

export const calendlyConfig = {
  // Placeholder - replace with actual Calendly URL
  url: "https://calendly.com/your-business/30min",
  headline: "Schedule a Consultation",
  subheadline: "Book a free 30-minute call to discuss your business needs"
};

export const googleMapsConfig = {
  // Placeholder - replace with actual Google Maps embed URL
  embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878428698!3d40.74076684379132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sGoogle!5e0!3m2!1sen!2sus!4v1635786994961!5m2!1sen!2sus",
  address: "123 Business Street, Suite 100, New York, NY 10001",
  phone: "+1 (555) 123-4567",
  email: "hello@yourbusiness.com"
};
