"use client";

import { useEffect, useState } from "react";
import { useScrollAnimation } from "./useScrollAnimation";

export function useCountUp(target: string, duration = 1500) {
  const { ref, isVisible } = useScrollAnimation(0.3);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isVisible) return;

    // Parse the target — handle "90", "100%", "24/7"
    const isPercentage = target.includes("%");
    const isRatio = target.includes("/");

    if (isRatio) {
      // Animate "24/7" by showing it after a delay
      setTimeout(() => setDisplay(target), 200);
      return;
    }

    const numericValue = parseInt(target.replace(/[^0-9]/g, ""));
    const suffix = isPercentage ? "%" : "";
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * numericValue);

      setDisplay(`${current}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, target, duration]);

  return { ref, display, isVisible };
}
