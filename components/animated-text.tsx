"use client";

import { motion, Variants, HTMLMotionProps } from "framer-motion";

// Define variants as constants for reusability
const containerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0 },
  },
};

const childVariants: Variants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 200,
    },
  },
  hidden: {
    opacity: 0,
    y: 20,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 200,
    },
  },
};

interface Props extends HTMLMotionProps<"div"> {
  text: string;
  delay?: number;
  duration?: number;
}

export default function AnimatedText({
  text,
  delay = 0,
  duration = 0.05,
  ...props
}: Props) {
  const letters = Array.from(text);

  return (
    <motion.h1
      style={{ display: "flex", overflow: "hidden" }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      {...props}
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={childVariants}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.h1>
  );
}
