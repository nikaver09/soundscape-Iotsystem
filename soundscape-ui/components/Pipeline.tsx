"use client";
import { motion } from "framer-motion";

const steps = [
  { title: "Listen", body: "Microphones and climate sensors measure the room every second." },
  { title: "Send", body: "Each node streams its readings to the cloud as they happen." },
  { title: "Understand", body: "Software finds noise that crosses the comfort threshold." },
  { title: "Respond", body: "Speakers add masking sound until the room settles." },
];

export default function Pipeline() {
  return (
    <section className="section" aria-labelledby="how">
      <h2 id="how">How the system works</h2>
      <ol className="steps">
        <motion.span
          className="rail"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />
        {steps.map((s, i) => (
          <li key={s.title}>
            <span className="n">{i + 1}</span>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
