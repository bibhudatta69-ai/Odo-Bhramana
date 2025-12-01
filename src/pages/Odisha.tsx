import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Users, Utensils, Calendar, Palette, Mountain } from "lucide-react";
import heroImage from "@/assets/home-hero.jpg";
import culturePattachitra from "@/assets/culture-pattachitra.jpg";
import foodThali from "@/assets/food-thali.jpg";
import festivalRathaYatra from "@/assets/festival-ratha-yatra.jpg";

import odishaMusic from "../assets/music/odisha.mp3";

const Odisha = () => {

  // ⭐ PLAY MUSIC WHEN ODISHA PAGE OPENS
  useEffect(() => {
    const audio = new Audio(odishaMusic);
    audio.volume = 0;

    const allowPlay = () => {
      audio.play().then(() => {
        let v = 0;
        const fade = setInterval(() => {
          if (v < 1) {
            v += 0.05;
            audio.volume = v;
          } else clearInterval(fade);
        }, 120);
      }).catch(() => {});
    };

    window.addEventListener("click", allowPlay, { once: true });
    window.addEventListener("touchstart", allowPlay, { once: true });

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);


  // ⭐ YOUR ORIGINAL HIGHLIGHTS + CONTENT

  const highlights = [
    {
      icon: MapPin,
      title: "30 Unique Districts",
      description: "Each with its own charm, history, and cultural identity"
    },
    {
      icon: Mountain,
      title: "Diverse Landscapes",
      description: "From pristine beaches to lush forests and ancient temples"
    },
    {
      icon: Users,
      title: "62+ Tribal Communities",
      description: "Rich indigenous heritage and living traditions"
    },
    {
      icon: Utensils,
      title: "Sacred Cuisine",
      description: "World-famous temple food and unique culinary traditions"
    },
    {
      icon: Calendar,
      title: "Vibrant Festivals",
      description: "Year-round celebrations of culture and spirituality"
    },
    {
      icon: Palette,
      title: "Ancient Arts",
      description: "Classical dance, traditional crafts, and architectural marvels"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 pb-20">

        {/* HERO SECTION */}
        <div className="relative h-[60vh] mb-20 overflow-hidden">
          <img src={heroImage} alt="Odisha Landscape" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />

          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="container mx-auto">
              <h1 className="text-5xl md:text-7xl font-display font-bold mb-4 animate-fade-in-up">
                Odisha
              </h1>
              <p className="text-xl md:text-2xl font-light max-w-3xl animate-fade-in">
                Where ancient traditions meet natural splendor - discover India's soul state
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6">

          {/* INTRODUCTION */}
          <div className="max-w-4xl mx-auto mb-20">
            <h2 className="text-4xl font-display font-bold mb-6 text-center">
              The Land of Lord Jagannath
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Odisha, formerly known as Orissa, is a state on India's eastern coast that offers an 
              enchanting blend of spiritual heritage, tribal culture, pristine beaches, and architectural 
              wonders...
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              From the majestic Sun Temple of Konark to Chilika Lake and tribal villages of Koraput...
            </p>
          </div>

          {/* KEY HIGHLIGHTS */}
          <div className="mb-20">
            <h2 className="text-4xl font-display font-bold mb-12 text-center">
              Why Odisha is Extraordinary
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {highlights.map((item, idx) => (
                <Card key={idx} className="border-border hover:shadow-card transition-smooth">
                  <CardContent className="pt-6">
                    <item.icon className="h-10 w-10 text-primary mb-4" />
                    <h3 className="text-xl font-display font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* VISUAL SECTIONS */}
          <div className="space-y-20">

            {/* CULTURE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <h3 className="text-3xl font-display font-bold mb-4">Living Cultural Heritage</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Odisha is the birthplace of Odissi classical dance...
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  With magnificent temples at Bhubaneswar, Puri, and Konark…
                </p>
              </div>
              <div className="order-1 md:order-2">
                <img src={culturePattachitra} alt="Pattachitra Art" className="rounded-xl shadow-card w-full h-auto" />
              </div>
            </div>

            {/* FOOD */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <img src={foodThali} alt="Odisha Cuisine" className="rounded-xl shadow-card w-full h-auto" />
              </div>
              <div>
                <h3 className="text-3xl font-display font-bold mb-4">A Culinary Odyssey</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Odia cuisine is unique in its minimal use of spices...
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Pakhala, Chhena Poda, and the famous Mahaprasad...
                </p>
              </div>
            </div>

            {/* FESTIVALS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <h3 className="text-3xl font-display font-bold mb-4">Festivals that Define a Culture</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  The world-famous Rath Yatra of Puri...
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Raja Festival, Bali Yatra, and countless tribal celebrations...
                </p>
              </div>
              <div className="order-1 md:order-2">
                <img src={festivalRathaYatra} alt="Rath Yatra Festival" className="rounded-xl shadow-card w-full h-auto" />
              </div>
            </div>
          </div>

          {/* HIDDEN FACTS */}
          <div className="mt-20">
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardContent className="pt-8">
                <h3 className="text-3xl font-display font-bold mb-6 text-center">
                  Hidden Facts About Odisha
                </h3>
                <ul className="space-y-4 text-muted-foreground">
                  <li className="flex gap-3"><span className="text-primary font-bold">•</span><span>Odisha was once a powerful maritime kingdom...</span></li>
                  <li className="flex gap-3"><span className="text-primary font-bold">•</span><span>Chilika Lake is Asia's largest brackish water lagoon...</span></li>
                  <li className="flex gap-3"><span className="text-primary font-bold">•</span><span>Olive Ridley turtles nest on Odisha’s beaches...</span></li>
                  <li className="flex gap-3"><span className="text-primary font-bold">•</span><span>Odissi dance was rebuilt from temple sculptures...</span></li>
                  <li className="flex gap-3"><span className="text-primary font-bold">•</span><span>The Konark Sun Temple was designed as a massive stone chariot...</span></li>
                </ul>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>

      {/* ULTRA PREMIUM ODIA BARNAMALA SECTION */}
      <section className="py-16 mt-10">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-xs md:text-sm uppercase tracking-[0.35em] text-muted-foreground mb-4">
              Odia Barnamala
            </p>
            <h2 className="odia-gold-ultra text-[34px] md:text-[52px] font-extrabold leading-relaxed inline-block">
              ଅ ଆ ଇ ଈ ଉ ଊ ଋ ୠ ଏ ଐ ଓ ଔ <br />
              କ ଖ ଗ ଘ ଙ ଚ ଛ ଜ ଝ ଞ ଟ<br />
              ଠ ଡ ଢ ଣ ତ ଥ ଦ ଧ ନ ପ ଫ ବ <br />
              ଭ ମ ଯ ୟ ର ଲ ଳ ୱ ଶ ଷ ସ ହ କ୍ଷ ଜ୍ଞ 
            </h2>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Odisha;
