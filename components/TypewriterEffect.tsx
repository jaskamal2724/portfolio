"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const WORDS = ["Creative", "Passionate", "Innovative", "Modern"];

export function ScrambleText({ text }: { text: string }) {
  const [display, setDisplay] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*";

  const scramble = () => {
    let iteration = 0;
    const maxIter = text.length * 3;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, idx) => {
            if (idx < Math.floor(iteration / 3)) return char;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      iteration++;
      if (iteration > maxIter) clearInterval(interval);
    }, 30);
  };

  return (
    <span
      onMouseEnter={scramble}
      className="cursor-pointer font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#bd34fe] to-[#41d1ff] select-none"
    >
      {display}
    </span>
  );
}

export function TypewriterWords() {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = WORDS[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && charIndex < word.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), 90);
    } else if (!deleting && charIndex === word.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), 50);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % WORDS.length);
    }
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex]);

  return (
    <span className="inline-block min-w-[220px] text-transparent bg-clip-text bg-gradient-to-r from-[#bd34fe] via-[#9f4dff] to-[#41d1ff]">
      {WORDS[wordIndex].slice(0, charIndex)}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="text-[#bd34fe] opacity-100"
      >
        |
      </motion.span>
    </span>
  );
}
