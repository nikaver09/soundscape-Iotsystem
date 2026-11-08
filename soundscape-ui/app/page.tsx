"use client";
import { MotionConfig, motion } from "framer-motion";
import WaveCanvas from "@/components/WaveCanvas";
import Pipeline from "@/components/Pipeline";
import Readout from "@/components/Readout";
import { useTelemetry } from "@/lib/useTelemetry";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];
const norm = (db: number) => Math.min(1, Math.max(0.08, (db - 25) / 50));
const lines = ["A room that listens,", "and quietly answers."];

export default function Page() {
  const t = useTelemetry();

  return (
    <MotionConfig reducedMotion="user">
      <main>
        <header className="hero">
          <WaveCanvas ambient={norm(t.ambientDb)} masking={norm(t.maskingDb)} />
          <p className="eyebrow">Soundscape / Ambient intelligence</p>
          <h1>
            {lines.map((l, i) => (
              <span className="mask" key={l}>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, ease, delay: 0.15 + i * 0.18 }}
                >
                  {l}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            className="lead"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            An IoT-driven data telemetry system for automated ambient soundscape regulation.
          </motion.p>
        </header>
        <Pipeline />
        <Readout t={t} />
      </main>
    </MotionConfig>
  );
}
