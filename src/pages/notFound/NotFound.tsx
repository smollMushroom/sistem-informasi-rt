import Lottie from 'lottie-react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import notFoundAnimation from '@/assets/404NotFound.json';
import useBreakpoint from '@/hooks/useBreakpoint';

const NotFound = () => {
  const breakpoint = useBreakpoint();
  const isDesktop = breakpoint === 'desktop';
  const navigate = useNavigate();

  const backToHome = () => {
    navigate('/', { replace: true });
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-gradient-to-b from-white to-green-200/80">
      <Lottie
        animationData={notFoundAnimation}
        loop
        autoplay
        style={{ 
          width: isDesktop ? 400 : 200, height: isDesktop ? 400 : 200}}
      />
      <h1 className="text-[15px] md:text-[30px]">
        Sorry, This Page Isn't Available
      </h1>
      <button
        onClick={backToHome}
        className="bg-primary active:bg-[#428a5a] mt-4 py-2 px-6 rounded-md flex items-center justify-center gap-2 shadow-md"
      >
        <FaArrowLeft className="text-white" size={20} />
        <span className="text-white">Back to Home</span>
      </button>
    </div>
  );
};

export default NotFound;
