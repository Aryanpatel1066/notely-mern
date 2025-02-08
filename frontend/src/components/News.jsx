import React from "react";

function News() {
  return (
    <section className="container mx-auto text-center mt-10 p-5">
      <h1 className="text-3xl md:text-5xl font-bold font-chakra">Join Our Newsletter</h1>
      <p className="text-xl md:text-2xl font-semibold mt-2">Sign up for our email newsletter to get updates and more.</p>
      <div className="mt-4 flex flex-col md:flex-row justify-center items-center gap-3">
        <input
          type="email"
          placeholder="Enter your email"
          className="border border-gray-400 p-2 w-[90%] md:w-1/2 rounded-md"
        />
        <button className="bg-[#3368C0] py-2 px-5 text-white text-lg font-bold rounded-md hover:bg-[#2a57a5] transition">
          Subscribe
        </button>
      </div>
    </section>
  );
}

export default News;