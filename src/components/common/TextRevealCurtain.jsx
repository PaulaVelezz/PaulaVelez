import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_PALETTE = ["#f5f5f5", "#6d28d9", "#a3e635"];

const TextRevealCurtain = forwardRef(function TextRevealCurtain(
  {
    lines,
    as: Tag = "h2",
    className = "",
    palette = DEFAULT_PALETTE,
    lineDelay = 0.25, // delay entre el arranque de cada LÍNEA
    barStagger = 0.09, // delay entre cada BARRA de color dentro de la misma línea
    barDuration = 0.45, // duración de cada barra individual al destaparse
    start = "top 80%",
    once = true,
  },
  forwardedRef,
) {
  const containerRef = useRef(null);
  useImperativeHandle(forwardedRef, () => containerRef.current);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start,
          once,
        },
      });

      lines.forEach((_, lineIndex) => {
        const bars = container.querySelectorAll(
          `.curtain-line-${lineIndex} .curtain-bar`,
        );
        const text = container.querySelector(
          `.curtain-line-${lineIndex} .curtain-text`,
        );

        const lineStart = lineIndex * lineDelay;

        bars.forEach((bar, barIndex) => {
          tl.to(
            bar,
            {
              scaleX: 0,
              transformOrigin: "right center",
              duration: barDuration,
              ease: "power3.inOut",
            },
            lineStart + barIndex * barStagger,
          );
        });

        tl.fromTo(
          text,
          { x: -12 },
          { x: 0, duration: barDuration, ease: "power3.out" },
          lineStart + (bars.length - 1) * barStagger,
        );
      });
    }, container);

    return () => ctx.revert();
  }, [lines, palette, lineDelay, barStagger, barDuration, start, once]);

  return (
    <Tag ref={containerRef} className={className}>
      {lines.map((line, lineIndex) => (
        <span
          key={lineIndex}
          className={`curtain-line-${lineIndex} relative block w-fit overflow-hidden`}
          style={{ lineHeight: 1.05 }}
        >
          <span className="curtain-text inline-block will-change-transform">
            {line}
          </span>
          {palette.map((color, barIndex) => (
            <span
              key={barIndex}
              className="curtain-bar absolute inset-0 will-change-transform"
              style={{
                backgroundColor: color,
                transformOrigin: "right center",
                zIndex: palette.length - barIndex,
              }}
            />
          ))}
        </span>
      ))}
    </Tag>
  );
});

export default TextRevealCurtain;
