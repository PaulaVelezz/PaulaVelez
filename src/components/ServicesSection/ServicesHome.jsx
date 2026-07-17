import React from "react";
import TextRevealCurtain from "../common/TextRevealCurtain.jsx";
import ExpertiseServicesData from "../../data/ExpertiseServicesData.js";
import ExpertiseIntroStack from "../Expertise/ExpertiseIntroStack.jsx";

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
      <ExpertiseIntroStack
        services={ExpertiseServicesData}
        header={
          <>
            <span className="text-[#6d28d9] uppercase tracking-[0.35em] text-xs block mb-4">
              // WHAT I DO
            </span>
            <div className="flex justify-center mt-6">
              <TextRevealCurtain
                as="h2"
                className="text-4xl md:text-6xl font-extrabold font-korium tracking-wider"
                lines={["SERVICES"]}
              />
            </div>
            <p className="mt-4 max-w-xl text-zinc-900 mx-auto">
              I specialize in creating custom solutions that meet objectives and
              deliver results through design and technology.
            </p>
          </>
        }
        onViewMore={(service) => {
          setPage("/services");
        }}
      />
    </section>
  );
};

export default ServicesHome;
