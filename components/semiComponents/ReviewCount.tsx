"use client";

import { useState } from "react";

const ReviewCount = ({ baseCount }: { baseCount: number }) => {
  const [displayCount, setDisplayCount] = useState(
    baseCount + Math.floor(Math.random() * 20) + 1
  );

  const handleClick = () => {
    const newRandomCount = baseCount + Math.floor(Math.random() * 20) + 1;
    setDisplayCount(newRandomCount);
  };

  return (
    <p
      className="text-base font-semibold text-[#D46F77] cursor-pointer transition-transform hover:scale-105"
      onClick={handleClick}
      title="Click to refresh"
    >
      {displayCount} +
    </p>
  );
};

export default ReviewCount;