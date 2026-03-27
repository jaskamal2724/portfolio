"use client";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const ringXSpring = useSpring(ringX, { damping: 30, stiffness: 120 });
  const ringYSpring = useSpring(ringY, { damping: 30, stiffness: 120 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 5);
      cursorY.set(e.clientY - 5);
      ringX.set(e.clientX - 18);
      ringY.set(e.clientY - 18);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <>
      {/* Dot */}
      <motion.div
        style={{ x: cursorXSpring, y: cursorYSpring }}
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-[#bd34fe] rounded-full pointer-events-none z-[9999] mix-blend-difference"
      />
      {/* Ring */}
      <motion.div
        style={{ x: ringXSpring, y: ringYSpring }}
        className="fixed top-0 left-0 w-9 h-9 border border-[#bd34fe]/60 rounded-full pointer-events-none z-[9998] backdrop-invert-0"
      />
    </>
  );
}
