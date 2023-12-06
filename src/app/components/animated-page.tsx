"use client";

import { motion, AnimatePresence } from "framer-motion";

export const AnimatedPage = ({ children }) => (
  <>
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ delay: 0.25, duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  </>
);
