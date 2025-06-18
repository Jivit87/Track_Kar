"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

const heroImages = [
  {
    imgUrl: "/assets/images/hero-4.png",
    alt: "book",
    bgColor: "bg-sky-100",
    accentColor: "bg-sky-200",
    shadowColor: "shadow-sky-300/40",
  },
  {
    imgUrl: "/assets/images/hero-2.png",
    alt: "shoes",
    bgColor: "bg-emerald-100",
    accentColor: "bg-emerald-200",
    shadowColor: "shadow-emerald-300/40",
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
    bgColor: "bg-indigo-100",
    accentColor: "bg-indigo-200",
    shadowColor: "shadow-indigo-300/40",
  },
  {
    imgUrl: "/assets/images/hero-5.png",
    alt: "toy",
    bgColor: "bg-amber-100",
    accentColor: "bg-amber-200",
    shadowColor: "shadow-amber-300/40",
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
        <div className="relative h-[500px] w-[700px] overflow-hidden rounded-3xl bg-gradient-to-br">
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
             w-[28rem] h-[28rem] rounded-full ${image.bgColor} 
             ${image.shadowColor} shadow-2xl`}
                  />

                  <div
                    className={`absolute top-16 right-12 w-40 h-40 rounded-full 
             ${image.accentColor} opacity-60`}
                  />

                  <div
                    className={`absolute bottom-20 left-10 w-28 h-28 rounded-full 
             ${image.accentColor} opacity-40`}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-white/10 rounded-3xl" />
                </div>

                <div className="relative z-10 flex items-center justify-center">
                  <div
                    className={`relative w-[22rem] h-[22rem] rounded-full ${image.bgColor} 
             ${image.shadowColor} shadow-xl flex items-center justify-center
             transform hover:scale-105 transition-transform duration-300 border-4 border-white`}
                  >
                    <img
                      src={image.imgUrl}
                      alt={image.alt}
                      className="w-[16rem] h-[16rem] object-contain drop-shadow-lg"
                    />
                  </div>
                </div>

                <div className="absolute top-16 left-8 w-3 h-3 bg-gray-300 rounded-full" />
                <div className="absolute bottom-32 right-20 w-2 h-2 bg-gray-400 rounded-full" />
                <div className="absolute top-32 right-32 w-2 h-2 bg-gray-300 rounded-full" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-6 space-x-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full
                ${index === currentIndex
                  ? "w-8 h-3 bg-gray-800"
                  : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
                }`}
            />
          ))}
        </div>

        <div className="mt-4 w-full bg-gray-200 rounded-full h-1 overflow-hidden">
          <div
            className="h-full bg-gray-800 transition-all duration-300 ease-out"
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
