import devinDetailImg from "../assets/devin_detail.png";
import fluidDetailImg from "../assets/fluid_project.png";

import shot01 from "../assets/devin_project.png";
import shot02 from "../assets/devin_project.png";
import shot03 from "../assets/devin_project.png";

import shot04 from "../assets/fluid_project.png";
import shot05 from "../assets/fluid_project.png";
import shot06 from "../assets/fluid_project.png";

import IMGP1 from "../assets/Mp1.webp";
import IMGP2 from "../assets/Mp2.webp";
import IMGP3 from "../assets/Mp3.webp";
import IMGP4 from "../assets/Mp4.webp";
import IMGP5 from "../assets/Mp5.webp";
import BG2 from "../assets/BG2.webp";
import BG3 from "../assets/BG3.webp";
import BG4 from "../assets/BG4.webp";
import P11 from "../assets/p1_1.webp";
import P12 from "../assets/p1_2.webp";
import P13 from "../assets/p1_3.webp";
import P14 from "../assets/p1_4.webp";
import P21 from "../assets/p2_1.webp";
import P22 from "../assets/p2_2.webp";
import P23 from "../assets/p2_3.webp";
import P24 from "../assets/p2_4.webp";
import P31 from "../assets/p3_1.webp";
import P32 from "../assets/p3_2.webp";
import P33 from "../assets/p3_3.webp";
import P34 from "../assets/p3_4.webp";
import P41 from "../assets/p4_1.webp";
import P42 from "../assets/p4_2.webp";
import P43 from "../assets/p4_3.webp";
import P44 from "../assets/p4_4.webp";
import P51 from "../assets/p5_1.webp";
import P52 from "../assets/p5_2.webp";
import P53 from "../assets/p5_3.webp";
import P54 from "../assets/p5_4.webp";

import ABS1 from "../assets/abstract/abstract-5-ConstanzeMarie.webp";
import ABS2 from "../assets/abstract/abstract-4-SteveJohnson.webp";
import ABS3 from "../assets/abstract/abstract-3-SteveJohnson.webp";
import ABS4 from "../assets/abstract/abstract-6-ConstanzeMarie.webp";
import ABS5 from "../assets/abstract/abstract-7-SteveJohnson.webp";

import ABS6 from "../assets/abstract/abstract-1-SteveJohnson.webp";
import ABS7 from "../assets/abstract/abstract-2-SteveJohnson.webp";

