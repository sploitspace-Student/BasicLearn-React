import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const words = ["Website", "CSS", "JavaScript", "Laravel"];

export default function RotatingTitle() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      My Profile{" "}
      <span className="word-wrap">
        <AnimatePresence mode="wait">
          <motion.span
            key={words[index]}
            className="word"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </>
  );
}
