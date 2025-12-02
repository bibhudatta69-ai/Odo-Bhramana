import { useEffect, useRef, useState } from "react";
import introMusic from "../assets/music/intro.mp3";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Heart, MapPin, Calendar, Utensils, Users } from "lucide-react";
import odissiImage from "@/assets/culture/odissi-dance.jpg";
import pattachitraImage from "@/assets/culture/pattachitra-new.jpg";
import kalingaImage from "@/assets/culture/kalinga-architecture.jpg";
import sambalpuriImage from "@/assets/culture/sambalpuri-art.jpg";

import foodThali from "@/assets/food-thali.jpg";
import TestimonialCard from "@/components/TestimonialCard";
import FAQSection from "@/components/FAQSection";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  // ⭐ INTRO MUSIC – PLAY ONLY ONCE IN LIFETIME
  useEffect(() => {
    const introPlayed = localStorage.getItem("introPlayed");
    const audio = new Audio(introMusic);
    audio.volume = 0;

    if (!introPlayed) {
      const allowPlay = () => {
        audio.play().then(() => {
          let v = 0;
          const fade = setInterval(() => {
            if (v < 1) {
              v += 0.05;
              audio.volume = v;
            } else {
              clearInterval(fade);
            }
          }, 150);
        });

        localStorage.setItem("introPlayed", "true");

        document.removeEventListener("click", allowPlay);
        document.removeEventListener("touchstart", allowPlay);
      };

      document.addEventListener("click", allowPlay, { once: true });
      document.addEventListener("touchstart", allowPlay, { once: true });
    }
  }, []);

  // GSAP ANIMATIONS (unchanged)
  useEffect(() => {
    sectionsRef.current.forEach((section, index) => {
      
      // Skip the Hero section (avoid hiding background image)
if (section?.id === "hero-section") return;

      if (section) {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse",
            scrub: 1,
          },
          y: 80,
          opacity: 0,
          scale: 0.95,
          rotationX: -5,
          duration: 1,
          delay: index * 0.08,
          ease: "power3.out",
        });

        const content = section.querySelector(
          ".container, .max-w-6xl, .max-w-5xl, .max-w-4xl"
        );
        if (content) {
          gsap.to(content, {
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 2,
            },
            y: -30,
            ease: "none",
          });
        }
      }
    });
  }, []);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  // ------------ ALL YOUR ORIGINAL DATA BELOW -------------
  const culturalItems = [
    {
      name: "Odissi Dance",
      description: "Classical dance form",
      image: odissiImage,
    },
    {
      name: "Pattachitra Art",
      description: "Traditional cloth painting",
      image: pattachitraImage,
    },
    {
      name: "Kalinga Architecture",
      description: "Ancient temple design",
      image: kalingaImage,
    },
    {
      name: "Sambalpuri Art",
      description: "Handloom textiles",
      image: sambalpuriImage,
    },
  ];

  const festivals = [
    {
      name: "Ratha Yatra",
      description: "Chariot festival of Lord Jagannath",
      image:
        "https://uhevzopbtwjloeoiadnt.supabase.co/storage/v1/object/public/festivals/festival-ratha-yatra.jpg",
    },
    {
      name: "Raja Parba",
      description: "Celebration of womanhood",
      image:
        "https://uhevzopbtwjloeoiadnt.supabase.co/storage/v1/object/public/festivals/raja-parba.jpg",
    },
    {
      name: "Bali Yatra",
      description: "Maritime heritage festival",
      image:
        "https://uhevzopbtwjloeoiadnt.supabase.co/storage/v1/object/public/festivals/bali-yatra.jpg",
    },
  ];

  const foods = [
    { name: "Abadha", description: "Sacred temple food" },
    { name: "Pakhala", description: "Fermented rice dish" },
    { name: "Chhena Poda", description: "Baked cheese dessert" },
    { name: "Rasagola", description: "Sweet cottage cheese balls" },
    { name: "Dalma", description: "Lentil and vegetable curry" },
    { name: "Dahibara Aloodum", description: "Vadas soaked in yogurt with spicy potato curry" },
  ];

  const reviews = [
    {
      name: "Priya Sharma",
      district: "Puri",
      rating: 5,
      text: "An incredible journey through Odisha's hidden gems...",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    },
    {
      name: "Rajesh Kumar",
      district: "Cuttack",
      rating: 5,
      text: "Perfect guide for exploring authentic Odisha...",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh",
    },
    {
      name: "Anita Das",
      district: "Bhubaneswar",
      rating: 5,
      text: "The stay options and warm local hosts made our trip unforgettable...",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anita",
    },
    {
      name: "Vikram Patel",
      district: "Jajpur",
      rating: 5,
      text: "Excellent platform for exploring Odisha deeply...",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram",
    },
    {
      name: "Meera Singh",
      district: "Konark",
      rating: 5,
      text: "Found the best food spots and cultural festivals...",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Meera",
    },
    {
      name: "Arun Mohanty",
      district: "Balasore",
      rating: 5,
      text: "Staying with locals gave us unforgettable insights...",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arun",
    },
  ];

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      <div className="min-h-screen">

        <Navigation />
        <Hero />

        {/* -------- YOUR FULL ORIGINAL HOMEPAGE BELOW -------- */}
        {/* Why Choose Odo Bhraman */}
        <section ref={addToRefs} className="container mx-auto px-4 sm:px-6 py-20">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-4">
            Why Choose Odo Bhraman?
          </h2>
          <p className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
            Your trusted companion for authentic Odisha experiences
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Heart, title: "Curated Experiences", desc: "Handpicked destinations and authentic local connections" },
              { icon: MapPin, title: "Hidden Treasures", desc: "Discover places untouched by mass tourism" },
              { icon: Users, title: "Community Connect", desc: "Stay with locals through our couchsurfing network" },
            ].map((item, idx) => (
              <Card key={idx} className="border-border hover:shadow-card transition-smooth">
                <CardContent className="pt-6 text-center">
                  <item.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-display font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Cultural Heritage */}
        <section ref={addToRefs} className="bg-muted/30 py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-4">
              Odisha's Cultural Heritage
            </h2>
            <p className="text-center text-muted-foreground text-lg mb-12">
              Timeless traditions and artistic excellence
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {culturalItems.map((item, idx) => (
                <Link key={idx} to="/culture" className="group">
                  <Card className="overflow-hidden border-border hover:shadow-card transition-smooth">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                      />
                    </div>
                    <CardContent className="pt-4">
                      <h3 className="font-display font-semibold text-lg mb-1">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* MUST SEE PLACES */}
        <section ref={addToRefs} className="container mx-auto px-4 sm:px-6 py-20">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-4">
            Explore Must-See Places
          </h2>
          <p className="text-center text-muted-foreground text-lg mb-12">
            Iconic destinations that define Odisha
          </p>

          <div className="text-center">
            <Button asChild size="lg" className="shadow-premium">
              <Link to="/places">
                <MapPin className="mr-2 h-5 w-5" />
                Discover All Places
              </Link>
            </Button>
          </div>
        </section>

        {/* FESTIVALS */}
        <section ref={addToRefs} className="bg-muted/30 py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-4">
              Odisha's Biggest Celebrations
            </h2>
            <p className="text-center text-muted-foreground text-lg mb-12">
              Vibrant festivals that bring the state alive
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {festivals.map((festival, idx) => (
                <Card key={idx} className="overflow-hidden border-border hover:shadow-card transition-smooth">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={festival.image}
                      alt={festival.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="pt-4">
                    <h3 className="font-display font-semibold text-lg mb-1">{festival.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {festival.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button asChild variant="outline" size="lg">
                <Link to="/festivals">
                  <Calendar className="mr-2 h-5 w-5" />
                  See More Festivals
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ROYAL FOOD */}
        <section ref={addToRefs} className="container mx-auto px-4 sm:px-6 py-20">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-4">
            The Royal Platter: Culinary History
          </h2>
          <p className="text-center text-muted-foreground text-lg mb-12">
            A gastronomic journey through Odisha's flavors
          </p>

          <div className="max-w-4xl mx-auto">
            <div className="aspect-video overflow-hidden rounded-xl mb-8 shadow-card">
              <img
                src={foodThali}
                alt="Odisha Traditional Food"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {foods.map((food, idx) => (
                <Card key={idx} className="border-border hover:shadow-card transition-smooth">
                  <CardContent className="pt-4">
                    <h3 className="font-display font-semibold mb-1">{food.name}</h3>
                    <p className="text-sm text-muted-foreground">{food.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button asChild variant="outline" size="lg">
                <Link to="/food">
                  <Utensils className="mr-2 h-5 w-5" />
                  Savor More
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section ref={addToRefs} className="bg-muted/30 py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                What Travelers Say
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Real experiences from travelers who discovered Odisha with Odo Bhraman
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {reviews.map((review, idx) => (
                <TestimonialCard key={idx} {...review} />
              ))}
            </div>
          </div>
        </section>

        <FAQSection />

        <Footer />
      </div>
    </>
  );
};

export default Home;
