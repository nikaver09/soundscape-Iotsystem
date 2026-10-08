"use client";
import { useEffect, useState } from "react";

export interface Telemetry {
  ambientDb: number;
  maskingDb: number;
  targetDb: number;
  temp: number;
  humidity: number;
  status: "Holding target" | "Adjusting" | "Masking noise";
}

const TARGET = 45;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const initial: Telemetry = { ambientDb: 44, maskingDb: 20, targetDb: TARGET, temp: 24.5, humidity: 52, status: "Holding target" };

/** Simulated sensor feed. Swap the interval for your MQTT / WebSocket / REST source. */
export function useTelemetry(intervalMs = 1200): Telemetry {
  const [t, setT] = useState<Telemetry>(initial);

  useEffect(() => {
    let n = 0;
    const id = setInterval(() => {
      n++;
      setT((p) => {
        const ambientDb = clamp(50 + Math.sin(n / 6) * 13 + (Math.random() - 0.5) * 5, 30, 80);
        const error = ambientDb - TARGET;
        const goal = clamp(20 + error * 1.6, 15, 70);
        return {
          ...p,
          ambientDb,
          maskingDb: p.maskingDb + (goal - p.maskingDb) * 0.4,
          temp: clamp(p.temp + (Math.random() - 0.5) * 0.2, 22, 28),
          humidity: clamp(p.humidity + (Math.random() - 0.5) * 0.8, 40, 65),
          status: error > 8 ? "Masking noise" : error > 2 ? "Adjusting" : "Holding target",
        };
      });
    }, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return t;
}
