"use client";
import { useEffect, useRef } from "react";

interface Props {
  ambient: number; // 0..1, measured room noise
  masking: number; // 0..1, regulator output
}

const layers = [
  { src: "a", count: 3, rgb: "159,208,255", speed: 1100, jitter: 0.035 },
  { src: "m", count: 2, rgb: "255,180,84", speed: 1700, jitter: 0 },
] as const;

export default function WaveCanvas({ ambient, masking }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const target = useRef({ a: ambient, m: masking });
  target.current = { a: ambient, m: masking };

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;

    const cur = { a: 0.3, m: 0.2 };
    let w = 0, h = 0, raf = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time: number) => {
      cur.a += (target.current.a - cur.a) * 0.04;
      cur.m += (target.current.m - cur.m) * 0.04;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      ctx.lineWidth = 1.4;

      for (const l of layers) {
        const amp = cur[l.src === "a" ? "a" : "m"];
        for (let i = 0; i < l.count; i++) {
          ctx.beginPath();
          for (let x = 0; x <= w; x += 5) {
            const k = x / w;
            const env = Math.sin(k * Math.PI);
            const y =
              h * 0.42 +
              (Math.sin(k * (5 + i * 2) + (time / l.speed) * (1 + i * 0.3) + i * 1.7) * amp * h * 0.22 +
                Math.sin(k * 23 + time / 300) * amp * h * l.jitter) * env;
            x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          }
          ctx.strokeStyle = `rgba(${l.rgb},${0.55 - i * 0.14})`;
          ctx.stroke();
        }
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="wave" aria-hidden="true" />;
}
