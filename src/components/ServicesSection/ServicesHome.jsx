import React from "react";
import TextRevealCurtain from "../common/TextRevealCurtain.jsx";
import ExpertiseServicesData from "../../data/ExpertiseServicesData.js";
import ExpertiseCardsStack from "../Expertise/ExpertiseCardsStack.jsx";

const ServicesHome = () => {
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
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}

        <div className="mb-24">
          <span
            className="
              text-[#6d28d9]
              uppercase
              tracking-[0.35em]
              text-xs
              block
              mb-4
            "
          >
            // WHAT I DO
          </span>
          <TextRevealCurtain
            as="h2"
            className="text-4xl md:text-6xl font-extrabold font-korium tracking-wider"
            lines={["SERVICES"]}
          />

          <p
            className="
              mt-4
              max-w-xl
               text-zinc-900
            "
          >
            I specialize in creating custom solutions that meet objectives and
            deliver results through design and technology.
          </p>
        </div>

        {/* Content */}
        <ExpertiseCardsStack services={ExpertiseServicesData} />
      </div>
    </section>
  );
};

export default ServicesHome;
