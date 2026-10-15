export interface CategorizedService {
  name: string;
  category: string;
  defaultPrice: number;
  description: string;
  icon?: string;
}

export interface ServiceCategory {
  id: string;
  code: string;
  title: string;
  color: string;
  services: CategorizedService[];
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "digital-presence",
    code: "01",
    title: "DIGITAL PRESENCE",
    color: "#00a6ff",
    services: [
      {
        name: "Domain & Hosting",
        category: "DIGITAL PRESENCE",
        defaultPrice: 4500,
        description: "1 Year High-Speed Cloud SSD Hosting, Free SSL Certificate & Domain setup with 99.9% uptime."
      },
      {
        name: "Static Website",
        category: "DIGITAL PRESENCE",
        defaultPrice: 18000,
        description: "Modern, responsive 5-page static website built with blazing fast Next.js/HTML5, mobile optimized."
      },
      {
        name: "Dynamic Website",
        category: "DIGITAL PRESENCE",
        defaultPrice: 35000,
        description: "Website + SEO (City Focused), interactive CMS, lead capture forms, responsive across all devices."
      },
      {
        name: "E-Commerce Website",
        category: "DIGITAL PRESENCE",
        defaultPrice: 55000,
        description: "Full-fledged online store with catalog, payment gateway integration, order tracking & cart management."
      },
      {
        name: "Web Application",
        category: "DIGITAL PRESENCE",
        defaultPrice: 75000,
        description: "Custom cloud-based web application with role-based dashboard, database architecture & secure auth."
      },
      {
        name: "UI/UX Design",
        category: "DIGITAL PRESENCE",
        defaultPrice: 25000,
        description: "Bespoke Figma UI/UX prototyping, design system, interactive wireframes & responsive layouts."
      }
    ]
  },
  {
    id: "digital-marketing",
    code: "02",
    title: "DIGITAL MARKETING",
    color: "#0072ff",
    services: [
      {
        name: "SEO / AEO / GEO",
        category: "DIGITAL MARKETING",
        defaultPrice: 22000,
        description: "Search Engine Optimization, AI Engine Optimization (AEO), Generative Engine Optimization & keywords."
      },
      {
        name: "Google Ads",
        category: "DIGITAL MARKETING",
        defaultPrice: 28000,
        description: "Google Search, Display & Performance Max ad campaigns setup, A/B testing & weekly ROI optimization."
      },
      {
        name: "Meta Ads",
        category: "DIGITAL MARKETING",
        defaultPrice: 25000,
        description: "Targeted Facebook & Instagram Ads with creative banner designs, audience retargeting & lead generation."
      },
      {
        name: "Digital Marketing",
        category: "DIGITAL MARKETING",
        defaultPrice: 35000,
        description: "Complete 360-degree digital marketing plan across search, social, remarketing & brand building."
      },
      {
        name: "Social Media Marketing",
        category: "DIGITAL MARKETING",
        defaultPrice: 20000,
        description: "Monthly content strategy, 12 engaging graphic posts, reel scripts, community engagement & hashtag matrix."
      },
      {
        name: "YouTube Marketing",
        category: "DIGITAL MARKETING",
        defaultPrice: 25000,
        description: "Channel SEO optimization, video metadata, thumbnail design, promotional campaign management."
      },
      {
        name: "Local SEO",
        category: "DIGITAL MARKETING",
        defaultPrice: 15000,
        description: "Google My Business (GMB) ranking optimization, local citations, customer reviews strategy & map pack."
      },
      {
        name: "Graphic Design & Video",
        category: "DIGITAL MARKETING",
        defaultPrice: 18000,
        description: "High-resolution corporate marketing graphics, promotional motion videos, banners & brand assets."
      }
    ]
  },
  {
    id: "software-enterprise",
    code: "03",
    title: "SOFTWARE & ENTERPRISE",
    color: "#ff8c00",
    services: [
      {
        name: "ERP / CRM / HRMS",
        category: "SOFTWARE & ENTERPRISE",
        defaultPrice: 95000,
        description: "Tailored enterprise ERP/CRM module with staff attendance, payroll, leads pipeline & analytical reports."
      },
      {
        name: "Custom Software",
        category: "SOFTWARE & ENTERPRISE",
        defaultPrice: 85000,
        description: "Custom enterprise software built specifically around your business workflow and requirements."
      },
      {
        name: "Web App Dev",
        category: "SOFTWARE & ENTERPRISE",
        defaultPrice: 60000,
        description: "High-performance full-stack web application with scalable REST/GraphQL backend and real-time updates."
      },
      {
        name: "Mobile App Dev",
        category: "SOFTWARE & ENTERPRISE",
        defaultPrice: 70000,
        description: "Cross-platform iOS and Android mobile app development with push notifications and offline sync."
      },
      {
        name: "SaaS Development",
        category: "SOFTWARE & ENTERPRISE",
        defaultPrice: 110000,
        description: "Multi-tenant Software-as-a-Service product with subscription billing, admin dashboard & API keys."
      },
      {
        name: "API Integration",
        category: "SOFTWARE & ENTERPRISE",
        defaultPrice: 22000,
        description: "Seamless third-party API connectivity (Payment, SMS, WhatsApp, Logistics, Accounting & CRM)."
      },
      {
        name: "Workflow Automation",
        category: "SOFTWARE & ENTERPRISE",
        defaultPrice: 28000,
        description: "End-to-end automated business workflows connecting forms, databases, notifications and team alerts."
      }
    ]
  },
  {
    id: "ai-advanced-tech",
    code: "04",
    title: "AI & ADVANCED TECH",
    color: "#00d4ff",
    services: [
      {
        name: "AI Solutions",
        category: "AI & ADVANCED TECH",
        defaultPrice: 80000,
        description: "Custom LLM integrations, document intelligence, automated reasoning and predictive business models."
      },
      {
        name: "AI Automation",
        category: "AI & ADVANCED TECH",
        defaultPrice: 55000,
        description: "Intelligent autonomous agents automating repetitive administrative, data-entry and customer operations."
      },
      {
        name: "AI Chatbots",
        category: "AI & ADVANCED TECH",
        defaultPrice: 38000,
        description: "24/7 custom AI customer support chatbot trained on proprietary company docs with CRM lead sync."
      },
      {
        name: "Data Analytics / BI",
        category: "AI & ADVANCED TECH",
        defaultPrice: 42000,
        description: "Interactive PowerBI / Metabase live analytics dashboards, KPI monitoring and forecasting models."
      },
      {
        name: "IoT Solutions",
        category: "AI & ADVANCED TECH",
        defaultPrice: 75000,
        description: "Hardware telemetry data capture, real-time device management dashboard and MQTT cloud streaming."
      },
      {
        name: "Cloud Solutions",
        category: "AI & ADVANCED TECH",
        defaultPrice: 35000,
        description: "AWS / Azure cloud infrastructure setup, containerization, auto-scaling, VPC security and monitoring."
      },
      {
        name: "DevOps & CI/CD",
        category: "AI & ADVANCED TECH",
        defaultPrice: 32000,
        description: "Automated GitHub Actions deployment pipeline, zero-downtime releases and infrastructure as code."
      },
      {
        name: "Cyber Security",
        category: "AI & ADVANCED TECH",
        defaultPrice: 48000,
        description: "Vulnerability assessment, penetration testing, security audit and compliance hardening."
      }
    ]
  },
  {
    id: "support-maintenance",
    code: "05",
    title: "SUPPORT & MAINTENANCE",
    color: "#ffa500",
    services: [
      {
        name: "Website Maintenance",
        category: "SUPPORT & MAINTENANCE",
        defaultPrice: 12000,
        description: "Monthly security patches, plugin updates, database backups, uptime monitoring and content tweaks."
      },
      {
        name: "Software Maintenance",
        category: "SUPPORT & MAINTENANCE",
        defaultPrice: 25000,
        description: "Ongoing bug fixes, performance monitoring, server patch management and quarterly improvements."
      },
      {
        name: "AMC & Technical Support",
        category: "SUPPORT & MAINTENANCE",
        defaultPrice: 30000,
        description: "Annual Maintenance Contract with priority SLA support, dedicated engineer assistance & disaster recovery."
      }
    ]
  },
  {
    id: "whatsapp-call-automation",
    code: "06",
    title: "WHATSAPP & CALL AUTOMATION",
    color: "#25d366",
    services: [
      {
        name: "Auto WhatsApp Message After Call",
        category: "WHATSAPP & CALL AUTOMATION",
        defaultPrice: 4199,
        description: "Instant WhatsApp message triggered automatically when call ends (incoming, outgoing & missed calls). Supports text, images, videos, PDFs & links. Includes SIM-based rules, internal contact blacklist, repeat-message time gap control, multi-language templates, and silent background execution."
      },
      {
        name: "WhatsApp Chatbot Automation",
        category: "WHATSAPP & CALL AUTOMATION",
        defaultPrice: 9999,
        description: "24×7 automated customer enquiry handling with interactive button menus, smart lead qualification, instant product/service catalog suggestions, multi-language support, and CRM, payment gateway & backend API integrations."
      },
      {
        name: "WhatsApp Marketing & Broadcast",
        category: "WHATSAPP & CALL AUTOMATION",
        defaultPrice: 5000,
        description: "Targeted broadcast promotional messaging, rich media engagement templates, audience segmentation, click-through tracking, and compliant opt-in audience outreach."
      },
      {
        name: "Auto SMS After Call",
        category: "WHATSAPP & CALL AUTOMATION",
        defaultPrice: 1499,
        description: "Instant automated SMS sent from your own mobile number directly after every call with custom greeting and link (telecom carrier limit up to 100 SMS/day)."
      }
    ]
  },
  {
    id: "smart-branding-reviews",
    code: "07",
    title: "SMART BRANDING & REVIEWS",
    color: "#8b5cf6",
    services: [
      {
        name: "Smart CONNECT QR (AI Review Kit)",
        category: "SMART BRANDING & REVIEWS",
        defaultPrice: 3499,
        description: "Direct-to-Google Review QR code standee & NFC tap card (no app or login needed). Features AI-generated SEO-friendly review suggestions, keyword ranking dashboard, AI auto-replies, and automatic removal of posted suggestions to prevent duplicates. Includes printed acrylic standee & free NFC card."
      },
      {
        name: "Smart Digital Business Profile",
        category: "SMART BRANDING & REVIEWS",
        defaultPrice: 1499,
        description: "Digital business card and interactive mini-website behind one shareable link, plus 365 days of downloadable daily festive greetings, promotional graphics, and brand posts."
      },
      {
        name: "Unified Business Dashboard App",
        category: "SMART BRANDING & REVIEWS",
        defaultPrice: 2999,
        description: "Centralized unified dashboard application to manage call automation triggers, review analytics, keyword tracking, incoming leads, and digital branding toolkit."
      },
      {
        name: "Business Automation Website",
        category: "SMART BRANDING & REVIEWS",
        defaultPrice: 18000,
        description: "Professional corporate website designed for conversion, featuring integrated WhatsApp lead triggers, Smart CONNECT QR links, and unified brand positioning."
      }
    ]
  },
  {
    id: "connectit-annual-plans",
    code: "08",
    title: "CONNECTIT ANNUAL PLANS & BUNDLES",
    color: "#f59e0b",
    services: [
      {
        name: "Starter Plan (Annual)",
        category: "CONNECTIT ANNUAL PLANS & BUNDLES",
        defaultPrice: 1499,
        description: "Includes: Auto SMS after call (sent from your own mobile SIM within 100 SMS/day limit), Smart Digital Business Profile (mini-website link), and 365 days of daily greeting and promotional posts."
      },
      {
        name: "Standard Plan (Annual)",
        category: "CONNECTIT ANNUAL PLANS & BUNDLES",
        defaultPrice: 4199,
        description: "Includes: Everything in Starter Plan + Auto WhatsApp message after call with rich media (Text, Images, Videos, PDFs, Links), SIM-based rules, blacklist internal numbers, and repeat-message time gap control."
      },
      {
        name: "Advance Plan (Annual)",
        category: "CONNECTIT ANNUAL PLANS & BUNDLES",
        defaultPrice: 14199,
        description: "Includes: Everything in Standard Plan + 24×7 WhatsApp Chatbot automation (button-based replies, smart lead qualification, instant product suggestions, multi-language support, CRM & payment integrations)."
      },
      {
        name: "WhatsApp Chatbot (Standalone Annual)",
        category: "CONNECTIT ANNUAL PLANS & BUNDLES",
        defaultPrice: 9999,
        description: "Chatbot features only: 24×7 automated customer enquiry handling, interactive button flows, smart lead qualification, instant product suggestions, multi-language support, and CRM/payment/backend connectivity."
      },
      {
        name: "Smart AI-Review QR Kit (Annual)",
        category: "CONNECTIT ANNUAL PLANS & BUNDLES",
        defaultPrice: 3499,
        description: "Review QR kit: Tap NFC card or scan QR for Google reviews (no app/login required), AI-generated SEO review suggestions, keyword dashboard, AI auto-replies, repeat-suggestion filter, printed acrylic standee & free NFC card."
      },
      {
        name: "Business Growth Plan (All-in-One Annual)",
        category: "CONNECTIT ANNUAL PLANS & BUNDLES",
        defaultPrice: 14999,
        description: "The Complete Automation Suite: Auto SMS after call + Auto WhatsApp after call with media + Smart Digital Business Card + 365 Daily posts + 24×7 WhatsApp Chatbot + Smart AI-Review QR Kit with standee & NFC tap card."
      }
    ]
  }
];