const projectDetailData = [
  {
    id: "devin_ai",
    slug: "devin-ai-platform",
    title: "Atlantic Village",
    categories: ["UI Design", "Web Development"],
    projectType: ["Landing Page"],
    summary:
      "Landing inmobiliaria para comercialización de espacios comerciales.",
    year: "2026",
    client: "Personal Concept",
    role: "Frontend Developer",
    stack: [
      "React",
      "Three.js",
      "GSAP",
      "Framer Motion",
      "TailwindCSS",
      "WordPress",
      "Figma",
    ],
    hero: devinDetailImg,
    cover: devinDetailImg,
    AbsBG: ABS6,
    overview:
      "Sitio de lanzamiento para un desarrollo comercial premium. El objetivo fue transmitir la escala y calidad arquitectónica del proyecto y capturar leads calificados desde un flujo simple y rápido en móvil.",
    challenge:
      "La página debía cargar por debajo de 1.5s en 4G y sostener animaciones scroll-driven sin sacrificar accesibilidad. El contenido, además, se editaba desde un CMS heredado sin schema estricto.",
    learnings:
      "Consolidé un patrón propio para animar secciones largas sin bloquear el hilo principal y aprendí a modelar contenido inestable de un CMS con validación en el borde del cliente.",
    gallery: [shot01, shot02, shot03],
    highlights: [
      "Responsive interface",
      "Integración CMS",
      "Optimización SEO",
      "Micro interactions",
      "Accessibility",
    ],
    links: {
      live: "https://...",
      github: "https://...",
      figma: "",
    },
    nextProject: "fluid-canvas",
    prevProject: null,
  },
  {
    id: "fluid-canvas",
    slug: "fluid-canvas",
    title: "Fluid Canvas",
    categories: ["Web Development"],
    projectType: ["Landing Page"],
    summary:
      "Simulador de fluidos dinámicos para estudios de ingeniería de fluidos.",
    year: "2026",
    client: "Personal Concept",
    role: "Frontend Developer",
    stack: [
      "React",
      "Three.js",
      "GSAP",
      "Framer Motion",
      "TailwindCSS",
      "WordPress",
      "Figma",
    ],
    hero: fluidDetailImg,
    cover: fluidDetailImg,
    AbsBG: ABS7,
    overview:
      "Sitio de lanzamiento para un desarrollo comercial premium. El objetivo fue transmitir la escala y calidad arquitectónica del proyecto y capturar leads calificados desde un flujo simple y rápido en móvil.",
    challenge:
      "La página debía cargar por debajo de 1.5s en 4G y sostener animaciones scroll-driven sin sacrificar accesibilidad. El contenido, además, se editaba desde un CMS heredado sin schema estricto.",
    learnings:
      "Consolidé un patrón propio para animar secciones largas sin bloquear el hilo principal y aprendí a modelar contenido inestable de un CMS con validación en el borde del cliente.",
    gallery: [shot04, shot05, shot06],
    highlights: [
      "Responsive interface",
      "Integración CMS",
      "Optimización SEO",
      "Micro interactions",
      "Accessibility",
    ],
    links: {
      live: "https://...",
      github: "https://...",
      figma: "",
    },
    nextProject: "saas-landing-page",
    prevProject: "devin-ai-platform",
  },
  {
    id: "saas_landing",
    slug: "saas-landing-page",
    title: "Saas Landing Page",
    categories: ["Web Development"],
    projectType: ["Landing Page"],
    summary:
      "Development of a landing page for a SaaS product. By prioritizing user experience, the landing page not only showcases the product's value but also guides visitors seamlessly toward conversion.",
    year: "0000",
    client: "Lorem Ipsum Client",
    role: "Frontend Developer",
    stack: [
      "HTML5",
      "JavaScript",
      "React.js",
      "Vite.js",
      "TailwindCSS",
      "Framer-Motion",
      "React-Router-Dom",
      "prop-types",
      "Figma",
    ],
    hero: IMGP5,
    cover: IMGP5,
    AbsBG: ABS1,
    overview:
      "Development of a landing page, with a highly intuitive user experience and a modern user interface adapted for all devices. In this way, a successful incorporation of knowledge is guaranteed.",
    challenge:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", // PLACEHOLDER
    learnings:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", // PLACEHOLDER
    gallery: [P51, P52, P53, P54],
    highlights: [
      "Intuitive User Interface",
      "Adaptive Design for All Devices",
      "User-Centered Design",
      "Focus on Optimization",
    ],
    links: {
      live: "",
      github: "https://github.com/PaulaVelezz/Saas_site",
      figma: "",
    },
    nextProject: "educlass",
    prevProject: "fluid-dynamics-canvas",
  },
  {
    id: "educlass",
    slug: "educlass",
    title: "EduClass",
    categories: ["Web Development"],
    projectType: ["Web App"],
    summary:
      "Development of an educational management platform to optimize communication and monitoring processes between the institution, teachers and students, providing transparency, comfort and immediacy.",
    year: "0000",
    client: "Lorem Ipsum Client",
    role: "Frontend Developer",
    stack: [
      "HTML5",
      "JavaScript",
      "React.js",
      "Vite.js",
      "NextUI",
      "TailwindCSS",
      "Axios",
      "Formik",
      "YUP",
      "React-Router-Dom",
      "JWT",
      "react-simple-chatbot",
    ],
    hero: IMGP1,
    cover: IMGP1,
    AbsBG: ABS2,
    overview:
      "Educational management platform that optimizes communication and monitoring processes between the institution, teachers and students. With this tool, it is possible to overcome the limitations present in traditional communication, reducing incoherent messages and loss of information.",
    challenge:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", // PLACEHOLDER
    learnings:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.", // PLACEHOLDER
    gallery: [P11, P12, P13, P14],
    highlights: [
      "Real-time Updates & Filtered Notifications",
      "Attendance Management",
      "Academic Grade Tracking",
      "Authorization & Confirmation",
    ],
    links: {
      live: "",
      github: "https://github.com/No-Country/s13-03-m-node-react",
      figma: "",
    },
    nextProject: "reparame",
    prevProject: "saas-landing-page",
  },
  {
    id: "reparame",
    slug: "reparame",
    title: "Reparame",
    categories: ["Web Development"],
    projectType: ["Web App"],
    summary:
      "Development of a WebApp that connects service providers with clients in real time, bridging the gap between digitalization and traditional trades.",
    year: "0000",
    client: "Lorem Ipsum Client",
    role: "Frontend Developer",
    stack: [
      "HTML5",
      "CSS3",
      "TypeScript",
      "React.js",
      "Next.js",
      "TailwindCSS",
      "Axios",
      "JWT",
      "Redux",
      "Vercel",
      "Figma",
      "Trello",
      "Slack",
    ],
    hero: BG2,
    cover: IMGP2,
    AbsBG: ABS3,
    overview:
      "A WebApp that connects reliable service providers with clients in real time, offering quick solutions to home problems. A positive and safe experience is guaranteed through a rating and comment system.",
    challenge:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", // PLACEHOLDER
    learnings:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.", // PLACEHOLDER
    gallery: [P21, P22, P23, P24],
    highlights: [
      "Personalized Filtering",
      "Detailed Profiles and Reviews",
      "Track Your Service Tickets",
      "Real-Time Availability",
    ],
    links: {
      live: "",
      github: "https://github.com/PaulaVelezz/s11-10-m-java-next",
      figma: "",
    },
    nextProject: "learn-with-me",
    prevProject: "educlass",
  },
  {
    id: "learn_with_me",
    slug: "learn-with-me",
    title: "Learn With Me",
    categories: ["Web Development"],
    projectType: ["Web App"],
    summary:
      "Development of a virtual learning platform focused on adapting content to each user's cognitive learning style, making learning engaging, interactive and truly personalized.",
    year: "0000",
    client: "Lorem Ipsum Client",
    role: "Frontend Developer",
    stack: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "React.js",
      "Next.js",
      "TailwindCSS",
      "DaisyUI",
      "Vercel",
      "Figma",
      "Trello",
      "Miro",
      "Slack",
    ],
    hero: BG3,
    cover: IMGP3,
    AbsBG: ABS4,
    overview:
      "Development of a virtual learning platform offering tailored learning paths, adapting content to individual learning styles for optimal understanding and engagement using adaptive learning technology.",
    challenge:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque.", // PLACEHOLDER
    learnings:
      "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat.", // PLACEHOLDER
    gallery: [P31, P32, P33, P34],
    highlights: [
      "Personalized Learning Paths",
      "Dynamic Dashboard",
      "Interactive Roadmap",
      "Adaptive Learning Technology",
    ],
    links: {
      live: "",
      github: "https://github.com/PaulaVelezz/c13-19-m-java-react-front",
      figma: "",
    },
    nextProject: "club-focaccia",
    prevProject: "reparame",
  },
  {
    id: "club_focaccia",
    slug: "club-focaccia",
    title: "Club Focaccia",
    categories: ["UI Design", "Web Development"],
    projectType: ["Landing Page"],
    summary:
      "Development of a landing page designed to simplify the food ordering process, offering an intuitive and user-friendly experience with clear information about menu items, pricing, and delivery options.",
    year: "0000",
    client: "Lorem Ipsum Client",
    role: "Frontend Developer",
    stack: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "React.js",
      "Redux Toolkit",
      "Vite.js",
      "Styled-Components",
      "Figma",
    ],
    hero: BG4,
    cover: IMGP4,
    AbsBG: ABS5,
    overview:
      "Development of a landing page for a store specialized in the sale of focaccias, combining a user-centric design with intuitive features for a smooth and efficient food ordering experience.",
    challenge:
      "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.", // PLACEHOLDER
    learnings:
      "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.", // PLACEHOLDER
    gallery: [P41, P42, P43, P44],
    highlights: [
      "Sleek and Modern Design",
      "Easy Navigation and Filtering",
      "Responsive and Adaptive",
      "Honest Customer Feedback",
    ],
    links: {
      live: "",
      github: "https://github.com/PaulaVelezz/Integrador-JavaScript-NUCBA",
      figma: "",
    },
    nextProject: null,
    prevProject: "learn-with-me",
  },
];

export default projectDetailData;
