import { useEffect, useState } from "react";

const links = [
  { label: "Home", short: "Home", href: "#home" },
  { label: "About", short: "About", href: "#about" },
  { label: "Skills", short: "Skills", href: "#skills" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={scrolled ? "navbar scrolled" : "navbar"}>
      <nav>
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href}>
                <span className="full">{link.label}</span>
                <span className="short">{link.short}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
