import { useEffect, useRef } from "react";

const FONT_FAMILY = '"T1Korium", sans-serif';
const ACCENT_COLOR = "163, 230, 53";
const GLITCH_CHARS = "PAULAVELEZ#*+.:";
const CELL_SIZE = 6;
const DIFFUSION_DAMPING = 0.9;
const REFRACTION = 0.65;
const REST_THRESHOLD = 0.2;
const SLEEP_THRESHOLD = 0.3;
const SCRAMBLE_INTERVAL = 120;
const SCRAMBLE_FRACTION = 0.05;

function ContactFooterVisual() {
  const container = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const el = container.current;
    const canvas = canvasRef.current;

    if (!el || !canvas) return;

    const ctx = canvas.getContext("2d");
    const sourceCanvas = document.createElement("canvas");
    const sourceCtx = sourceCanvas.getContext("2d");

    let raf;
    let scrambleTimer;

    let width = 0;
    let height = 0;

    let resX = 0;
    let resY = 0;

    let cells = [];

    let bufferA;
    let bufferB;

    let current;
    let previous;

    let waveActive = false;

    const buildTextGrid = () => {
      resX = Math.ceil(width / CELL_SIZE);
      resY = Math.ceil(height / CELL_SIZE);

      const measure = document.createElement("canvas");
      measure.width = width;
      measure.height = height;

      const mCtx = measure.getContext("2d");

      const label = "PAULA VELEZ";
      const dot = ".";

      let fontSize = height * 0.55;

      mCtx.font = `700 ${fontSize}px ${FONT_FAMILY}`;

      const textWidth = mCtx.measureText(`${label}${dot}`).width;

      const targetWidth = width * 0.92;

      fontSize *= targetWidth / textWidth;

      mCtx.font = `700 ${fontSize}px ${FONT_FAMILY}`;
      mCtx.textBaseline = "alphabetic";

      const fullText = `${label}${dot}`;

      const finalWidth = mCtx.measureText(fullText).width;

      const startX = (width - finalWidth) / 2;

      const baseline = height / 2 + fontSize * 0.35;

      const labelWidth = mCtx.measureText(label).width;

      const dotStartX = startX + labelWidth;

      mCtx.clearRect(0, 0, width, height);

      mCtx.fillStyle = "#ffffff";

      mCtx.fillText(fullText, startX, baseline);

      const pixelWidth = Math.floor(width);
      const pixelHeight = Math.floor(height);

      const imgData = mCtx.getImageData(0, 0, pixelWidth, pixelHeight);

      cells = new Array(resX * resY);

      for (let gy = 0; gy < resY; gy++) {
        for (let gx = 0; gx < resX; gx++) {
          const startPixelX = gx * CELL_SIZE;
          const startPixelY = gy * CELL_SIZE;

          let alphaSum = 0;
          let samples = 0;

          for (
            let sy = 0;
            sy < CELL_SIZE && startPixelY + sy < pixelHeight;
            sy++
          ) {
            for (
              let sx = 0;
              sx < CELL_SIZE && startPixelX + sx < pixelWidth;
              sx++
            ) {
              const pixelX = startPixelX + sx;
              const pixelY = startPixelY + sy;

              const pixelIndex = (pixelY * pixelWidth + pixelX) * 4;

              const alpha = imgData.data[pixelIndex + 3] / 255;

              alphaSum += alpha;
              samples++;
            }
          }

          const density = samples > 0 ? alphaSum / samples : 0;

          const cellIdx = gy * resX + gx;

          if (density > 0.03) {
            const px = startPixelX + CELL_SIZE / 2;

            cells[cellIdx] = {
              char: GLITCH_CHARS[
                Math.floor(Math.random() * GLITCH_CHARS.length)
              ],

              isDot: px >= dotStartX,

              active: true,

              density,
            };
          } else {
            cells[cellIdx] = null;
          }
        }
      }

      const activeCells = cells.filter(Boolean).length;

      bufferA = new Float32Array(resX * resY);

      bufferB = new Float32Array(resX * resY);

      current = bufferA;
      previous = bufferB;

      waveActive = false;
    };

    const computeGeometry = () => {
      const rect = el.getBoundingClientRect();

      const dpr = window.devicePixelRatio || 1;

      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      sourceCanvas.width = width * dpr;
      sourceCanvas.height = height * dpr;

      sourceCanvas.style.width = `${width}px`;
      sourceCanvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      sourceCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

      buildTextGrid();
    };

    const init = () => {
      computeGeometry();

      window.addEventListener("resize", computeGeometry);
    };

    if (document.fonts?.ready) {
      document.fonts.ready.then(init);
    } else {
      init();
    }

    scrambleTimer = setInterval(() => {
      if (!cells.length) return;

      const total = cells.length;

      const amount = Math.floor(total * SCRAMBLE_FRACTION);

      for (let i = 0; i < amount; i++) {
        const index = Math.floor(Math.random() * total);

        const cell = cells[index];

        if (!cell) continue;

        cell.char =
          GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
      }
    }, SCRAMBLE_INTERVAL);

    const disturb = (px, py, amount) => {
      if (!resX || !resY) return;

      const gx = Math.round((px / width) * resX);

      const gy = Math.round((py / height) * resY);

      const radius = 1;

      for (let j = -radius; j <= radius; j++) {
        for (let i = -radius; i <= radius; i++) {
          const x = gx + i;
          const y = gy + j;

          if (x < 1 || x >= resX - 1 || y < 1 || y >= resY - 1) {
            continue;
          }

          previous[y * resX + x] += amount;
        }
      }

      waveActive = true;
    };

    let lastMouse = null;

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (lastMouse) {
        const speed = Math.hypot(x - lastMouse.x, y - lastMouse.y);

        if (speed > 1) {
          disturb(x, y, Math.min(55, speed * 1.8));
        }
      }

      lastMouse = {
        x,
        y,
      };
    };

    const handleLeave = () => {
      lastMouse = null;

      for (let i = 0; i < previous.length; i++) {
        previous[i] *= 0.55;
        current[i] *= 0.55;
      }

      waveActive = true;
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);

    const updateWave = () => {
      let maxVal = 0;

      for (let y = 1; y < resY - 1; y++) {
        for (let x = 1; x < resX - 1; x++) {
          const idx = y * resX + x;

          current[idx] =
            (previous[idx - 1] +
              previous[idx + 1] +
              previous[idx - resX] +
              previous[idx + resX]) /
              2 -
            current[idx];

          current[idx] *= DIFFUSION_DAMPING;

          maxVal = Math.max(maxVal, Math.abs(current[idx]));
        }
      }

      const temp = previous;

      previous = current;
      current = temp;

      waveActive = maxVal > SLEEP_THRESHOLD;
    };

    const paintSource = () => {
      sourceCtx.clearRect(0, 0, width, height);
      sourceCtx.fillStyle = "#111111";
      sourceCtx.fillRect(0, 0, width, height);

      sourceCtx.font = `700 ${CELL_SIZE * 1.5}px monospace`;
      sourceCtx.textAlign = "center";
      sourceCtx.textBaseline = "middle";

      let paintedCells = 0;

      for (let gy = 0; gy < resY; gy++) {
        for (let gx = 0; gx < resX; gx++) {
          const cell = cells[gy * resX + gx];

          if (!cell) continue;

          const px = gx * CELL_SIZE + CELL_SIZE / 2;
          const py = gy * CELL_SIZE + CELL_SIZE / 2;

          sourceCtx.fillStyle = cell.isDot
            ? `rgba(${ACCENT_COLOR}, 0.95)`
            : "rgba(235, 235, 235, 0.92)";

          sourceCtx.fillText(cell.char, px, py);

          paintedCells++;
        }
      }
    };

    const draw = () => {
      if (!resX || !resY) {
        raf = requestAnimationFrame(draw);
        return;
      }

      paintSource();

      if (waveActive) {
        updateWave();
      }

      ctx.clearRect(0, 0, width, height);

      ctx.drawImage(sourceCanvas, 0, 0, width, height);

      if (waveActive) {
        for (let gy = 0; gy < resY; gy++) {
          for (let gx = 0; gx < resX; gx++) {
            const idx = gy * resX + gx;

            const h = previous[idx];

            if (Math.abs(h) < REST_THRESHOLD) {
              continue;
            }

            const left = gx > 0 ? previous[idx - 1] : h;
            const right = gx < resX - 1 ? previous[idx + 1] : h;
            const up = gy > 0 ? previous[idx - resX] : h;
            const down = gy < resY - 1 ? previous[idx + resX] : h;
            const dx = (left - right) * REFRACTION;
            const dy = (up - down) * REFRACTION;
            const destX = gx * CELL_SIZE;
            const destY = gy * CELL_SIZE;
            const srcX = Math.max(0, Math.min(width - CELL_SIZE, destX + dx));
            const srcY = Math.max(0, Math.min(height - CELL_SIZE, destY + dy));
            ctx.clearRect(destX, destY, CELL_SIZE + 1, CELL_SIZE + 1);

            ctx.drawImage(
              sourceCanvas,
              srcX,
              srcY,
              CELL_SIZE + 1,
              CELL_SIZE + 1,
              destX,
              destY,
              CELL_SIZE + 1,
              CELL_SIZE + 1,
            );
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", computeGeometry);

      el.removeEventListener("mousemove", handleMove);

      el.removeEventListener("mouseleave", handleLeave);

      clearInterval(scrambleTimer);

      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={container}
      className="
        relative
        h-[220px]
        overflow-hidden
        select-none
      "
    >
      {/* Glow */}
      <div
        className="
          absolute
          inset-x-0
          bottom-0
          h-40
          bg-gradient-to-t
          from-[#6d28d9]/15
          via-transparent
          to-transparent
          blur-3xl
          pointer-events-none
        "
      />

      <canvas
        ref={canvasRef}
        className="
          absolute
          inset-0
          z-10
          w-full
          h-full
          rounded-3xl 
        "
      />
    </div>
  );
}

export default ContactFooterVisual;
