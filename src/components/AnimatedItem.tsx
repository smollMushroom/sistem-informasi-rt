import { motion, useInView } from "framer-motion";
import { FC, useRef } from "react";

type Props = {
  children: React.ReactNode,
  delay?: number
  className?: string
}

const AnimatedItem: FC<Props> = ({ children, delay, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedItem