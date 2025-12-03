import { useEffect } from "react";
import { gsap } from "gsap";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import konarkImg from "@/assets/places/konark-sun-temple.jpg";
import jagannathImg from "@/assets/places/jagannath-temple.jpg";
import chilikaImg from "@/assets/places/chilika-lake.jpg";
import cultureImg from "@/assets/culture-pattachitra.jpg";
import festivalImg from "@/assets/festival-ratha-yatra.jpg";
import foodImg from "@/assets/food-thali.jpg";

const heroImg = "/hero-odisha.jpg";

const Gallery = () => {
  useEffect(() => {
    gsap.fromTo(
      ".gallery-item",
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.2)",
      }
    );
  }, []);

  const gallery = [
    {
      image: heroImg,
      title: "Odisha's Grandeur",
      quote: "Where ancient temples meet endless horizons",
      author: "Travel Enthusiast"
    },
    {
      image: konarkImg,
      title: "Konark Sun Temple",
      quote: "The chariot of the sun god, frozen in stone",
      author: "Heritage Lover"
    },
    {
      image: jagannathImg,
      title: "Jagannath Temple",
      quote: "The abode of the Lord of the Universe",
      author: "Spiritual Seeker"
    },
    {
      image: chilikaImg,
      title: "Chilika Lake",
      quote: "Where sky kisses the earth through shimmering waters",
      author: "Nature Photographer"
    },
    {
      image: cultureImg,
      title: "Pattachitra Art",
      quote: "Stories painted with devotion and heritage",
      author: "Art Collector"
    },
    {
      image: festivalImg,
      title: "Rath Yatra",
      quote: "Millions of hearts united in devotion",
      author: "Festival Goer"
    },
    {
      image: foodImg,
      title: "Odishan Cuisine",
      quote: "Every bite tells a story of tradition",
      author: "Food Explorer"
    }
  ];

  const travelQuotes = [
    {
      quote: "Odisha isn't just a destination, it's a journey through time",
      author: "Rahul M."
    },
    {
      quote: "The warmth of Odishan hospitality stays with you forever",
      author: "Priya S."
    },
    {
      quote: "From temples to tribes, every experience is authentic",
      author: "Michael T."
    },
    {
      quote: "The beaches, the food, the culture - Odisha has it all",
      author: "Anjali K."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Your Travel Memories
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Capturing the essence of Odisha through stunning visuals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {gallery.map((item, idx) => (
              <Card key={idx} className="gallery-item overflow-hidden hover:shadow-premium transition-smooth group">
                <div className="aspect-square overflow-hidden relative">
                  <img 
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-smooth flex flex-col justify-end p-6">
                    <h3 className="text-white font-display font-bold text-xl mb-2">
                      {item.title}
                    </h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <blockquote className="italic text-muted-foreground border-l-4 border-primary pl-4 mb-2">
                    "{item.quote}"
                  </blockquote>
                  <p className="text-sm text-foreground font-medium">- {item.author}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            <h2 className="text-3xl font-display font-bold text-center mb-8">
              What Travelers Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {travelQuotes.map((item, idx) => (
                <Card key={idx} className="hover:shadow-card transition-smooth">
                  <CardContent className="p-6">
                    <blockquote className="italic text-lg text-muted-foreground mb-3">
                      "{item.quote}"
                    </blockquote>
                    <p className="text-primary font-semibold">- {item.author}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="bg-gradient-subtle rounded-lg p-8 mt-12 text-center animate-fade-in">
            <h3 className="text-2xl font-display font-bold mb-3">Share Your Journey</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have you explored Odisha? We'd love to feature your travel stories and photographs. 
              Contact us to share your experiences with fellow travelers.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Gallery;