import Lottie from "lottie-react";
import loadingAnimation from "@/assets/loading.json";
import { motion, AnimatePresence } from "framer-motion";
import useBreakpoint from "@/hooks/useBreakpoint";

type Props = {
  isVisible: boolean;
};

const LoadingScreen = ({ isVisible}: Props) => {
  const breakpoint = useBreakpoint()
  const isDesktop = breakpoint === 'desktop'
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="loading"
          className="fixed inset-0 z-50 flex items-center justify-center bg-white"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }} // ← PASTIKAN ini sama dengan delay di App.tsx
        >
          <Lottie
            animationData={loadingAnimation}
            loop
            autoplay
            style={
              { 
                width: isDesktop? 400 : 200,
                height: isDesktop? 400 : 200 
              }
            }
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;