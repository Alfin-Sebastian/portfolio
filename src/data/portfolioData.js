export const portfolioData = {
  personal: {
    name: "Alfin Sebastian",
    title: "AI-Native Full-Stack Developer",
    subtitle: "MERN Stack • PHP/MySQL • Vibe Coding & AI Workflows",
    tagline: "Rapidly turning ideas into functional web apps using modern web frameworks and AI-augmented development.",
    location: "Kottayam, Kerala, India",
    pincode: "686105",
    phone: "+91 80784 41117",
    email: "alfinsebastian111@gmail.com",
    github: "https://github.com/Alfin-Sebastian",
    linkedin: "https://linkedin.com/in/alfin-sebastian-049390300",
    availability: "Available for Junior Full-Stack & Frontend Developer Roles",
    bio: "BCA graduate (2026) passionate about building practical, user-friendly web applications. Specializing in AI-assisted full-stack development (vibe coding with Claude & modern dev tools), combining foundational web technologies (React, Node, PHP, MySQL, MongoDB) with rapid AI-accelerated workflows to ship clean digital solutions.",
    stats: [
      { label: "Web Applications", value: "2+", detail: "SwipeRide & UrbanServe" },
      { label: "Core Web Stacks", value: "2", detail: "MERN Stack & PHP/MySQL" },
      { label: "Verified Credentials", value: "6", detail: "Anthropic, Forage, EF SET" },
      { label: "English Proficiency", value: "C2", detail: "EF SET Highest CEFR Tier" }
    ]
  },

  projects: [
    {
      id: "swiperide",
      title: "SwipeRide — Ride Sharing Platform",
      category: "Full-Stack MERN",
      featured: true,
      tagline: "A full-stack ride-booking web application built using the MERN stack and AI-accelerated development.",
      github: "https://github.com/Alfin-Sebastian/swiperide",
      type: "Major Project",
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "JavaScript", "Claude AI", "CSS3"],
      highlights: [
        "Built a functional ride-sharing platform connecting riders and drivers with an intuitive booking interface.",
        "Implemented user authentication and a 4-step ride workflow (Request, Driver Acceptance, Start Ride, Completion).",
        "Created an SOS safety alert feature with a live browser audio recording demonstration for passenger safety.",
        "Rapidly developed and debugged full-stack features using Anthropic's Claude to accelerate the development lifecycle."
      ],
      metrics: {
        architecture: "MERN Web Application",
        workflow: "4-Stage Ride Lifecycle",
        safetyFeature: "Emergency SOS Audio Module",
        developmentMethod: "AI-Augmented Full-Stack Development"
      },
      rideStages: [
        {
          stage: 1,
          name: "Ride Request",
          status: "Finding Nearby Driver...",
          badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
          riderPrompt: "Origin: MG University Campus ➔ Destination: Kottayam Railway Station",
          driverPrompt: "New ride request alert available in your service area.",
          techDetail: "Dispatches ride booking details from React client to Express server"
        },
        {
          stage: 2,
          name: "Driver Acceptance",
          status: "Driver Assigned",
          badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
          riderPrompt: "Driver 'Rahul V.' accepted your ride. ETA: 4 mins (White Swift - KL 05 AJ 4412)",
          driverPrompt: "Passenger confirmed. Route details loaded on driver interface.",
          techDetail: "Server updates ride status to ACCEPTED and notifies rider"
        },
        {
          stage: 3,
          name: "Ride Started",
          status: "Trip in Progress",
          badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
          riderPrompt: "Ride in progress. Emergency SOS audio safety button is active.",
          driverPrompt: "Active trip en-route to destination.",
          techDetail: "Status updated to IN_TRANSIT with SOS safety listener available"
        },
        {
          stage: 4,
          name: "Ride Completed",
          status: "Arrived & Completed",
          badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
          riderPrompt: "You have arrived! Total fare: ₹185.00. Rating submitted.",
          driverPrompt: "Ride concluded. Fare recorded. Driver ready for next trip.",
          techDetail: "Ride marked as COMPLETED and stored in MongoDB database"
        }
      ]
    },
    {
      id: "urbanserve",
      title: "Local Service Management System",
      category: "PHP & MySQL",
      featured: true,
      tagline: "A localized service platform connecting residents with neighborhood technicians and home service providers.",
      github: "https://github.com/Alfin-Sebastian/UrbanServe",
      type: "Academic Web Project",
      technologies: ["PHP", "MySQL", "HTML5", "CSS3", "JavaScript", "XAMPP"],
      highlights: [
        "Developed a community platform to discover and book local services such as electrical, plumbing, and repairs.",
        "Created secure login and distinct portal views for Customers, Service Providers, and Administrators.",
        "Designed database tables in MySQL to organize user accounts, service listings, and booking appointments.",
        "Implemented basic input validation and session handling for a smooth, reliable user experience."
      ],
      roles: [
        {
          role: "Customer",
          color: "text-cyan-400 border-cyan-500/30 bg-cyan-950/40",
          description: "Browse local service categories, book appointments with technicians, and view booking history.",
          features: ["Explore service categories", "Book service appointments", "View technician details", "Check service status"]
        },
        {
          role: "Provider",
          color: "text-emerald-400 border-emerald-500/30 bg-emerald-950/40",
          description: "Receive service requests, manage appointment schedule, and update availability status.",
          features: ["Review incoming service jobs", "Accept or decline bookings", "Manage service profile", "Track completed tasks"]
        },
        {
          role: "Admin",
          color: "text-purple-400 border-purple-500/30 bg-purple-950/40",
          description: "Oversee platform activity, manage service categories, and verify registered provider profiles.",
          features: ["Review provider registrations", "Manage service categories", "View overall bookings", "System status overview"]
        }
      ]
    }
  ],

  skills: {
    categories: [
      {
        id: "web",
        name: "Web Development",
        icon: "Globe",
        skills: [
          { name: "React.js", level: 85, tag: "Frontend Library", detail: "Components, state, hooks, responsive user interfaces" },
          { name: "Node.js & Express", level: 80, tag: "Backend", detail: "REST APIs, routing, server-side logic, JSON handling" },
          { name: "PHP", level: 82, tag: "Server-side", detail: "Form processing, session handling, MySQL database integration" },
          { name: "HTML5 & CSS3", level: 90, tag: "Markup & Styling", detail: "Responsive design, modern CSS, Tailwind styling" },
          { name: "JavaScript", level: 84, tag: "Core Language", detail: "DOM events, fetch/async calls, client-side interactivity" }
        ]
      },
      {
        id: "ai-workflows",
        name: "AI & Vibe Coding Tools",
        icon: "Cpu",
        skills: [
          { name: "Claude (Anthropic)", level: 92, tag: "AI Assistant", detail: "Prompt engineering, rapid full-stack scaffolding, code iteration" },
          { name: "AI-Assisted Prototyping", level: 90, tag: "Vibe Coding", detail: "Turning concept prompts into working web applications fast" },
          { name: "Claude 101 Certified", level: 95, tag: "Certification", detail: "Anthropic-verified foundations in Claude prompting and workflows" },
          { name: "AI Problem Solving", level: 88, tag: "Workflow", detail: "Debugging, refactoring, and exploring documentation with LLMs" }
        ]
      },
      {
        id: "database",
        name: "Databases & Storage",
        icon: "Database",
        skills: [
          { name: "MySQL", level: 82, tag: "Relational DB", detail: "Tables, primary keys, relationships, phpMyAdmin management" },
          { name: "MongoDB", level: 80, tag: "NoSQL DB", detail: "Collections, documents, Mongoose schema setup" },
          { name: "SQL Basics", level: 82, tag: "Queries", detail: "SELECT, INSERT, UPDATE, DELETE, relational queries" }
        ]
      },
      {
        id: "languages",
        name: "Programming Fundamentals",
        icon: "Code2",
        skills: [
          { name: "JavaScript", level: 85, tag: "Web Scripting", detail: "ES6 syntax, functions, arrays, objects, async logic" },
          { name: "PHP", level: 82, tag: "Backend Scripting", detail: "Server scripting, database CRUD operations" },
          { name: "Java", level: 75, tag: "Academic", detail: "Object-oriented programming concepts, classes, methods" },
          { name: "C & C++", level: 78, tag: "Foundational", detail: "Structured programming, loops, functions, basic data structures" }
        ]
      },
      {
        id: "tools",
        name: "Tools & Soft Skills",
        icon: "Layers",
        skills: [
          { name: "XAMPP & phpMyAdmin", level: 88, tag: "Dev Environment", detail: "Local Apache & MySQL testing setup" },
          { name: "GitHub Basics", level: 78, tag: "Code Sharing", detail: "Repositories, project hosting, code sharing" },
          { name: "Fast Learner & Adaptability", level: 95, tag: "Personal", detail: "Rapidly picking up new tools, frameworks, and AI workflows" },
          { name: "English Communication", level: 96, tag: "CEFR C2", detail: "Fluent international English comprehension and speaking" }
        ]
      }
    ]
  },

  certifications: [
    {
      id: "claude-101",
      title: "Claude 101 Certification",
      issuer: "Anthropic",
      date: "2024",
      highlight: "Completed & Verified",
      credentialUrl: "https://academy.claude.com/verify/94255e016aba01ebfb02ee863af228d2",
      description: "Official Anthropic certification covering Claude's core capabilities, effective prompting techniques, system prompts, and AI-assisted developer productivity.",
      badge: "Anthropic Verified",
      color: "from-amber-500/20 via-orange-500/10 to-transparent",
      icon: "Sparkles",
      tags: ["Anthropic", "Claude AI", "Prompting", "AI Workflows"]
    },
    {
      id: "ai-fluency",
      title: "AI Fluency: Framework & Foundations",
      issuer: "Anthropic",
      date: "2024",
      highlight: "AI Foundations Verified",
      credentialUrl: "https://academy.claude.com/verify/692c308e7bccae70c48e5d6990a2026f",
      description: "Explores foundational Large Language Model concepts, prompting best practices, and effective ways to leverage AI tools responsibly.",
      badge: "Anthropic Verified",
      color: "from-purple-500/20 via-indigo-500/10 to-transparent",
      icon: "Cpu",
      tags: ["LLM Fundamentals", "AI Prompting", "Anthropic"]
    },
    {
      id: "tata-genai",
      title: "Tata - GenAI Powered Data Analytics Job Simulation",
      issuer: "TATA (Forage)",
      date: "2024",
      highlight: "Industry Job Simulation",
      credentialUrl: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/ifobHAoMjQs9s6bKS/gMTdCXwDdLYoXZ3wG_ifobHAoMjQs9s6bKS_68bbde87e2c4c92d313894c8_1757781987700_completion_certificate.pdf",
      description: "Applied generative AI to analyze commercial data samples, summarize business trends, and generate actionable insights for enterprise decisions.",
      badge: "TATA Verified",
      color: "from-emerald-500/20 via-teal-500/10 to-transparent",
      icon: "BarChart3",
      tags: ["Data Analytics", "GenAI", "Business Insights", "TATA"]
    },
    {
      id: "deloitte-tech",
      title: "Deloitte Australia - Technology Job Simulation",
      issuer: "Deloitte Australia (Forage)",
      date: "2024",
      highlight: "Industry Job Simulation",
      credentialUrl: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/9PBTqmSxAf6zZTseP/udmxiyHeqYQLkTPvf_9PBTqmSxAf6zZTseP_68bbde87e2c4c92d313894c8_1757164765254_completion_certificate.pdf",
      description: "Practical immersion in technology consulting, development lifecycles, problem analysis, and digital transformation scenarios.",
      badge: "Deloitte Verified",
      color: "from-blue-500/20 via-slate-500/10 to-transparent",
      icon: "ShieldCheck",
      tags: ["Technology", "Deloitte", "Consulting", "Software Lifecycle"]
    },
    {
      id: "deloitte-cyber",
      title: "Deloitte Australia - Cyber Job Simulation",
      issuer: "Deloitte Australia (Forage)",
      date: "2024",
      highlight: "Industry Job Simulation",
      credentialUrl: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/9PBTqmSxAf6zZTseP/E9pA6qsdbeyEkp3ti_9PBTqmSxAf6zZTseP_68bbde87e2c4c92d313894c8_1757165555743_completion_certificate.pdf",
      description: "Hands-on exploration of cybersecurity fundamentals, access control principles, and threat awareness in enterprise systems.",
      badge: "Deloitte Verified",
      color: "from-indigo-500/20 via-purple-500/10 to-transparent",
      icon: "ShieldCheck",
      tags: ["Cyber Security", "Access Control", "Deloitte", "Safety"]
    },
    {
      id: "efset-c2",
      title: "EF SET English Certificate — C2 Proficient",
      issuer: "EF Standard English Test",
      date: "2024",
      highlight: "Highest CEFR Proficiency",
      credentialUrl: "",
      description: "Achieved the highest C2 level on the EF Standard English Test, certifying fluent professional English comprehension, writing, and communication.",
      badge: "C2 Proficient",
      color: "from-cyan-500/20 via-blue-500/10 to-transparent",
      icon: "Award",
      tags: ["C2 English", "Fluent Communication", "CEFR Standard"]
    }
  ],

  education: [
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "Kristu Jyothi College of Management & Technology",
      university: "Mahatma Gandhi (MG) University",
      period: "2023 – 2026",
      status: "Graduating 2026",
      location: "Changanacherry / Kottayam, Kerala",
      coursework: ["Web Technologies", "Database Management", "Data Structures", "Programming in Java/C++", "Software Engineering Fundamentals"]
    },
    {
      degree: "Higher Secondary Education (Computer Science)",
      institution: "St. Berchmans Higher Secondary School (SB HSS)",
      period: "2021 – 2023",
      status: "Completed",
      location: "Changanacherry, Kerala",
      coursework: ["Computer Science Fundamentals", "Mathematics", "Physics", "Chemistry"]
    },
    {
      degree: "Secondary Education (10th Standard)",
      institution: "St. Berchmans HSS",
      period: "2020 – 2021",
      status: "Completed",
      location: "Changanacherry, Kerala",
      coursework: ["General Sciences", "Mathematics", "English", "Information Technology"]
    }
  ],

  events: [
    {
      title: "Authentic TECH Masters",
      type: "State-Level Hackathon",
      description: "Participated in a state-level No-Code/Low-Code and rapid prototyping Hackathon, collaborating on fast application building.",
      tag: "Hackathon Participant"
    },
    {
      title: "Web Designing Workshop",
      type: "Institutional Workshop",
      description: "Participated in the web design workshop organized by the Institution's Innovation Council (IIC) at Kristu Jyothi College.",
      tag: "IIC Participant"
    }
  ],

  interests: [
    {
      category: "Manga & Manhwas",
      icon: "BookOpen",
      description: "Enjoys reading popular manhwas like Solo Leveling and Omniscient Reader's Viewpoint, appreciating engaging character leveling and progression.",
      vibe: "Continuous leveling up & determination"
    },
    {
      category: "Anime & Storytelling",
      icon: "Film",
      description: "Loves watching anime and movies with strong narrative arcs, visual creativity, and memorable animation style.",
      vibe: "Creative visual imagination"
    },
    {
      category: "Football",
      icon: "Activity",
      description: "Enjoys playing and following football. Appreciates teamwork, good positioning, and swift tactical passes.",
      vibe: "Active team player & energy"
    },
    {
      category: "AI & Emerging Tools",
      icon: "Cpu",
      description: "Passionate about testing new AI developer tools, modern prompting workflows, and building cool web experiments.",
      vibe: "Curiosity & fast prototyping"
    }
  ],

  languages: [
    { name: "English", level: "Fluent (EF SET C2 Proficient)", flag: "🌐" },
    { name: "Malayalam", level: "Native", flag: "🌴" }
  ]
};