export interface ConnectitPlanMeta {
  id: string;
  name: string;
  price: number;
  badge?: string;
  popular?: boolean;
  tagline: string;
  features: string[];
  serviceItem: CategorizedService;
}

export const CONNECTIT_ANNUAL_PLANS: ConnectitPlanMeta[] = [
  {
    id: "starter",
    name: "Starter Plan",
    price: 1499,
    badge: "Basic Automation",
    tagline: "Essential SMS & digital card toolkit for local businesses",
    features: [
      "Auto SMS after call (from own SIM, max 100 SMS/day)",
      "Smart Digital Business Profile & shareable mini-website link",
      "365 Days of daily greeting & promotional branding posts",
      "Unified dashboard app to manage digital toolkit"
    ],
    serviceItem: {
      name: "Starter Plan (Annual)",
      category: "CONNECTIT ANNUAL PLANS & BUNDLES",
      defaultPrice: 1499,
      description: "Includes: Auto SMS after call (own mobile SIM up to 100 SMS/day), Smart Digital Business Card & mini-website link, and 365 days of daily greeting & promotional posts."
    }
  },
  {
    id: "standard",
    name: "Standard Plan",
    price: 4199,
    badge: "Popular for Sales Teams",
    tagline: "Auto WhatsApp after call with rich media brochures",
    features: [
      "Everything in Starter Plan included",
      "Auto WhatsApp message after every incoming, outgoing & missed call",
      "Rich media support: Text, Images, Videos, PDFs & Links",
      "Custom SIM-specific rules & block internal contacts",
      "Repeat-message time gap control & multi-language templates",
      "Runs completely in the background without interrupting calls"
    ],
    serviceItem: {
      name: "Standard Plan (Annual)",
      category: "CONNECTIT ANNUAL PLANS & BUNDLES",
      defaultPrice: 4199,
      description: "Includes: Starter Plan + Auto WhatsApp after call (with text, images, videos, PDFs & links), SIM rules, number blacklist, repeat-message time gap control & multi-language background engine."
    }
  },
  {
    id: "advance",
    name: "Advance Plan",
    price: 14199,
    badge: "High Conversion",
    tagline: "Auto WhatsApp after call + 24×7 intelligent interactive Chatbot",
    features: [
      "Everything in Standard Plan included",
      "24×7 WhatsApp Chatbot automation with instant replies",
      "Interactive button-based menu flows & smart lead qualification",
      "Instant product & service catalog recommendations",
      "Multi-language conversational support",
      "Integrates with payments, CRM systems & backend databases"
    ],
    serviceItem: {
      name: "Advance Plan (Annual)",
      category: "CONNECTIT ANNUAL PLANS & BUNDLES",
      defaultPrice: 14199,
      description: "Includes: Standard Plan + 24×7 WhatsApp Chatbot automation (interactive buttons, smart lead qualification, product suggestions, multi-language & CRM integration)."
    }
  },
  {
    id: "chatbot-standalone",
    name: "WhatsApp Chatbot",
    price: 9999,
    badge: "Standalone Automation",
    tagline: "24×7 conversational AI & button bot for customer enquiries",
    features: [
      "24×7 automated customer enquiry answering",
      "Interactive button-driven WhatsApp navigation",
      "Intelligent lead qualification & contact capture",
      "Automated product/service recommendations",
      "Multi-language response capabilities",
      "Ready for CRM, webhook & payment gateway integrations"
    ],
    serviceItem: {
      name: "WhatsApp Chatbot (Standalone Annual)",
      category: "CONNECTIT ANNUAL PLANS & BUNDLES",
      defaultPrice: 9999,
      description: "Chatbot features only: 24×7 automated customer enquiry replies, interactive button menus, smart lead qualification, instant product suggestions, multi-language support, and CRM/payment/backend connectivity."
    }
  },
  {
    id: "ai-review-qr",
    name: "Smart AI-Review QR Kit",
    price: 3499,
    badge: "Google Reputation Booster",
    tagline: "Printed acrylic QR standee + tap NFC card with AI SEO review generator",
    features: [
      "Scan QR or Tap NFC to open Google Review page (no app or login required)",
      "AI-generated, SEO-friendly 5-star review suggestions",
      "Dedicated keyword management dashboard to boost Google Map ranking",
      "AI automated replies to posted Google reviews",
      "Posted suggestions auto-removed so reviews never duplicate",
      "High-grade printed acrylic QR standee + free NFC tap card included"
    ],
    serviceItem: {
      name: "Smart AI-Review QR Kit (Annual)",
      category: "CONNECTIT ANNUAL PLANS & BUNDLES",
      defaultPrice: 3499,
      description: "Complete Google Review Kit: QR code & tap NFC card (no app or login required), AI-generated SEO review suggestions, keyword dashboard, AI auto-replies, repeat-suggestion filter, printed acrylic standee & free NFC card."
    }
  },
  {
    id: "business-growth",
    name: "Business Growth Plan",
    price: 14999,
    popular: true,
    badge: "All-in-One Best Value",
    tagline: "The complete suite: WhatsApp after call + Chatbot + AI Review QR kit + Digital card",
    features: [
      "Auto SMS after call (own mobile SIM, 100 SMS/day)",
      "Auto WhatsApp after call with media, PDFs & SIM rules",
      "Smart Digital Business Profile + 365 daily promotional posts",
      "24×7 interactive WhatsApp Chatbot automation with CRM sync",
      "Smart CONNECT AI-Review QR Kit (printed standee + free NFC card)",
      "AI SEO review suggestions, keyword dashboard & auto-replies",
      "Unified dashboard app for 1-click management of all tools"
    ],
    serviceItem: {
      name: "Business Growth Plan (All-in-One Annual)",
      category: "CONNECTIT ANNUAL PLANS & BUNDLES",
      defaultPrice: 14999,
      description: "The Complete Automation Suite: Auto SMS after call + Auto WhatsApp after call with media + Smart Digital Business Card + 365 Daily posts + 24×7 WhatsApp Chatbot + Smart AI-Review QR Kit with standee & NFC tap card."
    }
  }
];

