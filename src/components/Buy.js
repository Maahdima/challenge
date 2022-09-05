import React from "react";
import Navbar from "./Navbar";
import { motion } from "framer-motion";

function Buy({ isSignedin, setIsSignedin }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Navbar setIsSignedin={setIsSignedin} isSignedin={isSignedin} />
      <h2 style={{ margin: "10px" }}>Buy Page</h2>
    </motion.div>
  );
}

export default Buy;
