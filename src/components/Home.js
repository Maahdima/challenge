import React from "react";
import Navbar from "./Navbar";
import Button from "@mui/material/Button";
import { motion } from "framer-motion";

function Home({ isSignedin, setIsSignedin, clearLocalStorage }) {
  const handleClear = () => {
    console.log("test");
    clearLocalStorage();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Navbar setIsSignedin={setIsSignedin} isSignedin={isSignedin} />
      <h2 style={{ margin: "10px" }}>Home Page</h2>
      <Button
        onClick={handleClear}
        style={{ margin: "10px" }}
        variant="contained"
      >
        Clear localStorage
      </Button>
    </motion.div>
  );
}

export default Home;
