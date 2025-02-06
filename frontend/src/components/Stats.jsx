import React from "react";
import { motion } from "framer-motion";

function Stats() {
  const stats = [
    { value: "+5,200", label: "Happy Users" },
    { value: "+4,500", label: "Paid Users" },
    { value: "+10,000", label: "Viewers" },
    { value: "+15,000", label: "Total Tasks" },
  ];

  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto text-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: index * 0.2 }}
              className="flex flex-col items-center bg-white shadow-md p-6 rounded-lg"
            >
              <div className="text-4xl md:text-5xl font-bold text-blue-700">{stat.value}</div>
              <div className="text-gray-600 text-lg font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;
