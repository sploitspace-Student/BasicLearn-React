import { motion, useScroll, useTransform } from "framer-motion";
import RotatingTitle from "./RotatingTitle";

export default function CornerTitle() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [150, 350], [0, 1]);

  return (
    <motion.div className="corner-title" style={{ opacity }}>
      <RotatingTitle />
    </motion.div>
  );
}
