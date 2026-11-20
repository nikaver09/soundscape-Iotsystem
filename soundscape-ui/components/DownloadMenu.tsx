"use client";

import { useEffect, useRef } from "react";

export default function DownloadMenu() {
  const menu = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    function dismiss(event: PointerEvent) {
      if (event.target instanceof Node && !menu.current?.contains(event.target) && menu.current) {
        menu.current.open = false;
      }
    }
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, []);

  return (
    <section className="section downloads" aria-label="Downloads">
      <details
        className="download-menu"
        ref={menu}
        onKeyDown={(event) => {
          if (event.key === "Escape" && menu.current) {
            menu.current.open = false;
            menu.current.querySelector("summary")?.focus();
          }
        }}
      >
        <summary className="download-trigger">
          Download
          <svg className="download-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </summary>
        <div className="download-options">
          <p>Soundscape for Android</p>
          <a href="/downloads/Soundscape.zip" download="Soundscape.zip">Download Android app <span>.zip</span></a>
        </div>
      </details>
    </section>
  );
}

