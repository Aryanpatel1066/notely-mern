import React from "react";
import add from "../assets/Add.png";
import read from "../assets/Read.png";
import check from "../assets/Check.png";
import del from "../assets/Delete.png";
import pin from "../assets/Pin.png";

const featuresData = [
  {
    title: "Create and Manage Tasks Effortlessly",
    description: "Add tasks with just a few clicks, assign deadlines, set priorities, and track progress in real time.",
    img: add,
    reverse: false,
  },
  {
    title: "Read and Stay on Top of Every Task",
    description: "Quickly review task details, deadlines, and priorities in one organized view.",
    img: read,
    reverse: true,
  },
  {
    title: "Check Tasks with Ease",
    description: "Track progress effortlessly by marking completed tasks and reviewing pending ones.",
    img: check,
    reverse: false,
  },
  {
    title: "Delete Tasks with Confidence",
    description: "Easily remove tasks you no longer need, keeping your workspace clutter-free.",
    img: del,
    reverse: true,
  },
   
];

function Features() {
  return (
    <div className="overflow-hidden py-10">
      {featuresData.map((feature, index) => (
        <div
          key={index}
          className={`flex flex-wrap items-center justify-center gap-6 p-4 text-center md:text-start ${
            feature.reverse ? "flex-row-reverse" : ""
          }`}
        >
          <div className="w-72 md:w-96">
            <img className="w-56 md:w-80 mx-auto" src={feature.img} alt={feature.title} loading="lazy" />
          </div>
          <div className="max-w-lg text-center md:text-start">
            <h2 className="text-2xl md:text-4xl font-bold text-[#3368C0]">{feature.title}</h2>
            <p className="text-lg text-gray-700 mt-2">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Features;
