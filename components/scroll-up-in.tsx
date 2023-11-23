"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import Player from "./player";

export const HeroScroll = () => {
  const { scrollYProgress } = useScroll();

  const rotate = useTransform(scrollYProgress, [0, 0.2, 1], [20, 0, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1]);
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      className="w-full relative"
      style={{
        perspective: "1000px",
      }}
    >
      <Card rotate={rotate} translate={translate} scale={scale} />
    </div>
  );
};

export const Card = ({
  rotate,
  scale,
  translate,
}: {
  rotate: any;
  scale: any;
  translate: any;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate, // rotate in X-axis
        scale,
        y: translate, // Use y for translation
      }}
      className="max-w-6xl mx-auto w-full h-full shadow-2xl overflow-hidden aspect-video rounded-2xl"
    >
      <div className="w-full h-full rounded-2xl gap-4 overflow-hidden">
        <motion.div className="rounded-2xl">
          <Player playbackId="5ta2qsCFRlUy01ruxgcfAP6009UlUQVXUj3MOcosx00wjQ" />
        </motion.div>
      </div>
    </motion.div>
  );
};
