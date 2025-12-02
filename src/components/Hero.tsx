import { useRef } from "react";
import { gsap } from "gsap";
import introMusic from "../assets/music/intro.mp3";
import { Link } from "react-router-dom";

const Hero = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);

  const playIntro = () => {
    // MUSIC
    const audio = new Audio(introMusic);
    audio.volume = 0;

    audio.play().then(() => {
      let v = 0;
      const fade = setInterval(() => {
        if (v < 1) {
          v += 0.05;
          audio.volume = v;
        } else clearInterval(fade);
      }, 120);
    });

    // ANIMATIONS
    gsap.fromTo(
      heroRef.current,
      { filter: "brightness(90%) blur(2px)" },
      {
        filter: "brightness(110%) blur(0px)",
        duration: 1.2,
        ease: "power3.out",
      }
    );

    gsap.fromTo(
      textRef.current,
      { scale: 0.9, opacity: 0.8 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "back.out(1.7)",
      }
    );
  };

  return (
    <section
      ref={heroRef}   // ⭐ THIS WAS MISSING (IMPORTANT)
      className="relative flex items-center justify-center text-center py-44 sm:py-56 md:py-64"
      style={{
        backgroundImage: "url('/odisha-hero-new.jpg')",
   // ⭐ Correct path for Vercel
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div ref={textRef}>
        <h1 className="text-6xl md:text-7xl font-display font-bold mb-4 drop-shadow-lg">
          Discover Ancient Odisha
        </h1>

        <p className="text-lg md:text-2xl mb-10 drop-shadow-md max-w-2xl mx-auto">
          Experience the rich cultural heritage, hidden gems,
          and timeless traditions of India's best-kept secret.
        </p>

        {/* BUTTONS */}
        <div className="flex gap-4 justify-center">

          {/* ⭐ NEW BUTTON */}
          <button
            onClick={playIntro}
            className="px-6 py-3 rounded-lg bg-white/20 backdrop-blur-lg border border-white/30 text-white font-semibold hover:bg-white/30 transition-all shadow-lg"
          >
            Mo Odisha
          </button>

          {/* Existing Button */}
          <button className="px-6 py-3 rounded-lg bg-white text-black font-semibold shadow-lg hover:bg-gray-200 transition-all">
            <Link to="/places">View Destinations</Link>
          </button>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-5 animate-bounce opacity-80">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-2 h-2 bg-white rounded-full mt-2 animate-ping"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
