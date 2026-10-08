"use client";
import { motion } from "framer-motion";
import type { Telemetry } from "@/lib/useTelemetry";

const pct = (v: number) => `${Math.min(100, Math.max(0, ((v - 20) / 60) * 100))}%`;

interface MeterProps {
  label: string;
  value: number;
  tone: "cool" | "warm";
  target?: number;
}

function Meter({ label, value, tone, target }: MeterProps) {
  return (
    <div className={`meter ${tone}`}>
      <span className="label">{label}</span>
      <p className="num">
        {value.toFixed(1)}
        <small>dB</small>
      </p>
      <div className="track">
        <motion.i animate={{ width: pct(value) }} transition={{ type: "spring", stiffness: 60, damping: 18 }} />
        {target !== undefined && <b style={{ left: pct(target) }} title="Target level" />}
      </div>
    </div>
  );
}

export default function Readout({ t }: { t: Telemetry }) {
  return (
    <section className="section" aria-labelledby="live">
      <h2 id="live">
        <span className="dot-live" />
        Live readout <small>Simulated data</small>
      </h2>
      <div className="duo">
        <Meter label="Room noise" value={t.ambientDb} tone="cool" target={t.targetDb} />
        <Meter label="Masking output" value={t.maskingDb} tone="warm" />
      </div>
      <dl className="stats">
        <div><dt>Temperature</dt><dd>{t.temp.toFixed(1)}°C</dd></div>
        <div><dt>Humidity</dt><dd>{Math.round(t.humidity)}%</dd></div>
        <div><dt>Status</dt><dd>{t.status}</dd></div>
      </dl>
    </section>
  );
}
