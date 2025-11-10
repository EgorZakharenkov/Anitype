"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LeafIcon } from "@/components/icons/leaf";

const SNOWFLAKES_DATA = [
  { id: 1, left: 8, delay: 0, duration: 22, x: 25, size: 16, rotate: 360 },
  { id: 2, left: 22, delay: 2, duration: 28, x: -35, size: 20, rotate: -360 },
  { id: 3, left: 38, delay: 4, duration: 20, x: 45, size: 14, rotate: 540 },
  { id: 4, left: 52, delay: 1, duration: 25, x: -20, size: 18, rotate: -270 },
  { id: 5, left: 68, delay: 3, duration: 19, x: 30, size: 22, rotate: 450 },
  { id: 6, left: 82, delay: 5, duration: 26, x: -40, size: 16, rotate: -180 },
  { id: 7, left: 12, delay: 1.5, duration: 23, x: 35, size: 19, rotate: 360 },
  { id: 8, left: 28, delay: 3.5, duration: 21, x: -25, size: 21, rotate: -360 },
  { id: 9, left: 45, delay: 0.8, duration: 24, x: 40, size: 15, rotate: 270 },
  {
    id: 10,
    left: 62,
    delay: 4.2,
    duration: 27,
    x: -30,
    size: 23,
    rotate: -450,
  },
];

export const FallingSnowflakes = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {SNOWFLAKES_DATA.map(({ id, x, delay, duration, rotate, size, left }) => (
        <motion.div
          key={id}
          className="absolute"
          style={{
            left: `${left}%`,
          }}
          initial={{
            y: -80,
            x: 0,
            rotate: 0,
            opacity: 0,
          }}
          animate={{
            y: "110vh",
            x: x,
            rotate: rotate,
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: duration,
            repeat: Infinity,
            delay: delay,
            ease: "easeInOut",
          }}
        >
          <LeafIcon size={size} />
        </motion.div>
      ))}
    </div>
  );
};
