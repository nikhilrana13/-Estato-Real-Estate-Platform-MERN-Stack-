
import React, { useEffect, useRef } from "react";
import Lenis from "lenis";

const SmoothScrollWrapper = ({ children }) => {
  const lenisRef = useRef(null);

  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 1.4,      // scroll speed
      easing: (t) => t, 
      smooth: true,
      smoothTouch: false,
      wheelMultiplier: 1.2,
    });

    function animate(time) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

    return () => {
      lenisRef.current?.destroy();
    };
  }, []);
    
  if (typeof children === "function") {
    return children(lenisRef.current);
  }
  return <>{children}</>;

};

export default SmoothScrollWrapper;
