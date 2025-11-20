import React from "react";
import MovingTextBg from "./components/MovingTextBg";

export default function NotFound() {
  return (
    <MovingTextBg text="404" textColor="text-gray-300">
      <div className="min-h-screen w-full flex flex-col items-center justify-center px-4">

        {/* 404 Heading */}
        <h1 className="text-7xl sm:text-8xl font-extrabold text-black tracking-tight mb-4">
          404
        </h1>

        {/* Subtext */}
        <p className="text-xl text-gray-600">
          Page Not Found
        </p>
      </div>
    </MovingTextBg>
  );
}
