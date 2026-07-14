import React, { useEffect, useRef } from "react";
import { gsap } from "gsap/all";
import styles from "./Projects.module.css";
import IMG1 from "../../assets/01.webp";
import IMG2 from "../../assets/02.webp";
import IMG3 from "../../assets/03.webp";
import IMG4 from "../../assets/04.webp";
import IMG5 from "../../assets/05.webp";
import IMG6 from "../../assets/06.webp";
import IMG7 from "../../assets/07.webp";
import { TbArrowBigDownLine } from "react-icons/tb";

const ProjectsScroll = () => {
  let ShowRef = useRef(null);
  let DemoRef = useRef(null);
  let SelectedWorkRef = useRef(null);
  let OurTextRef = useRef(null);
  let SelectRef = useRef(null);
  let OurWork = useRef(null);
  let ScrollRef = useRef(null);

  useEffect(() => {
    let ctx7 = gsap.context(() => {
      let tl7 = gsap.timeline({
        scrollTrigger: {
          trigger: ShowRef,
          start: "50% 50%",
          end: "300% 50%",
          scrub: 1,
          pin: true,
        },
      });

      tl7
        .to(DemoRef, { bottom: "7%" })
        .to(OurTextRef, { height: "60vh" }, "height")
        .to(SelectedWorkRef, { height: "60vh" }, "height")
        .to(SelectRef, { left: "0%" }, "height")
        .to(OurWork, { right: "0%" }, "height")
        .to(ScrollRef, { marginTop: "-300%" });
    });

    return () => ctx7.revert();
  }, []);
  return (
    <section
      id="works"
      className={styles.showcase}
      ref={(el) => (ShowRef = el)}
    >
      <div className={styles.ourWorkTxt} ref={(el) => (SelectedWorkRef = el)}>
        <h1 className={styles.selected} ref={(el) => (SelectRef = el)}>
          Portfolio
        </h1>
        <h1 className={styles.work} ref={(el) => (OurWork = el)}>
          Showcase
        </h1>
      </div>
      <div className={styles.ourWorkTxtDiv} ref={(el) => (OurTextRef = el)}>
        <div className={styles.scrollWork}>
          <div className={styles.scrollImg} ref={(el) => (ScrollRef = el)}>
            <img src={IMG1} alt="showcase" style={{ width: "100%" }} />
            <img src={IMG2} alt="showcase" style={{ width: "100%" }} />
            <img src={IMG3} alt="showcase" style={{ width: "100%" }} />
            <img src={IMG4} alt="showcase" style={{ width: "100%" }} />
            <img src={IMG5} alt="showcase" style={{ width: "100%" }} />
            <img src={IMG6} alt="showcase" style={{ width: "100%" }} />
            <img src={IMG7} alt="showcase" style={{ width: "100%" }} />
          </div>
        </div>
      </div>
      <div className={styles.demo} ref={(el) => (DemoRef = el)}>
        <button className="border border-dashed border-zinc-400 text-sm flex flex-row items-center justify-center gap-2 px-5 py-2 rounded-xl font-medium">
          <TbArrowBigDownLine className="animate-bounce mt-2" />
          Scroll More
          <TbArrowBigDownLine className="animate-bounce mt-2" />
        </button>
      </div>
    </section>
  );
};

export default ProjectsScroll;
