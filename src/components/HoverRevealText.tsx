import { useRef } from "react";
import { gsap } from "gsap";

interface HoverRevealTextProps {
  text: string;
  className?: string;
  faintColor?: string;
  revealColor?: string;
  style?: React.CSSProperties;
}

const HoverRevealText = ({ 
  text, 
  className = "",
  faintColor = "#F1F1F1",
  revealColor = "#F4C430",
  style
}: HoverRevealTextProps) => {
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);

  const handleLetterEnter = (index: number) => {
    gsap.to(lettersRef.current[index], {
      color: revealColor,
      scale: 1.15,
      textShadow: `0 0 20px ${revealColor}40`,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleLetterLeave = (index: number) => {
    gsap.to(lettersRef.current[index], {
      color: faintColor,
      scale: 1,
      textShadow: "0 0 0px transparent",
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleLetterClick = (index: number) => {
    // For mobile: toggle reveal
    const currentColor = window.getComputedStyle(lettersRef.current[index]!).color;
    const isFaint = currentColor === "rgb(241, 241, 241)" || currentColor === faintColor;
    
    if (isFaint) {
      handleLetterEnter(index);
    } else {
      handleLetterLeave(index);
    }
  };

  return (
    <h1 className={`inline-block ${className}`} style={style}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          ref={(el) => (lettersRef.current[index] = el)}
          onMouseEnter={() => handleLetterEnter(index)}
          onMouseLeave={() => handleLetterLeave(index)}
          onClick={() => handleLetterClick(index)}
          className="inline-block cursor-pointer transition-all"
          style={{
            color: faintColor,
            userSelect: "none",
            WebkitUserSelect: "none",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </h1>
  );
};

export default HoverRevealText;