export const CONNECTIT_QUOTATION_DATA = {
  quotationNo: "CON-2026-9481",
  date: "15 October 2026",
  validUntil: "15 November 2026",
  company: {
    name: "CONNECTit",
    tagline: "Business Automation & Smart Branding Tool (Technolite Business Solutions)",
    phone: "+91 98902 31573",
    email: "contact@connectit.in",
    website: "www.connectit.in",
    address: "Hinjewadi, Pune, Maharashtra 411057",
    footerAddress: "Technolite Business Solutions Pvt. Ltd., Phase 1, Hinjewadi Rajiv Gandhi Infotech Park, Pune, Maharashtra 411057",
    logoUrl: "/logo.png"
  },
  client: {
    name: "Apex Enterprises",
    companyName: "Apex Retail & Services Ltd.",
    email: "contact@apexservices.in",
    phone: "+91 98221 23456",
    address: "Baner Road, Pune, Maharashtra 411045"
  },
  salutation: "Dear Business Owner,",
  introMessage: "Thank you for your interest in CONNECTit business automation and branding solutions. We are pleased to offer our proposal to automate your call follow-ups, supercharge your Google reviews, and deploy 24×7 WhatsApp AI automation for your business.",
  items: [
    {
      id: "item-conn-1",
      category: "CONNECTIT ANNUAL PLANS & BUNDLES",
      title: "Business Growth Plan (All-in-One Annual)",
      description: "Complete Automation Suite: Auto SMS after call + Auto WhatsApp message after call (with images/videos/PDFs/links, SIM rules & repeat control) + Smart Digital Business Profile & 365 daily posts + 24×7 interactive WhatsApp Chatbot + Smart CONNECT QR (Printed acrylic standee + Free NFC card) with AI SEO review suggestions & auto-replies.",
      quantity: 1,
      rate: 14999,
      amount: 14999
    }
  ],
  subtotal: 14999,
  taxRate: 0,
  taxAmount: 0,
  discountRate: 0,
  discountAmount: 0,
  grandTotal: 14999,
  currency: "₹",
  paymentTerms: [
    "100% on Annual Plan Activation & Account Setup",
    "Hardware Kit delivery (Printed QR Standee + NFC Tap Card) within 3-5 business days"
  ],
  termsAndConditions: [
    "Plan validity is 1 Year (365 days) from the date of activation with 15,000+ business trust across India.",
    "Auto SMS is routed through your own registered mobile SIM, subject to telecom operator daily limits (100 SMS/day).",
    "Auto WhatsApp messages and Chatbot automation require an active smartphone/WhatsApp connection.",
    "Smart CONNECT QR Standee and NFC Tap Card include transit warranty and complimentary replacement if damaged.",
    "Prices are exclusive of applicable taxes unless specified."
  ],
  authorizedSignatoryName: "Authorized Signatory",
  authorizedSignatoryTitle: "Technolite Business Solutions Pvt. Ltd.",
  closingNote: "For immediate activation and doorstep standee dispatch, please confirm this quotation or contact our Hinjewadi, Pune support center.",
  hideIndividualAmounts: false
};

