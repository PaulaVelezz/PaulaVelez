import { useEffect, useRef, useState } from "react";

const IMAGE_SRC = "/Perfil_2026.png";

class TextHeatReveal {
  constructor(canvas, imgSrc, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d", { willReadFrequently: true });
    this.W = canvas.width;
    this.H = canvas.height;
    this.res = options.resolution || 96;
    this.characters = options.characters || "GSAPHEATEFFECT!@#$%&*()_+";
    this.fontSize = options.fontSize || 10;
    this.fontFamily = options.fontFamily || "monospace";

    this.heat = {
      current: new Float32Array(this.res * this.res).fill(0),
      lastTime: 0,
      active: false,
      maxValue: 0,
    };

    this.P = {
      grid: {
        size: options.gridSize || 20,
        weight: options.textWeight || 1,
        contrast: options.contrast || 1.2,
        minBrightness: options.minBrightness || 0.25,
        textOpacity: options.textOpacity || 0.85,
      },
      effect: {
        diffusion: options.diffusion || 0.92,
        decay: options.decay || 0.98,
        threshold: options.threshold || 0.04,
      },
      image: {
        brightness: options.imageBrightness || 1.2,
        contrast: options.imageContrast || 1.3,
      },
    };

    this.scrambleInterval = options.scrambleInterval || 500;
    this.scrambleAmount = options.scrambleAmount || 0.08;
    this.scrambleActive = true;

    this.coverCanvas = document.createElement("canvas");
    this.coverCanvas.width = this.W;
    this.coverCanvas.height = this.H;
    this.coverCtx = this.coverCanvas.getContext("2d");
    this.coverData = null;

    this.staticCanvas = document.createElement("canvas");
    this.staticCanvas.width = this.W;
    this.staticCanvas.height = this.H;
    this.staticCtx = this.staticCanvas.getContext("2d");

    this.charGrid = [];
    this.onReady = options.onReady || (() => {});

    this._move = this._move.bind(this);
    this._down = this._down.bind(this);
    this._leave = this._leave.bind(this);
    this._visibilityChange = this._visibilityChange.bind(this);

    this.img = new Image();
    this.img.crossOrigin = "anonymous";
    this.img.onload = () => this._prepareCover();
    this.img.onerror = () => {
      console.error(`No se pudo cargar la imagen: ${imgSrc}`);
    };
    this.img.src = imgSrc;
  }

  _prepareCover() {
    this.coverCtx.fillStyle = "black";
    this.coverCtx.fillRect(0, 0, this.W, this.H);
    const scale = Math.max(this.W / this.img.width, this.H / this.img.height);
    const sw = this.img.width * scale;
    const sh = this.img.height * scale;
    const ox = (this.W - sw) / 2;
    const oy = (this.H - sh) / 2;
    this.coverCtx.filter = `brightness(${this.P.image.brightness}) contrast(${this.P.image.contrast})`;
    this.coverCtx.drawImage(this.img, ox, oy, sw, sh);
    this.coverCtx.filter = "none";
    this.coverData = this.coverCtx.getImageData(0, 0, this.W, this.H);

    this._clearHeat();
    this._generateCharGrid();
    this._renderStaticGrid();
    this._render();
    this._bindEvents();
    this._startScrambling();

    this.onReady();
  }

  _generateCharGrid() {
    const { W, H, P } = this;
    const gridSize = P.grid.size;
    const minBrightness = P.grid.minBrightness;

    this.charGrid = [];

    for (let y = 0; y < H; y += gridSize) {
      for (let x = 0; x < W; x += gridSize) {
        const pi = (Math.floor(y) * W + Math.floor(x)) * 4;
        let gray =
          (this.coverData.data[pi] * 0.299 +
            this.coverData.data[pi + 1] * 0.587 +
            this.coverData.data[pi + 2] * 0.114) /
          255;

        gray = Math.max(
          minBrightness,
          Math.min(1, (gray - 0.5) * P.grid.contrast + 0.5),
        );

        this.charGrid.push({
          x,
          y,
          char: this._getRandomChar(),
          weight: gray * P.grid.weight,
          brightness: gray,
        });
      }
    }
  }

  _renderStaticGrid() {
    const { staticCtx, W, H, P } = this;

    staticCtx.clearRect(0, 0, W, H);
    staticCtx.fillStyle = "black";
    staticCtx.fillRect(0, 0, W, H);

    staticCtx.textAlign = "center";
    staticCtx.textBaseline = "middle";

    this.charGrid.forEach((cell) => {
      const { x, y, char, brightness } = cell;
      const size = this.fontSize * (0.5 + brightness * 0.8);

      staticCtx.font = `${size}px ${this.fontFamily}`;

      const finalBrightness =
        Math.min(1, brightness * 1.1) * P.grid.textOpacity;
      staticCtx.fillStyle = `rgba(255, 255, 255, ${finalBrightness})`;
      staticCtx.fillText(char, x + P.grid.size / 2, y + P.grid.size / 2);
    });
  }

  _getRandomChar() {
    return this.characters.charAt(
      Math.floor(Math.random() * this.characters.length),
    );
  }

