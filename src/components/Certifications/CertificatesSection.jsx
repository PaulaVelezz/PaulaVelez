import React, { useState } from "react";
import CertificatesData from "../../data/CertificatesData.js";
import TextRevealCurtain from "../common/TextRevealCurtain.jsx";

const CertificatesSection = () => {
  const [active, setActive] = useState(CertificatesData[0]);

  return (
    <section
      id="certifications"
      className="
        relative
        bg-[#050505]
        py-32
        overflow-hidden
      "
    >
      {/* Background Glow */}
      <div
        className="
          absolute
          top-1/2
          left-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-[900px]
          h-[900px]
          rounded-full
          bg-[#6D28D9]/10
          blur-[180px]
          pointer-events-none
        "
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}

        <div className="mb-24">
          <span
            className="
              text-[#A3E635]
              uppercase
              tracking-[0.35em]
              text-xs
              block
              mb-4
            "
          >
            // VERIFIED LEARNING
          </span>
          <TextRevealCurtain
            as="h2"
            className="text-4xl md:text-6xl font-extrabold font-korium tracking-wider"
            lines={["CERTIFICATIONS"]}
          />

          <p
            className="
              mt-4
              text-white/50
              max-w-xl
            "
          >
            Continuous education, specialized training and technical
            certifications shaping my frontend and creative development journey.
          </p>
        </div>

        {/* Content */}
        <div
          className="
            grid
            lg:grid-cols-12
            gap-12
          "
        >
          {/* LIST */}
          <div className="lg:col-span-7">
            {CertificatesData.map((certificate) => (
              <button
                key={certificate.id}
                onMouseEnter={() => setActive(certificate)}
                onPointerEnter={() => setActive(certificate)}
                onFocus={() => setActive(certificate)}
                className="
                  group
                  w-full
                  text-left
                  border-t
                  border-white/10
                  py-8
                  transition-all
                "
              >
                <div className="flex justify-between items-center gap-6">
                  <div>
                    <h3
                      className="
                        text-xl
                        md:text-3xl
                        font-medium
                        transition-colors
                        group-hover:text-[#A3E635]
                        font-korium tracking-wider
                      "
                    >
                      {certificate.firstTitle}
                    </h3>
                    <p
                      className={`
                        mt-2
                        uppercase
                        tracking-[0.2em]
                        text-xs
                        transition-all
                        duration-300
                        ${
                          active?.id === certificate.id
                            ? "text-[#A3E635]"
                            : "text-white/50 group-hover:text-[#A3E635]"
                        }
                      `}
                    >
                      {certificate.secondTitle}
                    </p>
                  </div>

                  <span
                    className="
                      text-white/20
                      text-5xl
                      font-black
                      font-korium tracking-wider
                    "
                  >
                    0{certificate.id}
                  </span>
                </div>
              </button>
            ))}

            <div className="border-t border-white/10" />
          </div>

          {/* PREVIEW */}

          <div
            className="
              lg:col-span-5
              lg:sticky
              lg:top-24
              h-fit
            "
          >
            <div
              className="
                relative
                rounded-3xl
                overflow-hidden
                border
                border-[#6D28D9]/40
                bg-white/[0.03]
                backdrop-blur-xl
              "
            >
              {/* Badge */}

              <div
                className="
                  absolute
                  top-5
                  left-5
                  z-20
                  px-3
                  py-2
                  rounded-full
                  bg-black/60
                  backdrop-blur-md
                  text-[10px]
                  tracking-[0.25em]
                  uppercase
                  flex
                  items-center
                  gap-2
                "
              >
                <span
                  className="
                    w-2
                    h-2
                    rounded-full
                    bg-[#A3E635]
                  "
                />
                Verified
              </div>

              {/* Image */}

              <div className="aspect-[1.35] overflow-hidden">
                <img
                  key={active.id}
                  src={active.image}
                  alt={active.firstTitle}
                  className="
                    w-full
                    h-full
                    object-cover
                    animate-previewReveal
                    transition-transform
                    duration-700
                    hover:scale-105
                  "
                />
              </div>

              {/* Content */}

              <div className="p-8">
                <p
                  className="
                    text-[#A3E635]
                    text-xs
                    uppercase
                    tracking-[0.3em]
                    mb-3
                  "
                >
                  Certification
                </p>

                <h3
                  className="
                    text-2xl
                    md:text-3xl
                    font-bold
                    leading-tight
                  "
                >
                  {active.firstTitle.replace("_Certificate ", "")}
                </h3>

                <p
                  className="
                    mt-4
                    text-white/60
                    uppercase
                    tracking-[0.2em]
                    text-sm
                  "
                >
                  {active.secondTitle}
                </p>
              </div>

              {/* Bottom Accent */}

              <div
                className="
                  h-[2px]
                  w-full
                  bg-gradient-to-r
                  from-[#A3E635]
                  via-[#6D28D9]
                  to-transparent
                   animate-sweep
                "
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificatesSection;
