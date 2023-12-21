"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Globe2, GraduationCap, Stars } from "lucide-react";
import { createElement, useState } from "react";

export const cards = [
  {
    title: "Deeper Understanding",
    description:
      "Explore and gain profound insights into the Bible and the Christian faith with our in-depth courses.",
    icon: "BookOpen",
  },
  {
    title: "Online Access",
    description:
      "Access course content and valuable resources from any corner of the world through our online platform.",
    icon: "Globe2",
  },
  {
    title: "Expository Teaching",
    description:
      "Benefit from a diverse range of instructors and educators who offer a comprehensive and engaging learning experience.",
    icon: "GraduationCap",
  },
  {
    title: "Accreditation",
    description:
      "Stay tuned for upcoming accreditation details, ensuring the quality and recognition of our programs in the near future.",
    icon: "Stars",
  },
];

const iconComponents: { [key: string]: React.ComponentType<any> } = {
  BookOpen: BookOpen,
  Globe2: Globe2,
  GraduationCap: GraduationCap,
  Stars: Stars,
};

export const CardHover = () => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-4  py-10">
        {cards.map((card, idx) => (
          <div
            key={card?.title}
            className="relative group  block p-2 h-full w-full "
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-muted block  rounded-3xl"
                  layoutId="hoverBackground" // required for the background to follow
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>
            <div className="hover:shadow-2xl dark:hover:shadow-none transition-all duration-300 rounded-2xl h-full w-full p-2 overflow-hidden group-hover:border-accent relative z-40">
              <div className="relative z-40">
                <div className="p-4 space-y-4">
                  {createElement(iconComponents[card.icon], {
                    strokeWidth: 1,
                    width: 40,
                    height: 40,
                    className: "text-black",
                  })}
                  <h2 className="font-semibold text-xl">{card.title}</h2>
                  <p className="text-black dark:text-transparent bg-clip-text bg-gradient-to-br dark:from-muted-foreground from-40% dark:to-muted">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
