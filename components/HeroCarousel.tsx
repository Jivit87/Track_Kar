"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

const heroImages = [
  {
    imgUrl: "/assets/images/hero-4.png",
    alt: "book",
    bgColor: "bg-rose-100",
    accentColor: "bg-rose-200",
    shadowColor: "shadow-rose-300/40",
  },
  {
    imgUrl: "/assets/images/hero-2.png",
    alt: "shoes",
    bgColor: "bg-rose-100",
    accentColor: "bg-rose-200",
    shadowColor: "shadow-rose-300/40",
  },
  {
    imgUrl: "/assets/images/hero-1.png",
    alt: "headphone",
    bgColor: "bg-rose-100",
    accentColor: "bg-rose-200",
    shadowColor: "shadow-rose-300/40",
  },
  {
    imgUrl: "/assets/images/hero-3.png",
    alt: "book",
    bgColor: "bg-rose-100",
    accentColor: "bg-rose-200",
    shadowColor: "shadow-rose-300/40",
  },
  {
    imgUrl: "/assets/images/hero-5.png",
    alt: "toy",
    bgColor: "bg-rose-100",
    accentColor: "bg-rose-200",
    shadowColor: "shadow-rose-300/40",
  },
];

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + heroImages.length) % heroImages.length
    );
  };

  const goToSlide = (index: any) => {
    setCurrentIndex(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="w-full z-100 max-w-2xl mx-auto p-0">
      <div className="relative">
        <div className="relative h-[300px] w-full sm:h-[400px] sm:w-[500px] md:h-[500px] md:w-[700px] overflow-hidden rounded-3xl bg-gradient-to-br mx-auto">
          <div
            className="flex transition-transform duration-700 ease-out h-full"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {heroImages.map((image, index) => (
              <div
                key={index}
                className="w-full h-full flex-shrink-0 relative flex items-center justify-center p-0"
              >
                <div className="absolute inset-0">
                  <div
                    className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
             w-[16rem] h-[16rem] sm:w-[20rem] sm:h-[20rem] md:w-[28rem] md:h-[28rem] rounded-full ${image.bgColor} 
             ${image.shadowColor} shadow-2xl`}
                  />

                  <div
                    className={`absolute top-8 right-6 w-20 h-20 sm:top-12 sm:right-8 sm:w-28 sm:h-28 md:top-16 md:right-12 md:w-40 md:h-40 rounded-full 
             ${image.accentColor} opacity-60`}
                  />

                  <div
                    className={`absolute bottom-12 left-4 w-16 h-16 sm:bottom-16 sm:left-6 sm:w-20 sm:h-20 md:bottom-20 md:left-10 md:w-28 md:h-28 rounded-full 
             ${image.accentColor} opacity-40`}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t 5 rounded-3xl" />
                </div>

                <div className="relative z-10 flex items-center justify-center">
                  <div
                    className={`relative w-[12rem] h-[12rem] sm:w-[16rem] sm:h-[16rem] md:w-[22rem] md:h-[22rem] rounded-full ${image.bgColor} 
             ${image.shadowColor} shadow-xl flex items-center justify-center
             transform hover:scale-105 transition-transform duration-300 border-2 sm:border-3 md:border-4 border-white`}
                  >
                    <img
                      src={image.imgUrl}
                      alt={image.alt}
                      className="w-[8rem] h-[8rem] sm:w-[12rem] sm:h-[12rem] md:w-[16rem] md:h-[16rem] object-contain drop-shadow-lg"
                    />
                  </div>
                </div>

                <div className="absolute top-8 left-4 w-2 h-2 sm:top-12 sm:left-6 sm:w-2.5 sm:h-2.5 md:top-16 md:left-8 md:w-3 md:h-3 bg-gray-300 rounded-full" />
                <div className="absolute bottom-20 right-12 w-1.5 h-1.5 sm:bottom-24 sm:right-14 sm:w-2 sm:h-2 md:bottom-32 md:right-20 md:w-2 md:h-2 bg-gray-400 rounded-full" />
                <div className="absolute top-20 right-20 w-1.5 h-1.5 sm:top-24 sm:right-24 sm:w-2 sm:h-2 md:top-32 md:right-32 md:w-2 md:h-2 bg-gray-300 rounded-full" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-4 sm:mt-6 space-x-2 sm:space-x-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full bg-gray-300
                ${index === currentIndex
                  ? "w-6 h-2 sm:w-8 sm:h-3 bg-gray-600"
                  : "w-2 h-2 sm:w-3 sm:h-3"
                }`}
            />
          ))}
        </div>

        <div className="mt-3 sm:mt-4 w-full rounded-full h-0.5 sm:h-1 bg-gray-200 overflow-hidden">
          <div
            className="h-full bg-gray-600 transition-all duration-300 ease-out"
            style={{
              width: `${((currentIndex + 1) / heroImages.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;