  _startScrambling() {
    this.scrambleTimer = setInterval(() => {
      if (this.scrambleActive && !this.heat.active) {
        this._scrambleRandomChars();
      }
    }, this.scrambleInterval);
  }

  _scrambleRandomChars() {
    if (this.heat.active && this.heat.maxValue > 0.5) return;

    const numChars = Math.floor(this.charGrid.length * this.scrambleAmount);
    for (let i = 0; i < numChars; i++) {
      const randomIndex = Math.floor(Math.random() * this.charGrid.length);
      this.charGrid[randomIndex].char = this._getRandomChar();
    }

    this._renderStaticGrid();
    if (!this.heat.active) this._render();
  }

  _bindEvents() {
    const c = this.canvas;
    c.addEventListener("pointermove", this._move, { passive: true });
    c.addEventListener("pointerdown", this._down, { passive: true });
    c.addEventListener("pointerleave", this._leave, { passive: true });
    c.addEventListener("pointercancel", this._leave, { passive: true });
    document.addEventListener("visibilitychange", this._visibilityChange);
  }

  _visibilityChange() {
    this.scrambleActive = !document.hidden;
  }

  _start() {
    if (!this.heat.active) {
      this.heat.active = true;
      this._anim();
    }
  }

  _stop() {
    this.heat.active = false;
    cancelAnimationFrame(this._raf);
    this._render();
  }

  _anim = () => {
    this._update();
    this._render();
    if (this.heat.active) {
      this._raf = requestAnimationFrame(this._anim);
    }
  };

  _render() {
    const { ctx, W, H, res, P, heat, coverCanvas, staticCanvas } = this;
    ctx.clearRect(0, 0, W, H);
    ctx.drawImage(staticCanvas, 0, 0);

    if (heat.active || heat.maxValue > 0) {
      const gridSize = P.grid.size;
      const threshold = P.effect.threshold;
      for (let y = 0; y < H; y += gridSize) {
        for (let x = 0; x < W; x += gridSize) {
          const idx =
            Math.floor((y / H) * res) * res + Math.floor((x / W) * res);
          if (heat.current[idx] > threshold) {
            ctx.save();
            ctx.beginPath();
            ctx.rect(x, y, gridSize, gridSize);
            ctx.clip();
            ctx.drawImage(coverCanvas, 0, 0);
            ctx.restore();
          }
        }
      }
    }
  }

  _update() {
    const now = performance.now();
    if (!this.heat.lastTime) {
      this.heat.lastTime = now;
      return;
    }
    const H = this.heat;
    const P = this.P.effect;
    H.lastTime = now;
    H.maxValue = 0;

    const res = this.res;
    const tempGrid = new Float32Array(res * res);

    for (let y = 1; y < res - 1; y++) {
      for (let x = 1; x < res - 1; x++) {
        const idx = y * res + x;
        if (
          H.current[idx] < P.threshold &&
          H.current[idx - res] < P.threshold &&
          H.current[idx + res] < P.threshold &&
          H.current[idx - 1] < P.threshold &&
          H.current[idx + 1] < P.threshold
        ) {
          continue;
        }

        const up = H.current[idx - res];
        const down = H.current[idx + res];
        const left = H.current[idx - 1];
        const right = H.current[idx + 1];
        const upLeft = H.current[idx - res - 1];
        const upRight = H.current[idx - res + 1];
        const downLeft = H.current[idx + res - 1];
        const downRight = H.current[idx + res + 1];

        const neighbors =
          (up + down + left + right) * 0.15 +
          (upLeft + upRight + downLeft + downRight) * 0.05;

        tempGrid[idx] =
          H.current[idx] * (1 - P.diffusion) + neighbors * P.diffusion;
        tempGrid[idx] *= P.decay;

        if (tempGrid[idx] < P.threshold) {
          tempGrid[idx] = 0;
        } else {
          H.maxValue = Math.max(H.maxValue, tempGrid[idx]);
        }
      }
    }

    H.current.set(tempGrid);

    for (let i = 0; i < res; i++) {
      H.current[i] *= P.decay;
      H.current[(res - 1) * res + i] *= P.decay;
      H.current[i * res] *= P.decay;
      H.current[i * res + (res - 1)] *= P.decay;
    }

    if (H.maxValue <= P.threshold) {
      this._stop();
    }
  }

  _addHeat(px, py, amount = 1) {
    const nx = (px / this.W) * this.res;
    const ny = (py / this.H) * this.res;
    const rad = 12;

    for (let i = -rad; i <= rad; i++) {
      for (let j = -rad; j <= rad; j++) {
        const x = Math.floor(nx + i);
        const y = Math.floor(ny + j);
        if (x < 0 || x >= this.res || y < 0 || y >= this.res) continue;

        const idx = y * this.res + x;
        const d = Math.hypot(i, j);

        if (d <= rad) {
          const intensity = amount * Math.pow(1 - d / rad, 1.5);
          this.heat.current[idx] += intensity;
          this.heat.current[idx] = Math.min(1, this.heat.current[idx]);
          this.heat.maxValue = Math.max(
            this.heat.maxValue,
            this.heat.current[idx],
          );
        }
      }
    }

    this._start();
  }

