import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import odoBhramanLogo from "@/assets/odo-bhraman-logo.png";

// ⭐ NEW — Intro music import
import introMusic from "../assets/music/intro.mp3";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  // ⭐ NEW — INTRO MUSIC PLAYER
// ⭐ INTRO MUSIC — play on scroll or tap
useEffect(() => {
  const introPlayed = localStorage.getItem("introPlayed");
  const audio = new Audio(introMusic);

  audio.volume = 0;
  audio.loop = false;

  // Only run if user has not heard intro yet
  if (!introPlayed) {
    // Attempt muted autoplay (allowed by all browsers)
    audio.muted = true;
    audio.play().catch(() => {
      // ignore failures, will play on user gesture
    });

    // Trigger sound once user scrolls or taps
    const activateSound = () => {
      audio.muted = false;

      let v = 0;
      const fade = setInterval(() => {
        if (v < 1) {
          v += 0.05;
          audio.volume = v;
        } else {
          clearInterval(fade);
        }
      }, 120);

      localStorage.setItem("introPlayed", "true");

      // Remove listeners (play only once)
      document.removeEventListener("click", activateSound);
      document.removeEventListener("touchstart", activateSound);
      document.removeEventListener("scroll", activateSound);
    };

    document.addEventListener("click", activateSound, { once: true });
    document.addEventListener("touchstart", activateSound, { once: true });
    document.addEventListener("scroll", activateSound, { once: true });
  }
}, []);



  // ⭐ ORIGINAL ANIMATION (unchanged)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setTimeout(onComplete, 300);
        },
      });

      // Logo fade in with golden glow
      tl.fromTo(
        logoRef.current,
        {
          opacity: 0,
          scale: 0.8,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px) drop-shadow(0 0 30px rgba(244, 196, 48, 0.6))",
          duration: 1.2,
          ease: "power3.out",
        }
      )
        // Title slide up and fade in
        .fromTo(
          titleRef.current,
          {
            opacity: 0,
            y: "15%",
            scale: 1.05,
          },
          {
            opacity: 1,
            y: "0%",
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.6"
        )
        // Tagline fade in
        .fromTo(
          taglineRef.current,
          {
            opacity: 0,
            y: "10%",
          },
          {
            opacity: 1,
            y: "0%",
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.4"
        )
        // hold
        .to({}, { duration: 0.8 })
        // fade out
        .to(containerRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.inOut",
        });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center"
    >
      <img
        ref={logoRef}
        src={odoBhramanLogo}
        alt="Odo Bhraman Logo"
        className="w-32 h-32 md:w-40 md:h-40 mb-6 object-contain"
      />
      <h1
        ref={titleRef}
        className="font-display text-4xl md:text-5xl font-bold text-primary mb-3"
      >
        Odo Bhraman
      </h1>
      <p
        ref={taglineRef}
        className="font-light text-lg md:text-xl text-muted-foreground italic"
      >
        The modern guide to ancient wonders.
      </p>
    </div>
  );
};

export default LoadingScreen;
