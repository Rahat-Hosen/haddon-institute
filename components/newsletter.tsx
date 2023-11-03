"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Newsletter = () => {
  return (
    <div className="relative overflow-hidden">
      <Content />

      <FuzzyOverlay />
    </div>
  );
};

const FuzzyOverlay = () => {
  return (
    <motion.div
      initial={{ transform: "translateX(-10%) translateY(-10%)" }}
      animate={{
        transform: "translateX(10%) translateY(10%)",
      }}
      transition={{
        repeat: Infinity,

        duration: 0.2,

        ease: "linear",

        repeatType: "mirror",
      }}
      style={{
        backgroundImage: 'url("/noise.png")',
      }}
      className="pointer-events-none absolute -inset-[100%] opacity-[10%]"
    />
  );
};

const Content = () => {
  return (
    <div className="relative grid py-40 place-content-center space-y-6 bg-[#b89c5f] p-8 rounded-2xl">
      <div className="z-10">
        <h2 className="font-semibold text-2xl">
          Stay up to date on promotions and upcoming courses.
        </h2>
        <div className="space-y-2">
          <h3 className="font-semibold text-sm">Email Address</h3>
          <div className="flex">
            <Input
              type="text"
              placeholder="paul@redeemed.church"
              className="w-full mr-4"
            />
            <Button>Submit</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
