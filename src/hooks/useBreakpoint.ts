import { useEffect, useState } from 'react';

type Breakpoint = 'mobile' | 'tablet' | 'desktop';

const getBreakpoint = (width: number): Breakpoint => {
  if (width < 640) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(
    getBreakpoint(window.innerWidth)
  );

  useEffect(() => {
    const handleResize = () => {
      setBreakpoint(getBreakpoint(window.innerWidth));
    } 

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize)
  }, []);

  return breakpoint;
};

export default useBreakpoint;
