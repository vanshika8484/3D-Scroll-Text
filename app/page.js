"use client";

import Head from "next/head";
import Script from "next/script";
import { useEffect } from "react";
import "./globals.css"; // ✅ Make sure this imports your global CSS

export default function Page() {
  useEffect(() => {
    // Breakpoint script
    const removeHiddenBreakpointLayers = function (breakpoints) {
      function getActiveBreakpoint() {
        for (let { hash, mediaQuery } of breakpoints) {
          if (!mediaQuery) continue;
          if (window.matchMedia(mediaQuery).matches) return hash;
        }
        return breakpoints[0]?.hash;
      }

      let activeHash = getActiveBreakpoint();
      if (activeHash) {
        for (let element of document.querySelectorAll(".hidden-" + activeHash)) {
          element.parentNode?.removeChild(element);
        }
      }

      for (let element of document.querySelectorAll(".ssr-variant")) {
        while (element.firstChild) {
          element.parentNode?.insertBefore(element.firstChild, element);
        }
        element.parentNode?.removeChild(element);
      }

      for (let element of document.querySelectorAll("[data-framer-original-sizes]")) {
        let sizes = element.getAttribute("data-framer-original-sizes");
        sizes === "" ? element.removeAttribute("sizes") : element.setAttribute("sizes", sizes);
        element.removeAttribute("data-framer-original-sizes");
      }
    };

    performance.mark("framer-rewrite-breakpoints-start");
    removeHiddenBreakpointLayers([
      { hash: "72rtr7", mediaQuery: "(min-width: 1200px)" },
      { hash: "1i6nyat", mediaQuery: "(min-width: 810px) and (max-width: 1199px)" },
      { hash: "15hurun", mediaQuery: "(max-width: 809px)" },
    ]);
    performance.mark("framer-rewrite-breakpoints-end");
    performance.measure(
      "framer-rewrite-breakpoints",
      "framer-rewrite-breakpoints-start",
      "framer-rewrite-breakpoints-end"
    );

    // Text update script
    const checkAndUpdateText = () => {
      const container1 = document.querySelector('[data-framer-name="Container-1"]');
      if (container1) {
        let textElements = container1.querySelectorAll(".framer-text");
        if (textElements.length === 0) {
          textElements = container1.querySelectorAll('div[style*="transform"]');
        }
        if (textElements.length === 0) {
          textElements = container1.querySelectorAll("div:not([class]):not([id])");
        }

        let heyfynixCount = 0;
        let creativeCount = 0;

        textElements.forEach((element, index) => {
          const text = element.textContent?.trim() || "";
          let shouldBeHeyfynix = [0, 1, 4, 5, 8, 9, 12, 13, 16, 17, 20, 21, 24, 25, 28, 29, 32, 33].includes(index);
          if (shouldBeHeyfynix) {
            if (text !== "Heyfynix") {
              element.textContent = "Heyfynix";
              heyfynixCount++;
            }
          } else if ([2, 3, 6, 7, 10, 11, 14, 15, 18, 19, 22, 23, 26, 27, 30, 31, 34, 35].includes(index)) {
            if (text !== "A Creative Non-Agency") {
              element.textContent = "A Creative Non-Agency";
              creativeCount++;
            }
          }
        });

        console.log("Updated", heyfynixCount, "Heyfynix texts and", creativeCount, "Creative Non-Agency texts");

        if (textElements.length === 0) {
          console.log("No text elements found, retrying...");
          setTimeout(checkAndUpdateText, 100);
        }
      } else {
        console.log("Container-1 not found, retrying...");
        setTimeout(checkAndUpdateText, 100);
      }
    };

    checkAndUpdateText();

    // ✅ Apply Neue Haas Grotesk font to all text in Container-1
    const applyFont = () => {
      const container1 = document.querySelector('[data-framer-name="Container-1"]');
      if (container1) {
        // Apply to container with !important
        container1.style.setProperty('font-family', '"Neue Haas Grotesk", sans-serif', 'important');
        container1.style.setProperty('line-height', '0.5', 'important'); // Increased line height
        
        // Get all possible elements including SVG text elements
        const allElements = container1.querySelectorAll('*');
        
        // Apply font to all elements and force style recalculation
        allElements.forEach(element => {
          if (element.style) {
            // Apply with !important using setProperty
            element.style.setProperty('font-family', '"Neue Haas Grotesk", sans-serif', 'important');
            element.style.setProperty('line-height', '0.5', 'important'); // Increased line height
            
            // Also set font-family directly as fallback
            element.style.fontFamily = '"Neue Haas Grotesk", sans-serif';
            element.style.lineHeight = '0.5'; // Increased line height
            
            // Force style recalculation
            const computedStyle = window.getComputedStyle(element);
            const fontFamily = computedStyle.getPropertyValue('font-family');
            
            // If font wasn't applied, try another approach
            if (!fontFamily.includes('Neue Haas')) {
              // Remove any existing font-family styles
              element.style.removeProperty('font-family');
              
              // Add a class that forces the font
              element.classList.add('neue-haas-text');
              
              // Force reflow and reapply
              void element.offsetHeight;
              element.style.fontFamily = '"Neue Haas Grotesk", sans-serif !important';
            }
          }
        });
        
        // Also check for any dynamically added elements
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
              if (node.style) {
                node.style.setProperty('font-family', '"Neue Haas Grotesk", sans-serif', 'important');
                node.style.setProperty('line-height', '0.5', 'important'); // Increased line height
              }
              if (node.querySelectorAll) {
                node.querySelectorAll('*').forEach(child => {
                  if (child.style) {
                    child.style.setProperty('font-family', '"Neue Haas Grotesk", sans-serif', 'important');
                    child.style.setProperty('line-height', '0.5', 'important'); // Increased line height
                  }
                });
              }
            });
          });
        });
        
        // Start observing the container for changes
        observer.observe(container1, {
          childList: true,
          subtree: true
        });
        
        console.log("Force-applied Neue Haas Grotesk font to all text in Container-1");
      } else {
        console.log("Container-1 not found, retrying font application...");
        setTimeout(applyFont, 100);
      }
    };

    applyFont();
  }, []);

  return (
    <div className="framer-body-augiA20Il">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <meta name="generator" content="Framer 6124c77" />
        <meta
          name="framer-search-index"
          content="https://framerusercontent.com/sites/1lM8725h777GIZFeuI1eFn/searchIndex-JK96jNKFyTZp.json"
        />
        <link rel="canonical" href="https://3d-text.learnframer.site/" />
        <meta name="description" content="3D Text Scroll Animation Demo for Framer. Created by Framer University." />
        <meta
          property="og:title"
          content="3D Text Scroll Animation in Framer by Framer University"
        />
        <meta
          property="og:description"
          content="3D Text Scroll Animation Demo for Framer. Created by Framer University."
        />
        <meta
          property="og:image"
          content="https://framerusercontent.com/images/mm8q2P9kY8roYbdBOFRmYR6Rlc.jpg"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://3d-text.learnframer.site/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="3D Text Scroll Animation in Framer by Framer University"
        />
        <meta
          name="twitter:description"
          content="3D Text Scroll Animation Demo for Framer. Created by Framer University."
        />
        <meta
          name="twitter:image"
          content="https://framerusercontent.com/images/mm8q2P9kY8roYbdBOFRmYR6Rlc.jpg"
        />
      </Head>

      <Script
        src="https://events.framer.com/script"
        data-fid="946a6eb03c3b23a76dfe87284c25065564030bf288452e2ac503dad2e40f428a"
        strategy="lazyOnload"
      />
      <div
        id="main"
        data-framer-hydrate-v2='{"routeId":"augiA20Il","localeId":"default"}'
        data-framer-ssr-released-at="2024-04-23T14:55:14.046Z"
        data-framer-page-optimized-at="2024-04-23T17:37:04.855Z"
      ></div>
      <div id="svg-templates" style={{ position: "absolute", overflow: "hidden", top: 0, left: 0, width: 0, height: 0 }}></div>
      <Script data-framer-appear-animation="no-preference" strategy="afterInteractive" />
      <Script
        type="module"
        src="https://framerusercontent.com/sites/1lM8725h777GIZFeuI1eFn/default_script0.NHEF75OR.mjs"
        strategy="lazyOnload"
      />
    </div>
  );
}
