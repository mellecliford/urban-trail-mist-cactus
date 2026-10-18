import { useEffect, useRef } from "react";

/** Falling 1s and 0s behind the homepage hero. One canvas, paused off-screen. */
export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 760px)").matches;
    const fontSize = mobile ? 16 : 15;
    const fps = mobile ? 18 : 28;
    const frameMs = 1000 / fps;

    let raf = 0;
    let offscreen = false;
    let hidden = false;
    let w = 1;
    let h = 1;
    let dpr = 1;
    let columns: number[] = [];
    let lastPaint = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      dpr = mobile ? 1 : Math.min(1.25, window.devicePixelRatio || 1);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#07111f";
      ctx.fillRect(0, 0, w, h);
      const count = Math.ceil(w / fontSize);
      columns = Array.from({ length: count }, () => Math.random() * (h / fontSize));
    };

    const glyph = () => (Math.random() < 0.5 ? "1" : "0");

    const paint = () => {
      ctx.fillStyle = "rgba(7, 17, 31, 0.18)";
      ctx.fillRect(0, 0, w, h);
      ctx.font = `600 ${fontSize}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
      ctx.textBaseline = "top";

      for (let i = 0; i < columns.length; i++) {
        if (mobile && i % 2 === 1) continue;
        const x = i * fontSize;
        const y = columns[i] * fontSize;
        const head = Math.random() > 0.9;
        ctx.fillStyle = head ? "#e7fbff" : Math.random() > 0.82 ? "#7aa0ff" : "#61d7e4";
        ctx.globalAlpha = head ? 0.95 : 0.28 + Math.random() * 0.45;
        ctx.fillText(glyph(), x, y);
        if (y > h && Math.random() > 0.972) columns[i] = 0;
        else columns[i] += Math.random() > 0.82 ? 2 : 1;
      }
      ctx.globalAlpha = 1;
    };

    const paintStill = () => {
      ctx.fillStyle = "#07111f";
      ctx.fillRect(0, 0, w, h);
      ctx.font = `600 ${fontSize}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
      ctx.textBaseline = "top";
      ctx.fillStyle = "#61d7e4";
      ctx.globalAlpha = 0.28;
      const cols = Math.ceil(w / fontSize);
      const rows = Math.ceil(h / fontSize);
      for (let i = 0; i < cols; i += 2) {
        for (let r = 0; r < rows; r += 3) {
          if (Math.random() > 0.55) continue;
          ctx.fillText(glyph(), i * fontSize, r * fontSize);
        }
      }
      ctx.globalAlpha = 1;
    };

    resize();
    if (reduced) paintStill();
    else paint();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const io = new IntersectionObserver(
      (entries) => {
        offscreen = !entries[0]?.isIntersecting;
      },
      { threshold: 0.02 },
    );
    io.observe(canvas);

    const onVisibility = () => {
      hidden = document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibility);

    if (!reduced) {
      const loop = (now: number) => {
        raf = window.requestAnimationFrame(loop);
        if (offscreen || hidden || now - lastPaint < frameMs) return;
        lastPaint = now;
        paint();
      };
      raf = window.requestAnimationFrame(loop);
    }

    return () => {
      window.cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="matrix-rain" aria-hidden="true" />;
}
