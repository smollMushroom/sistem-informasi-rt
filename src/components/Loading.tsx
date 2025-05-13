import Lottie from "lottie-react";
import loadingAnimation from "@/assets/listLoading.json";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  isVisible: boolean;
};

const Loading = ({ isVisible }: Props) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="loading"
          className="flex items-center justify-center bg-gray-100 w-full h-64" // atur ukuran kontainer
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="w-40 h-40"> {/* ukuran Lottie */}
            <Lottie
              animationData={loadingAnimation}
              loop
              autoplay
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loading;