"use client"
import React, { useEffect, useRef, useState } from "react";

const Cursor = () => {
  const cursorRef = useRef(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);
  const animationFrame = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect if mobile device (using pointer coarse or user agent)
    const checkMobile = () => {
      // Using matchMedia pointer coarse as more reliable than UA string
      if (
        window.matchMedia("(pointer: coarse)").matches || 
        /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent)
      ) {
        setIsMobile(true);
      }
    };

    checkMobile();
  }, []);

  useEffect(() => {
    if (isMobile) return; // Skip all cursor logic if mobile

    const handleMouseMove = (e) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
    };

    document.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      currentX.current += (mouseX.current - currentX.current) * 0.1;
      currentY.current += (mouseY.current - currentY.current) * 0.1;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX.current - 12}px, ${currentY.current - 12}px, 0)`;
      }

      animationFrame.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrame.current);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
    >
      {/* Outer Circle */}
      <div className="w-6 h-6 border-2 border-orange-500 rounded-full opacity-70 animate-pulse"></div>

      {/* Inner Dot */}
      <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-red-600 rounded-full -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
};

export default Cursor;
