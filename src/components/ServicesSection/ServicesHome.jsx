import React from "react";
import TextRevealCurtain from "../common/TextRevealCurtain.jsx";
import ExpertiseServicesData from "../../data/ExpertiseServicesData.js";
import ExpertiseIntroStack from "../Expertise/ExpertiseIntroStack.jsx";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ServicesHome = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section
      id="services_home"
      className="
        relative
        bg-[#f0f0f5]
        py-32
        overflow-hidden
        text-zinc-950
      "
    >
      <ExpertiseIntroStack
        services={ExpertiseServicesData}
        header={
          <>
            <span className="text-[#6d28d9] uppercase tracking-[0.35em] text-xs block mb-4">
              // {t("services.label")}
            </span>
            <div className="flex justify-center mt-6">
              <TextRevealCurtain
                as="h2"
                className="text-4xl md:text-6xl font-extrabold font-korium tracking-wider"
                lines={[t("services.title")]}
              />
            </div>
            <p className="mt-4 max-w-xl text-zinc-900 mx-auto">
              {t("services.description")}
            </p>
          </>
        }
        onViewMore={() => {
          navigate("/about#services");
        }}
      />
    </section>
  );
};

export default ServicesHome;
