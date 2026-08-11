import icon1 from "../assets/icon1.webp";
import icon2 from "../assets/icon2.webp";
import icon5 from "../assets/icon5.webp";

const ICONS = [icon1, icon2, icon5];

const ExpertiseServicesData = [
  {
    id: 1,
    key: "webDesign",
    stack: ["HTML/CSS", "Elementor", "Figma"],
    image: ICONS[0 % ICONS.length],
  },
  {
    id: 2,
    key: "corporateWebsites",
    stack: ["WordPress", "Elementor", "Vite.js", "React.js"],
    image: ICONS[1 % ICONS.length],
  },
  {
    id: 3,
    key: "landingPages",
    stack: ["WordPress", "Elementor", "Vite.js", "React.js"],
    image: ICONS[2 % ICONS.length],
  },
  {
    id: 4,
    key: "onlineStores",
    stack: ["Shopify", "WooCommerce", "Tienda Nube"],
    image: ICONS[3 % ICONS.length],
  },
  {
    id: 5,
    key: "webRedesign",
    stack: ["React.js", "WordPress", "Elementor", "Vite.js"],
    image: ICONS[4 % ICONS.length],
  },
  {
    id: 6,
    key: "maintenanceSecurity",
    stack: ["WordPress"],
    image: ICONS[5 % ICONS.length],
  },
];

export default ExpertiseServicesData;
