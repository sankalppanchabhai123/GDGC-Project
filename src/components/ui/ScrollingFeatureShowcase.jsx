import React, { useState, useEffect, useRef } from "react";

// --- Project Slides Data ---
const slidesData = [
  {
    title: "AI Code Generator",
    description:
      "A web-based AI tool that converts plain English instructions into clean, production-ready code. Users can describe logic, algorithms, or features, and the system generates optimized code snippets instantly. Built to improve developer productivity, reduce boilerplate work, and accelerate prototyping across multiple programming languages.",
    image:
      "https://images.unsplash.com/photo-1564865878688-9a244444042a?q=80&w=2070&auto=format&fit=crop",
    bgColor: "#151515",
    textColor: "#e5e7eb",
    liveLink: "https://your-live-demo.com", 
    githubLink: "https://github.com/yourusername/ai-code-generator",
  },
  {
    title: "Smart Debugger & Refactor Tool",
    description:
      "An intelligent debugging platform that analyzes source code to detect logical errors, syntax issues, and performance bottlenecks. It also suggests refactored versions following best practices, improving readability, maintainability, and execution efficiency. Ideal for learning, debugging, and improving real-world codebases.",
    image:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop",
    bgColor: "#0e1324",
    textColor: "#e5e7eb",
    liveLink: "https://your-live-demo.com",
    githubLink: "https://github.com/yourusername/smart-debugger",
  },
  {
    title: "Multi-Language Code Translator",
    description:
      "A developer tool that translates code between different programming languages such as JavaScript, Python, Java, and C++. It helps developers quickly understand unfamiliar languages by converting known code into a target language while preserving logic and structure.",
    image:
      "https://images.unsplash.com/photo-1608306448197-e83633f1261c?q=80&w=1974&auto=format&fit=crop",
    bgColor: "#090d18",
    textColor: "#e5e7eb",
    liveLink: "https://your-live-demo.com",
    githubLink: "https://github.com/yourusername/code-translator",
  },
  {
    title: "Developer Workflow Automation",
    description:
      "A productivity-focused application that automates repetitive developer tasks such as generating documentation, creating unit tests, formatting code, and producing API summaries. Designed to streamline development workflows and allow engineers to focus more on problem-solving and feature building.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
    bgColor: "#0b1120",
    textColor: "#e5e7eb",
    liveLink: "https://your-live-demo.com",
    githubLink: "https://github.com/yourusername/workflow-automation",
  },
];

export default function ScrollingFeatureShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollableHeight = container.scrollHeight - window.innerHeight;
      const stepHeight = scrollableHeight / slidesData.length;

      const index = Math.min(
        slidesData.length - 1,
        Math.floor(container.scrollTop / stepHeight),
      );

      setActiveIndex(index);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const dynamicStyles = {
    backgroundColor: "#151515",
    color: slidesData[activeIndex].textColor,
    transition: "background-color 0.6s ease, color 0.6s ease",
  };

  const gridPatternStyle = {
    "--grid-color": "rgba(255,255,255,0.22)",
    backgroundImage: `
      linear-gradient(to right, var(--grid-color) 1px, transparent 1px),
      linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)
    `,
    backgroundSize: "3.5rem 3.5rem",
  };

  return (
    <div style={{ paddingBottom:"100px"}}>
    <div
      ref={scrollContainerRef}
      className="h-screen w-full overflow-y-auto "
      style={{ scrollbarWidth: "none", msOverflowStyle: "none"  }}
    >
      <div style={{ height: `${slidesData.length * 100}vh`  }}>
        <div
          className="sticky top-0 h-screen w-full flex items-center justify-center"
          style={dynamicStyles}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 h-full w-full max-w-7xl mx-auto">
            {/* LEFT SECTION */}
            <div className="relative flex flex-col justify-center p-10 md:p-16 border-r border-white/10" >
              {/* Pagination */}
              <div className="absolute top-40 left-16 flex space-x-2 " style={{ gap: "4px" }}>
                {slidesData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      const container = scrollContainerRef.current;
                      if (!container) return;

                      const scrollableHeight =
                        container.scrollHeight - window.innerHeight;
                      const stepHeight = scrollableHeight / slidesData.length;

                      container.scrollTo({
                        top: stepHeight * index,
                        behavior: "smooth",
                      });
                    }}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      index === activeIndex
                        ? "w-12 bg-white"
                        : "w-6 bg-white/30"
                    }`}
                  />
                ))}
              </div>

              {/* Text */}
              <div className="relative h-64">
                {slidesData.map((slide, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-700 ${
                      index === activeIndex
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
                  >
                    <h2 className="text-5xl font-bold text-white">
                      {slide.title}
                    </h2>

                    <p className=" max-w-md text-gray-300" style={{ marginTop: "16px" }}>
                      {slide.description}
                    </p>

                    
                        <h3 className= " font-bold text-white"  style={{ marginTop: "12px" , color:"white"}}>Tech stack</h3>
                  
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="absolute bottom-16 left-16 flex" style={{ gap: "1rem" }}>
                <a
                  href={slidesData[activeIndex].liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition"
                  style={{ padding: "12px 32px" }}
                >
                  Live Demo
                </a>
                <a
                  href={slidesData[activeIndex].githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 rounded-full border-2 border-white text-white font-semibold hover:bg-white hover:text-indigo-600 transition"
                  style={{ padding: "12px 32px" }}
                >
                  GitHub
                </a>
              </div>
            </div>

            {/* RIGHT SECTION */}
            <div
              className="hidden md:flex items-center justify-center p-8"
              style={gridPatternStyle}
            >
             <div className="relative aspect-square w-[60%] max-w-[420px] overflow-hidden rounded-2xl shadow-2xl">
                
                <div
                  className="absolute w-full h-full transition-transform duration-700"
                  style={{
                    transform: `translateY(-${activeIndex * 100}%)`,
                  }}
                >
                  {slidesData.map((slide, index) => (
                    <div key={index} className="w-full h-full">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
