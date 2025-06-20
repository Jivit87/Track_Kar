"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Zap, TrendingUp, Mail, Globe } from "lucide-react";
import Link from "next/link";

const AnimatedCounter = ({ target, duration = 2 }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      let start = 0;
      const increment = target / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setDisplayValue(target);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(start));
        }
      }, 1000 / 60);

      return () => clearInterval(timer);
    }
  }, [isVisible, target, duration]);

  return <span ref={ref}>{displayValue.toLocaleString()}</span>;
};

const HowItWorks = ({ count = 15000 }) => {
  const steps = [
    {
      id: 1,
      title: "Paste the Link",
      description:
        "Simply copy and paste any Amazon product link into our search bar to get started.",
      icon: <Search className="w-6 h-6 sm:w-8 sm:h-8 text-black" />,
    },
    {
      id: 2,
      title: "Scrape & Redirect",
      description:
        "Our advanced technology extracts product details and pricing information in seconds.",
      icon: <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-black" />,
    },
    {
      id: 3,
      title: "Track Price",
      description:
        "Your product is continuously monitored 24/7 for any price changes and special deals.",
      icon: <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-black" />,
    },
    {
      id: 4,
      title: "Get Email Alerts",
      description:
        "Receive instant email notifications whenever prices drop on your tracked items.",
      icon: <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-black" />,
    },
    {
      id: 5,
      title: "Explore Trending",
      description:
        "Discover popular products and deals tracked by our growing community of users.",
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-black" />,
    },
  ];

  return (
    <div id="how" className="min-h-screen bg-[#FFDCDC]/70 relative">
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-16 sm:h-20 lg:h-24"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-white"
          ></path>
        </svg>
      </div>

      <div className="relative pt-20 sm:pt-24 lg:pt-32 py-10 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-black rounded-full mb-4 sm:mb-6">
              <div className="w-2 h-2 bg-[#FFDCDC] rounded-full animate-pulse"></div>
              <span className="text-[#FFDCDC] font-semibold text-xs sm:text-sm">
                TRACK_KAR
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4 sm:mb-6">
              How It <span className="text-gray-800">Works</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed px-4">
              Follow our simple 5-step process to start saving money on your
              favorite Amazon products. It's easier than you think!
            </p>
          </div>

          <div className="hidden lg:block mb-16 lg:mb-20">
            <div className="relative">
              <div className="absolute top-16 left-0 right-0 h-1 bg-gray-300 rounded-full"></div>
              <div className="absolute top-16 left-0 h-1 bg-black rounded-full w-full transition-all duration-2000 ease-out"></div>

              <div className="grid grid-cols-5 gap-4 xl:gap-8">
                {steps.map((step, index) => (
                  <div key={step.id} className="relative">
                    <div className="relative z-10 mx-auto mb-6 lg:mb-8">
                      <div className="w-24 h-24 xl:w-32 xl:h-32 bg-white rounded-full shadow-lg border-4 border-gray-200 flex flex-col items-center justify-center relative hover:scale-105 transition-transform duration-300">
                        <div className="absolute -top-2 -right-2 w-8 h-8 xl:w-12 xl:h-12 bg-black rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm xl:text-lg">
                            {step.id}
                          </span>
                        </div>
                        {step.icon}
                      </div>
                    </div>

                    <div className="text-center">
                      <h3 className="text-lg xl:text-xl font-bold text-black mb-3 lg:mb-4">
                        {step.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm xl:text-base">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:hidden space-y-8 sm:space-y-12 mb-12 sm:mb-16">
            {steps.map((step, index) => (
              <div key={step.id} className="relative">
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full shadow-lg border-4 border-gray-200 flex items-center justify-center relative">
                      <div className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-black rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xs sm:text-sm">
                          {step.id}
                        </span>
                      </div>
                      {step.icon}
                    </div>
                  </div>

                  <div className="flex-1 pt-1 sm:pt-2">
                    <h3 className="text-lg sm:text-xl font-bold text-black mb-2 sm:mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                      {step.description}
                    </p>
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div className="ml-8 sm:ml-10 mt-4 sm:mt-6 w-0.5 h-8 sm:h-12 bg-gray-300"></div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center">
            <div className="inline-block hover:scale-105 transition-transform duration-300">
              <Link href="/">
                <button className="bg-black hover:bg-gray-800 text-white font-bold px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-lg text-base sm:text-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 mb-6 sm:mb-8">
                  Get Started
                </button>
              </Link>
              <div className="text-xl sm:text-2xl font-bold text-black">
                <AnimatedCounter target={count} />+
              </div>

              <div className="text-gray-900 text-sm sm:text-base font-semibold">
                Products Tracked
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
