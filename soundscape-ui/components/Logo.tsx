import Image from "next/image";

export default function Logo() {
  return (
    <a className="brand" href="/" aria-label="Soundscape home">
      <Image src="/logo.svg" alt="" width={48} height={48} priority />
      <span>Soundscape<span className="brand-period" aria-hidden="true">.</span></span>
    </a>
  );
}