export const DEFAULT_QUOTATION_DATA = {
  quotationNo: "8D1DD218",
  date: "28 August 2026",
  validUntil: "28 August 2027",
  company: {
    name: "YugoraTech",
    tagline: "Innovative Digital & Enterprise Tech Solutions",
    phone: "+91 98902 31573",
    email: "info@yugoratech.com",
    website: "www.yugoratech.com",
    address: "Pune, Maharashtra 411004",
    footerAddress: "Patil Arcade, 71-72, above Old Hotel Kalinga, Erandwana Gaothan, Erandwane, Pune, Maharashtra 411004",
    logoUrl: "/logo.png"
  },
  client: {
    name: "kk Multi services",
    companyName: "kk Multi services",
    email: "contact@kkmultiservices.com",
    phone: "+91 9822000000",
    address: "Pune, Maharashtra"
  },
  salutation: "Dear Sir/Madam,",
  introMessage: "Thank you for giving us the opportunity to submit our quotation. We are pleased to offer our services as per your requirements.",
  items: [
    {
      id: "item-1",
      category: "DIGITAL PRESENCE",
      title: "Website + SEO (Pune City Only)",
      description: "Custom responsive corporate website design with on-page SEO targeting Pune city local search.",
      quantity: 1,
      rate: 35000,
      amount: 35000
    },
    {
      id: "item-2",
      category: "DIGITAL MARKETING",
      title: "Google Local Service Ad ( For 3 Months )",
      description: "Setup, campaign management, local keyword bidding, and monthly lead analytics.",
      quantity: 1,
      rate: 60000,
      amount: 60000
    },
    {
      id: "item-3",
      category: "DIGITAL MARKETING",
      title: "Social Media Package ( For 3 Months )",
      description: "12 custom creative posts/month, reel creation, caption copywriting & targeted community marketing.",
      quantity: 1,
      rate: 30000,
      amount: 30000
    }
  ],
  subtotal: 125000,
  taxRate: 0,
  taxAmount: 0,
  discountRate: 0,
  discountAmount: 0,
  grandTotal: 125000,
  currency: "₹",
  paymentTerms: [
    "50% Advance – On Project Confirmation",
    "30% – After Development Completion",
    "20% – Before Final Delivery"
  ],
  termsAndConditions: [
    "The quotation is valid for 30 days from the date of issue.",
    "The client shall provide all required content, images, logo, and other project materials.",
    "Any additional features or changes beyond the agreed scope will be charged separately after client approval.",
    "Domain registration, web hosting charges, SSL certificates, premium themes/plugins, and third-party API or software licences are not included unless specifically mentioned.",
    "The project timeline may vary if there is a delay in receiving required information or approvals from the client.",
    "Prices are exclusive of applicable taxes, if any."
  ],
  authorizedSignatoryName: "Authorized Signatory",
  authorizedSignatoryTitle: "YugoraTech",
  closingNote: "If you have any questions or require further clarification, please feel free to contact us.",
  hideIndividualAmounts: false,
};

