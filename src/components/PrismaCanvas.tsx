import { useEffect, useRef } from "react";

type MouseState = {
  x: number;
  y: number;
  tx: number;
  ty: number;
  vx: number;
  vy: number;
  lastX: number;
  lastY: number;
  lastT: number;
  hasPointer: boolean;
};

type Burst = {
  x: number;
  y: number;
  r: number;
  life: number;
  sides: number;
  hue: number;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function polygonPath(ctx: CanvasRenderingContext2D, sides: number, radius: number, time: number, vel: number) {
  ctx.beginPath();
  for (let i = 0; i < sides; i++) {
    const a = (i / sides) * Math.PI * 2;
    const wobble = 1 + Math.sin(time * 3 + i * 1.7) * 0.18 * vel;
    const r = radius * wobble;
    const px = Math.cos(a) * r;
    const py = Math.sin(a) * r;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
}

function strokePrism(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  sides: number,
  radius: number,
  rotation: number,
  time: number,
  vel: number,
  lineWidth: number,
  hue: number,
  alpha: number,
  chromatic: boolean,
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.globalCompositeOperation = "lighter";

  if (chromatic) {
    ctx.save();
    ctx.translate(-1.2, 0);
    polygonPath(ctx, sides, radius, time, vel);
    ctx.strokeStyle = `hsla(${hue + 18}, 92%, 68%, ${alpha * 0.4})`;
    ctx.lineWidth = Math.max(0.6, lineWidth * 0.75);
    ctx.stroke();
    ctx.restore();
  }

  polygonPath(ctx, sides, radius, time, vel);
  ctx.fillStyle = `hsla(${hue}, 80%, 58%, ${alpha * 0.035})`;
  ctx.fill();
  ctx.strokeStyle = `hsla(${hue}, 90%, 72%, ${alpha})`;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
  ctx.restore();
}

export function PrismaCanvas({ onReady }: { onReady?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const mobile = window.matchMedia("(max-width: 760px)").matches;
    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
    if (!ctx) return;

    let raf = 0;
    let paused = false;
    let w = 1;
    let h = 1;
    let dpr = 1;
    const fps = mobile ? 24 : 36;
    const frameMs = 1000 / fps;
    let lastPaint = 0;
    const mouse: MouseState = {
      x: 0,
      y: 0,
      tx: 0,
      ty: 0,
      vx: 0,
      vy: 0,
      lastX: 0,
      lastY: 0,
      lastT: 0,
      hasPointer: false,
    };
    const bursts: Burst[] = [];
    const trail: Array<{ x: number; y: number; sides: number; r: number; hue: number }> = [];
    const trailMax = mobile ? 2 : 4;
    const ready = onReady;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      dpr = mobile ? 1 : Math.min(1.25, window.devicePixelRatio || 1);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!mouse.hasPointer) {
        mouse.x = mouse.tx = mouse.lastX = w * 0.68;
        mouse.y = mouse.ty = mouse.lastY = h * 0.48;
        mouse.lastT = performance.now();
      }
    };

    const paintFrame = (time: number, intro: number) => {
      ctx.clearRect(0, 0, w, h);

      const speedMag = Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy);
      const vel = clamp(speedMag / 1500, 0, 1);
      const sideDelta = Math.round(clamp(mouse.vx / 700 + mouse.vy / 700, -4, 4) * vel);
      const sides = clamp(4 + sideDelta, 3, 12);
      const radius = (28 + speedMag * 0.016) * intro;
      const hue = 188 + ((time * 18) % 42);
      const rotation = time * 0.85 + vel * 0.35;

      if (!mobile && time > 0.45) {
        const ambientX = w * 0.72;
        const ambientY = h * 0.46;
        strokePrism(ctx, ambientX, ambientY, 6, Math.min(160, w * 0.12) * intro, time * 0.12, time, 0.08, 1, 200, 0.1 * intro, false);
      }

      if (mouse.hasPointer && !mobile) {
        trail.push({ x: mouse.x, y: mouse.y, sides, r: radius, hue });
        if (trail.length > trailMax) trail.shift();
        for (let i = 0; i < trail.length; i++) {
          const p = trail[i];
          const t = (i + 1) / trail.length;
          strokePrism(ctx, p.x, p.y, p.sides, p.r * (0.75 + t * 0.25), rotation - (1 - t) * 0.4, time, vel, 1, p.hue, 0.1 * t * intro, false);
        }
      }

      strokePrism(ctx, mouse.x, mouse.y, sides, radius, rotation, time, vel, 2, hue, 0.92 * intro, !mobile && vel > 0.18);

      for (let i = bursts.length - 1; i >= 0; i--) {
        const b = bursts[i];
        b.r += 3.4;
        b.life -= 0.028;
        if (b.life <= 0) {
          bursts.splice(i, 1);
          continue;
        }
        strokePrism(ctx, b.x, b.y, b.sides, b.r, time * 0.6, time, 0.4, 1.15, b.hue, b.life * 0.5 * intro, false);
      }
    };

    const t0 = performance.now();
    let toldReady = false;
    const markReady = () => {
      if (toldReady) return;
      toldReady = true;
      ready?.();
    };

    resize();
    paintFrame(0.04, 0.22);
    container.classList.add("is-live");
    markReady();

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const onMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const now = performance.now();
      const dt = Math.max(8, now - (mouse.lastT || now));
      mouse.tx = x;
      mouse.ty = y;
      mouse.vx = clamp(((x - mouse.lastX) / dt) * 1000, -2500, 2500);
      mouse.vy = clamp(((y - mouse.lastY) / dt) * 1000, -2500, 2500);
      mouse.lastX = x;
      mouse.lastY = y;
      mouse.lastT = now;
      mouse.hasPointer = true;
    };

    const onLeave = () => {
      mouse.hasPointer = false;
      mouse.vx *= 0.4;
      mouse.vy *= 0.4;
    };

    const onDown = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      bursts.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        r: 16,
        life: 1,
        sides: 4 + Math.floor(Math.random() * 4),
        hue: 198 + Math.random() * 28,
      });
    };

    if (finePointer) {
      container.addEventListener("pointermove", onMove, { passive: true });
      container.addEventListener("pointerleave", onLeave, { passive: true });
    }
    container.addEventListener("pointerdown", onDown, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        paused = !entries[0]?.isIntersecting;
      },
      { threshold: 0.02 },
    );
    io.observe(container);

    const onVisibility = () => {
      paused = document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibility);

    if (reduced) {
      return () => {
        ro.disconnect();
        io.disconnect();
        document.removeEventListener("visibilitychange", onVisibility);
        container.removeEventListener("pointermove", onMove);
        container.removeEventListener("pointerleave", onLeave);
        container.removeEventListener("pointerdown", onDown);
      };
    }

    const loop = (now: number) => {
      raf = window.requestAnimationFrame(loop);
      if (paused) return;
      if (now - lastPaint < frameMs) return;
      lastPaint = now;

      const time = (now - t0) / 1000;
      const intro = clamp(time / 0.7, 0.22, 1);

      mouse.vx *= 0.92;
      mouse.vy *= 0.92;

      if (!mouse.hasPointer) {
        mouse.tx = w * 0.7 + Math.cos(time * 0.35) * Math.min(140, w * 0.12);
        mouse.ty = h * 0.48 + Math.sin(time * 0.28) * Math.min(90, h * 0.1);
      }

      mouse.x += (mouse.tx - mouse.x) * 0.16;
      mouse.y += (mouse.ty - mouse.y) * 0.16;

      paintFrame(time, intro);
    };

    raf = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      container.removeEventListener("pointermove", onMove);
      container.removeEventListener("pointerleave", onLeave);
      container.removeEventListener("pointerdown", onDown);
    };
  }, []);

  return (
    <div ref={containerRef} className="prisma-canvas" aria-hidden="true">
      <div className="prisma-canvas__fallback" />
      <canvas ref={canvasRef} />
    </div>
  );
}
