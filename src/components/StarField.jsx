import { useEffect, useRef, useMemo } from "react";

export default function StarField({ className = "" }) {
  const canvasRef = useRef(null);

  // Generate star data once — deterministic via seeded positions
  const stars = useMemo(() => {
    const arr = [];
    // Use a simple LCG pseudo-random to keep stars stable across re-renders
    let seed = 42;
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) & 0xffffffff;
      return (seed >>> 0) / 0xffffffff;
    };
    for (let i = 0; i < 320; i++) {
      arr.push({
        x: rand(),
        y: rand(),
        r: rand() * 1.1 + 0.15,
        a: rand() * 0.65 + 0.2,
        twinkle: rand() * 5000 + 2000, // ms
        offset: rand() * 6283,         // phase offset
      });
    }
    return arr;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let startTime = performance.now();

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const draw = (now) => {
      const t = now - startTime;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((s) => {
        const twinkle = 0.5 + 0.5 * Math.sin((t / s.twinkle) * Math.PI * 2 + s.offset);
        const alpha = s.a * (0.6 + 0.4 * twinkle);
        ctx.beginPath();
        ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(210, 230, 255, ${alpha})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, [stars]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}
