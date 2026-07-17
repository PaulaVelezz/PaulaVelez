import React, { lazy, Suspense } from "react";

const Hero = lazy(() => import("../components/Hero/Hero.jsx"));
const Footer = lazy(() => import("../components/Footer/Footer.jsx"));
const Testimonials = lazy(
  () => import("../components/Testimonials/Testimonials.jsx"),
);
const ProjectsScroll = lazy(
  () => import("../components/ProjectsScroll/ProjectsScroll.jsx"),
);
const CertificatesSection = lazy(
  () => import("../components/Certifications/CertificatesSection.jsx"),
);
const ProjectDetails = lazy(
  () => import("../components/Projects/ProjectDetails.jsx"),
);
const ServicesHome = lazy(
  () => import("../components/ServicesSection/ServicesHome.jsx"),
);

const HomePage = ({ setPage }) => {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0c]" />}>
      <div className="w-full flex flex-col min-h-screen bg-[#0a0a0c]">
        <Hero setPage={setPage} />
        <ServicesHome />
        <ProjectsScroll />
        <ProjectDetails />
        <CertificatesSection />
        <Testimonials />
        {/* <Contact /> */}
        <Footer />
      </div>
    </Suspense>
  );
};

export default HomePage;
