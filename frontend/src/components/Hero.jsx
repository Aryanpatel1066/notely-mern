import React from "react";
import hero from "../assets/Hero.png"; // Make sure it's compressed (e.g., WebP)
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center text-center md:flex-row md:justify-between md:text-start md:mt-20 p-4">
      {/* Text Section */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="md:w-1/2 space-y-4"
      >
        <h1 className="text-4xl md:text-5xl font-pacifico text-blue-700">Task Manager</h1>
        <h2 className="text-lg md:text-2xl font-semibold text-blue-600">
          Simplify Your Workday with Smart Task Management.
        </h2>
        <p className="hidden md:block text-gray-600">
          Plan, organize, and execute tasks effortlessly with our intuitive tools—set priorities, track progress, and meet deadlines seamlessly.
        </p>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition duration-300"
        >
          Get Started
        </button>
      </motion.div>

      {/* Image Section */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="md:w-1/2 flex justify-center mt-6 md:mt-0"
      >
        <img
          src={hero}
          alt="Hero Image"
          className="w-[90%] max-w-[500px] md:max-w-[600px] object-contain"
        />
      </motion.div>
    </section>
  );
}

export default Hero;
