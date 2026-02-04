"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
       duration: 1.5, // smoother than 1.2
      easing: (t) => 1 - Math.pow(1 - t, 3), // very natural easing
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}
