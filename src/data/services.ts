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
  }
];

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
