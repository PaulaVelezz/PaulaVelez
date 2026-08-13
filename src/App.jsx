import { useEffect, useRef, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ScrollProgress from "./components/ScrollProgress";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import ContactPage from "./pages/ContactPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import Header from "./components/Header/Header";
import HamburgerMenu from "./components/Header/HamburgerMenu";
import { gsap } from "gsap";
import PageTransitionOverlay from "./components/PageTransitionOverlay";
import AboutPage from "./pages/AboutPage";
import { Analytics } from "@vercel/analytics/react";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const overlayRef = useRef(null);
  const navigate = useNavigate();

  // Animación inicial al cargar la Home por primera vez
  useEffect(() => {
    if (!overlayRef.current) return;
    overlayRef.current.reveal().then(() => setIsLoading(false));
  }, []);

  const changePage = async (path) => {
    await overlayRef.current.cover();
    navigate(path);
    window.scrollTo({ top: 0, behavior: "instant" });
    await overlayRef.current.reveal();
  };

  return (
    <>
      <PageTransitionOverlay ref={overlayRef} />
      <ScrollProgress />

      {!isLoading && (
        <Header
          setPage={changePage}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />
      )}

      <HamburgerMenu
        isOpen={menuOpen}
        setPage={changePage}
        onClose={() => setMenuOpen(false)}
      />
      <Routes>
        <Route path="/" element={<HomePage setPage={changePage} />} />
        <Route
          path="/projects"
          element={<ProjectsPage setPage={changePage} />}
        />
        <Route
          path="/project/:slug"
          element={<ProjectDetailPage setPage={changePage} />}
        />
        <Route path="/about" element={<AboutPage setPage={changePage} />} />
        <Route path="/contact" element={<ContactPage setPage={changePage} />} />
      </Routes>
      <FloatingWhatsApp />
      <Analytics />
    </>
  );
}

export default App;
