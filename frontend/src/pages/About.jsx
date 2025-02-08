import React from "react";
import Navbar from "../components/Navbar";
import { FaReact, FaNodeJs, FaDatabase, FaGithub } from "react-icons/fa"; // Import GitHub icon
import { SiMongodb, SiExpress } from "react-icons/si";
import { TbBrandTailwind } from "react-icons/tb";  // Import Tailwind icon
import { MdMail } from "react-icons/md"; // Import Mail icon
import { NavLink } from "react-router-dom";
import Me from "../assets/me2.jpg";
import "../index.css";

function About() {
  return (
    <>
      <Navbar />

      <div className="container mx-auto p-6 space-y-12">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Notely is the first step to making dreams a reality.
        </h2>

        {/* Container for the boxes (flexbox layout) */}
        <div className="flex space-x-6 justify-center">
          {/* First Box: About Notely Description */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-200 w-[400px] h-[600px]">
            <div className="text-xl font-semibold text-blue-600 mb-4 text-center">About Notely</div>
            <p className="text-gray-600 text-lg">
              Notely is an intuitive note-taking and organization app designed to help users capture their thoughts, ideas, and important information seamlessly.
              With a user-friendly interface and powerful features, Notely aims to enhance productivity by keeping all your notes in one place, accessible anytime, anywhere.
            </p>
          </div>

          {/* Second Box: Technologies Used and GitHub Link */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-200 w-[400px] h-[600px]">
            <div className="text-xl font-semibold text-blue-600 mb-4 text-center">Built with</div>
            <div className="flex space-x-6 text-4xl text-gray-700 mb-6">
              <SiMongodb className="hover:text-green-500 transition-colors" />
              <SiExpress className="hover:text-gray-800 transition-colors" />
              <FaReact className="hover:text-blue-500 transition-colors" />
              <FaNodeJs className="hover:text-green-600 transition-colors" />
              <TbBrandTailwind className="hover:text-blue-400 transition-colors" />
            </div>

            <div className="text-center">
              <NavLink
                to="https://github.com/Aryanpatel1066/notely-mern"
                className="text-lg text-blue-600 hover:text-blue-800 no-underline flex items-center justify-center"
              >
                <FaGithub className="mr-2 text-xl" /> View the Source Code
              </NavLink>
            </div>
          </div>
        </div>

        {/* Author Info Section */}
        <div className="flex flex-col items-center bg-white p-8 rounded-2xl shadow-lg border border-blue-200 w-full md:w-[300px] mx-auto">
          <img src={Me} className="profileImg" alt="Author" />

          <div className="text-xl font-semibold text-blue-600 mb-2">Aryan Patel</div>
          <div className="text-gray-600 mb-4">Computer Engineer | MERN Full Stack Developer</div>

          <div className="flex space-x-4 text-xl mb-4">
            {/* Email Link with Mail Icon */}
            <a href="mailto:aryanpatel1248@gmail.com" className="text-blue-600 hover:text-blue-800 flex items-center">
              <MdMail className="mr-2" /> aryanpatel1248@gmail.com
            </a>

            {/* GitHub Link with GitHub Icon */}
            <a
              href="https://github.com/Aryanpatel1066"
              className="text-blue-600 hover:text-blue-800 flex items-center"
            >
              <FaGithub className="mr-2" /> GitHub Profile
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
