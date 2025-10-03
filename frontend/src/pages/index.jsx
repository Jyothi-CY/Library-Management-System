import React from "react";
import Hero from "../components/hero.jsx";
import { motion } from "framer-motion";
import { AuroraBackground } from "../components/ui/aurora-background";
import Trending from "../components/trending.jsx";

export default function Index() {
  return (
    <>
      <AuroraBackground>
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative flex flex-col gap-4 items-center justify-center px-4"
        >
          <Hero />
        </motion.div>
      </AuroraBackground>

      <section className="bg-slate-900">
        <Trending/>
      </section>
    </>
  );
}