  _move(e) {
    const now = performance.now();
    if (now - (this._lastEvt || 0) < 30) return;
    this._lastEvt = now;

    const { x, y } = this._coords(e);
    if (this._lastX != null) {
      const d = Math.hypot(x - this._lastX, y - this._lastY);
      if (d > 2) this._addHeat(x, y, Math.min(d * 0.03, 0.8));
    }
    this._lastX = x;
    this._lastY = y;
  }

  _down(e) {
    const { x, y } = this._coords(e);
    this._addHeat(x, y, 1.5);
    this._lastX = x;
    this._lastY = y;
  }

  _leave() {
    this._lastX = this._lastY = null;
  }

  _coords(e) {
    const r = this.canvas.getBoundingClientRect();
    const cx =
      (e.clientX !== undefined ? e.clientX : e.touches[0].clientX) - r.left;
    const cy =
      (e.clientY !== undefined ? e.clientY : e.touches[0].clientY) - r.top;
    return {
      x: cx * (this.W / r.width),
      y: cy * (this.H / r.height),
    };
  }

  _clearHeat() {
    this.heat.current.fill(0);
    this.heat.lastTime = 0;
    this.heat.maxValue = 0;
  }

  destroy() {
    if (this.scrambleTimer) clearInterval(this.scrambleTimer);
    this._stop();
    this.canvas.removeEventListener("pointermove", this._move);
    this.canvas.removeEventListener("pointerdown", this._down);
    this.canvas.removeEventListener("pointerleave", this._leave);
    this.canvas.removeEventListener("pointercancel", this._leave);
    document.removeEventListener("visibilitychange", this._visibilityChange);
  }
}

function useTextHeatReveal(canvasRef, imgSrc, options) {
  const [isReady, setIsReady] = useState(false);
  const instanceRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return;

    let resizeTimeout;

    const initEngine = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);

      setIsReady(false);
      const instance = new TextHeatReveal(canvas, imgSrc, {
        ...options,
        onReady: () => setIsReady(true),
      });
      instanceRef.current = instance;
    };

    initEngine();

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        instanceRef.current?.destroy();
        initEngine();
      }, 200);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
      instanceRef.current?.destroy();
      instanceRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgSrc]);

  return { isReady };
}

export default function AsciiPortrait() {
  const canvasRef = useRef(null);

  const { isReady } = useTextHeatReveal(canvasRef, IMAGE_SRC, {
    gridSize: 14,
    fontSize: 10,
    characters: "vczXYUJQLOZdhbka*M#w+-?10{}[]()/|\\",
    resolution: 96,
    diffusion: 0.92,
    decay: 0.98,
    threshold: 0.04,
    contrast: 1.25,
    minBrightness: 0.15,
    textOpacity: 0.55,
    imageBrightness: 1,
    imageContrast: 1.0,
    scrambleInterval: 1500,
    scrambleAmount: 0.08,
  });

  return (
    <div
      className="
        group
        w-full h-full relative aspect-[0.8]
        overflow-hidden rounded-2xl
        border border-white/5
        backdrop-blur-md shadow-2xl select-none
      "
      aria-label="Retrato ASCII interactivo de Paula Velez"
      role="img"
    >
      <img
        src={IMAGE_SRC}
        alt="Paula Velez"
        className="
          absolute inset-0 z-0
          w-full h-full object-cover
          scale-100
          transition-all duration-700 ease-out
          group-hover:scale-105
        "
      />
      <div
        className="
          absolute inset-0 z-10
          bg-[#0a0a0c]/90
          transition-all duration-700 ease-out
          [clip-path:polygon(100%_0,100%_0,100%_100%,100%_100%)]
          group-hover:[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]
        "
      />
      <canvas
        ref={canvasRef}
        className="
          absolute inset-0 z-20
          w-full h-full touch-none cursor-pointer
          transition-all duration-700 ease-out
          [clip-path:polygon(100%_0,100%_0,100%_100%,100%_100%)]
          group-hover:[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]
        "
      />

      {!isReady && (
        <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
          <div className="text-neutral-500 font-mono text-[10px] tracking-widest uppercase animate-pulse">
            Loading system matrix...
          </div>
        </div>
      )}
      <div className="absolute bottom-0 right-0 z-30 w-30 h-24 pointer-events-none">
        <div
          className="
            absolute bottom-0 right-0 w-full h-full rounded-br-[32px]
            bg-gradient-to-tl from-white/20 to-transparent
            [clip-path:polygon(100%_100%,0_100%,100%_0)]
            transition-transform duration-500
            group-hover:scale-110
          "
        />
        <div className="flex flex-row items-center gap-2 absolute bottom-3 right-3 text-[8px] tracking-[0.25em] text-white/60 font-space uppercase">
          <span>REVEAL</span>
          <span className="text-[#A3E635] text-sm">↗</span>
        </div>
      </div>
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
