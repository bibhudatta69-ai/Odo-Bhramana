import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Globe, Award } from "lucide-react";
import HoverRevealText from "@/components/HoverRevealText";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      if (!container) return;

      // Scroll-based full reveal
      ScrollTrigger.create({
        trigger: container,
        start: "top 80%",
        end: "top 30%",
        scrub: 1,
        onEnter: () => {
          gsap.to(container.querySelectorAll("span"), {
            color: "#F4C430",
            textShadow: "0 0 20px rgba(244, 196, 48, 0.4)",
            duration: 1.2,
            stagger: 0.03,
            ease: "power2.out",
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Stylish Hidden Hero Text with Letter Hover */}
          <div 
            ref={containerRef}
            className="min-h-[40vh] flex items-center justify-center mb-16"
          >
            <HoverRevealText
              text="Odo Bhraman"
              className="text-7xl md:text-9xl text-center leading-tight"
              faintColor="#F1F1F1"
              revealColor="#F4C430"
              style={{ fontFamily: "'Playfair Display', serif" }}
            />
          </div>

          {/* Subtitle */}
          <div className="text-center mb-16 animate-fade-in">
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Your modern guide to exploring the ancient wonders and hidden treasures of Odisha
            </p>
          </div>

          {/* Mission Statement */}
          <div className="max-w-4xl mx-auto mb-20">
            <Card className="border-border shadow-card">
              <CardContent className="pt-8 text-center">
                <h2 className="text-3xl font-display font-bold mb-4">Our Mission</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Odo Bhraman is dedicated to showcasing the rich cultural heritage, 
                  breathtaking landscapes, authentic cuisine, and vibrant traditions of Odisha. 
                  We connect travelers with local experiences, hidden gems, and meaningful cultural 
                  exchanges through our unique couchsurfing platform.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {[
              {
                icon: Heart,
                title: "Authentic Experiences",
                description: "We promote genuine cultural connections and authentic local experiences"
              },
              {
                icon: Users,
                title: "Community First",
                description: "Supporting local communities and fostering meaningful connections"
              },
              {
                icon: Globe,
                title: "Sustainable Tourism",
                description: "Encouraging responsible travel that respects culture and environment"
              },
              {
                icon: Award,
                title: "Quality Assured",
                description: "Curated content and verified hosts for your peace of mind"
              }
            ].map((value, idx) => (
              <Card key={idx} className="border-border hover:shadow-card transition-smooth">
                <CardContent className="pt-6 text-center">
                  <value.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-display font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* What We Offer */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-display font-bold text-center mb-12">
              What We Offer
            </h2>
            <div className="space-y-6">
              {[
                {
                  title: "Curated Travel Guides",
                  description: "Comprehensive information about Odisha's 30 districts, famous places, festivals, food, and culture"
                },
                {
                  title: "Couchsurfing Network",
                  description: "Connect with verified local hosts who open their homes and share authentic Odia hospitality"
                },
                {
                  title: "Cultural Deep Dives",
                  description: "Explore tribal heritage, traditional arts, classical dance forms, and ancient architecture"
                },
                {
                  title: "Festival Calendar",
                  description: "Never miss a celebration with our comprehensive guide to Odisha's vibrant festivals"
                },
                {
                  title: "Culinary Journey",
                  description: "Discover authentic Odia cuisine, from temple food to street delicacies"
                },
                {
                  title: "Personalized Experiences",
                  description: "Save your favorite places, create itineraries, and connect with like-minded travelers"
                }
              ].map((item, idx) => (
                <Card key={idx} className="border-border">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-display font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
