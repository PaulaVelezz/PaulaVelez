import { FaLaptopCode } from "react-icons/fa";

const PHONE = {
  web: import.meta.env.VITE_WPP,
};

export const SERVICES = [
  {
    id: "web",
    phone: PHONE.web,
    icon: FaLaptopCode,
    title: "Desarrollo Web",
    subtitle: "Sitios Web • Ecommerce • Landing Pages",
    message:
      "Hola! Me interesa el servicio de Desarrollo Web. ¿Podrían enviarme más información?",
  },
  {
    id: "portfolio-contact",
    phone: PHONE.web,
    message:
      "Hola Paula, vengo de tu portfolio y me interesan tus servicios de desarrollo frontend. ¿Tenés un momento para charlar?",
  },
];

export function openWhatsApp(service) {
  const url = `https://wa.me/${service.phone}?text=${encodeURIComponent(
    service.message,
  )}`;

  window.open(url, "_blank", "noopener,noreferrer");
}
