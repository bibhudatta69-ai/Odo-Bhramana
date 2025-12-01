import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import odissiImage from "@/assets/culture/odissi-dance.jpg";
import pattrachitraImage from "@/assets/culture/pattachitra-new.jpg";
import kalingaImage from "@/assets/culture/kalinga-architecture.jpg";
import sambalpuriImage from "@/assets/culture/sambalpuri-art.jpg";

gsap.registerPlugin(ScrollTrigger);

const Culture = () => {
  useEffect(() => {
    gsap.fromTo(
      ".culture-card",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".culture-grid",
          start: "top 80%",
        },
      }
    );
  }, []);

  const cultures = [
    {
      title: "Odissi Dance",
      description: "One of India's eight classical dance forms, Odissi originated in the temples of Odisha. Known for its grace, fluidity, and sculptural poses (tribhanga), it tells stories through expressive movements and intricate footwork.",
      image: odissiImage,
      details: [
        "Originated in 2nd century BCE",
        "Features tribhanga (three-bend) posture",
        "Combines tandava (vigorous) and lasya (graceful) movements",
        "Recognized as classical dance by Sangeet Natak Akademi"
      ]
    },
    {
      title: "Pattachitra Art",
      description: "Traditional cloth-based scroll painting of Odisha, Pattachitra is known for its intricate details, mythological narratives, and vibrant colors. Artists use natural dyes and depict stories from Hindu epics.",
      image: pattrachitraImage,
      details: [
        "Dates back to 5th century BCE",
        "Uses natural colors from stones and vegetables",
        "Features Lord Jagannath and Hindu mythology",
        "UNESCO Intangible Cultural Heritage"
      ]
    },
    {
      title: "Kalinga Architecture",
      description: "The distinctive temple architecture of Odisha features towering spires (rekha deul), intricate stone carvings, and perfect geometric proportions. Famous examples include Konark and Lingaraj temples.",
      image: kalingaImage,
      details: [
        "Characterized by curvilinear shikhara towers",
        "Features intricate erotic sculptures at Konark",
        "Built using sandstone and laterite",
        "Represents peak of ancient Indian architecture"
      ]
    },
    {
      title: "Sambalpuri Textiles",
      description: "Handwoven ikat textiles from western Odisha, Sambalpuri sarees and fabrics are famous for their unique tie-dye technique, traditional motifs, and vibrant geometric patterns that tell stories of local culture.",
      image: sambalpuriImage,
      details: [
        "Features bandha (tie-dye) technique",
        "Includes traditional motifs like shankha, chakra, phula",
        "Uses pure silk or cotton",
        "Geographical Indication (GI) tag holder"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Odisha's Cultural Heritage
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the rich artistic traditions that have flourished in Odisha for millennia
            </p>
          </div>

          <div className="culture-grid grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {cultures.map((culture, idx) => (
              <Card key={idx} className="culture-card overflow-hidden hover:shadow-premium transition-smooth">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={culture.image} 
                    alt={culture.title}
                    className="w-full h-full object-cover hover:scale-105 transition-smooth"
                  />
                </div>
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-3xl font-display font-bold text-primary">{culture.title}</h2>
                  <p className="text-muted-foreground leading-relaxed">{culture.description}</p>
                  
                  <div className="border-t border-border pt-4">
                    <h3 className="font-semibold mb-3 text-foreground">Key Features:</h3>
                    <ul className="space-y-2">
                      {culture.details.map((detail, detailIdx) => (
                        <li key={detailIdx} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span className="text-sm text-muted-foreground">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center bg-accent/50 rounded-lg p-8 animate-fade-in">
            <h3 className="text-2xl font-display font-bold mb-3">Experience Odisha's Living Heritage</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These art forms continue to thrive today, passed down through generations of dedicated artists and performers who keep Odisha's cultural flame burning bright.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Culture;