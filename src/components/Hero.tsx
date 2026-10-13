import { useEffect, useRef, useState } from "react";
import RotatingTitle from "./RotatingTitle";
import { motion, type Variants } from "framer-motion";
import Typewriter from "typewriter-effect";

// Wadah pembungkus utama
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const skills = [
  { name: "Laravel", className: "badge-laravel" },
  { name: "React", className: "badge-react" },
  { name: "Tailwind", className: "badge-tailwind" },
];

const roles = [
  "Junior Web Developer Fullstack Laravel | Livewire, Tailwindcss, React",
  "Beginner Videographer, Design Graphics, UI/UX",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleteing, setIsDeleting] = useState(false);
  const slotRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [ready, setReady] = useState(false);
  const [pos, setPos] = useState({
    x: 0,
    y: 0,
    endScale: 0.5,
    endX: 32,
    endY: 16,
  });

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const speed = isDeleteing ? 30 : 60;

    const timeout = setTimeout(() => {
      if (!isDeleteing) {
        setText(currentRole.substring(0, text.length + 1));
        if (text === currentRole) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setText(currentRole.substring(0, text.length - 1));
        if (text === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [text, isDeleteing, roleIndex]);

  useEffect(() => {
    const measure = () => {
      const slot = slotRef.current;
      if (!slot) return;
      const rect = slot.getBoundingClientRect();
      const fontSize = parseFloat(getComputedStyle(slot).fontSize);
      const mobile = window.innerWidth < 768;
      const endFont = mobile ? 16 : 22;
      setPos({
        x: rect.left + window.scrollX,
        y: rect.top + window.scrollY,
        endScale: endFont / fontSize,
        endX: mobile ? 16 : 32,
        endY: mobile ? 10 : 16,
      });
      setReady(true);
    };

    const onScroll = () => setScrollY(window.scrollY);

    const frame = requestAnimationFrame(() => {
      measure();
      onScroll();
    });
    document.fonts.ready.then(measure);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const range = Math.max(pos.y - pos.endY, 100);
  const progress = Math.min(Math.max(scrollY / range, 0), 1);

  const x = pos.x + (pos.endX - pos.x) * progress;
  const y = pos.y + (pos.endY - pos.y) * progress;
  const scale = 1 + (pos.endScale - 1) * progress;

  return (
    <section id="home" className="hero">
      <div className="hero-inner">
        <div className=".hero-bg">
          <motion.div
            initial="hidden"
            className="hero-text"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: false, amount: 0.1 }}
          >
            <motion.div
              variants={itemVariants}
              ref={slotRef}
              className="hero-title hero-slot"
            >
              Profile Videography
            </motion.div>
            <motion.div variants={itemVariants} className="hero-card">
              <motion.h3 variants={itemVariants} className="hero-hello">
                Halo, Saya
              </motion.h3>
              <motion.p variants={itemVariants} className="hero-name">
                Erza Syahril Pandera
              </motion.p>
              <motion.div
                variants={itemVariants}
                className="hero-info text-base font-medium"
              >
                <Typewriter
                  options={{
                    strings: [
                      "Junior Web Developer Fullstack Laravel | Livewire, Tailwindcss, React",
                      "Beginner Videographer, Design Graphics, UI/UX",
                    ],
                    autoStart: true,
                    loop: true,
                    delay: 50,
                    deleteSpeed: 30,
                  }}
                />
              </motion.div>
            </motion.div>

            {/*  */}
            {/*  */}

            <motion.div variants={itemVariants} className="badges">
              {skills.map((skill) => (
                <motion.span
                  variants={itemVariants}
                  key={skill.name}
                  className={"badge " + skill.className}
                >
                  {skill.name}
                </motion.span>
              ))}
            </motion.div>

            <motion.button
              variants={containerVariants}
              type="button"
              className="button"
            >
              <a href="#">Kunjungi</a>
            </motion.button>
          </motion.div>
        </div>
        <motion.img
          whileHover={{
            scale: 1.07,
            rotate: 2,
            boxShadow: "0px 20px 30px rgba(255, 255, 255, 0.3)",
          }}
          whileInView="visible"
          transition={{ duration: 0.1 }}
          viewport={{ once: false, amount: 0.3 }}
          initial="hidden"
          variants={itemVariants}
          src="/images/foto-saya.jpg"
          alt="Foto profil"
          className="hero-photo"
        />
      </div>

      <h1
        className="hero-title hero-fixed"
        style={{
          transform: `translate(${x}px, ${y}px) scale(${scale})`,
          opacity: ready ? 1 : 0,
        }}
      >
        <RotatingTitle />
      </h1>
    </section>
  );
}
