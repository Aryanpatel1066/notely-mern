import React from "react";
import Navbar from "../components/Navbar";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { MdMail } from "react-icons/md";

function Contact() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-8">
        {/* Heading */}
        <h4 className="text-3xl font-semibold text-center text-blue-600 mb-4">
          Get in Touch
        </h4>

        <div className="text-lg text-gray-600 text-center mb-8">
          My inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </div>

        {/* Contact Button */}
        <div className="text-center mb-8">
          <a
            href="mailto:aryanpatel1248@gmail.com"
            className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 flex items-center justify-center mx-auto w-max"
          >
            <MdMail className="mr-2" />
            Mail Me
          </a>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-8 mt-8">
          {/* GitHub */}
          <a
            href="https://github.com/Aryanpatel1066"
            className="text-3xl text-blue-600 hover:text-blue-800 transition duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/aryanpatel1066/"
            className="text-3xl text-blue-600 hover:text-blue-800 transition duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/aryanpatel1066/"
            className="text-3xl text-blue-600 hover:text-blue-800 transition duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </>
  );
}

export default Contact;
