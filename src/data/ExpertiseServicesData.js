import icon1 from "../assets/icon1.webp";
import icon2 from "../assets/icon2.webp";
import icon5 from "../assets/icon5.webp";

const ICONS = [icon1, icon2, icon5];

const ExpertiseServicesData = [
  {
    title: "Web Design",
    description:
      "Interfaces que se ven tan bien como funcionan. Diseño cada detalle pensando en cómo tu marca se percibe a primera vista.",
    stack: ["HTML/CSS", "Elementor", "Figma"],
    image: ICONS[0 % ICONS.length],
  },
  {
    title: "Páginas Corporativas",
    description:
      "Tu carta de presentación digital. Sitios institucionales sólidos que transmiten confianza antes de la primera reunión.",
    stack: ["WordPress", "Elementor", "Vite.js", "React.js"],
    image: ICONS[1 % ICONS.length],
  },
  {
    title: "Landing Pages",
    description:
      "Una sola meta: convertir visitas en clientes. Flujos simples, sin distracciones, con cada elemento apuntando a la acción.",
    stack: ["WordPress", "Elementor", "Vite.js", "React.js"],
    image: ICONS[2 % ICONS.length],
  },
  {
    title: "Tiendas Online",
    description:
      "Vender sin fricción. Checkouts rápidos y catálogos que se navegan solos, para que nada se interponga entre el clic y la compra.",
    stack: ["Shopify", "WooCommerce", "Tienda Nube"],
    image: ICONS[3 % ICONS.length],
  },
  {
    title: "Rediseño Web",
    description:
      "Le doy una segunda vida a sitios que quedaron atrás. Misma esencia de marca, con la performance y estética que hoy se esperan.",
    stack: ["React.js", "WordPress", "Elementor", "Vite.js"],
    image: ICONS[4 % ICONS.length],
  },
  {
    title: "Mantenimiento & Seguridad",
    description:
      "Tu web funcionando sin sorpresas. Actualizaciones, backups y buenas prácticas para que duermas tranquilo.",
    stack: ["WordPress"],
    image: ICONS[5 % ICONS.length],
  },
];

export default ExpertiseServicesData;
