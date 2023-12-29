"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FC, ReactNode } from "react";

import { useRouter } from "next/router";

interface TransitionProps {
  children: ReactNode;
}


const variants = {
  out: {
    opacity: 0,
    y: 40,
    transition: {
      duration: 0.75
    }
  },
  in: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      delay: 0.5
    }
  }
};


const Transition: FC<TransitionProps> = ({ children }) => {
  const { asPath } = useRouter();

  return (
    <div className="effect-1">
      <AnimatePresence
        initial={false}
        mode="wait"
      >
        <motion.div
          key={asPath}
          variants={variants}
          animate="in"
          initial="out"
          exit="out"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Transition;
