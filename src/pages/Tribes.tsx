import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import kondhImg from "@/assets/tribes/kondh.jpg";
import sauraImg from "@/assets/tribes/saura.jpg";
import santaliImg from "@/assets/tribes/santali.jpg";

gsap.registerPlugin(ScrollTrigger);

const Tribes = () => {
  useEffect(() => {
    gsap.fromTo(
      ".tribe-card",
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.3,
        scrollTrigger: {
          trigger: ".tribes-container",
          start: "top 80%",
        },
      }
    );
  }, []);

  const tribes = [
    {
      name: "Kondh Tribe",
      image: kondhImg,
      overview: "The Kondh (also spelled Kandha) are one of the largest tribal groups in Odisha, known for their rich cultural heritage and traditional practices. They primarily inhabit the hilly regions of southern and central Odisha.",
      regions: "Kandhamal, Kalahandi, Koraput, Rayagada, Gajapati, Nayagarh",
      belt: "Eastern Ghats region, particularly in the districts mentioned above. They live in remote hill tracts at elevations of 3,000-4,000 feet.",
      communities: "Dongria Kondh, Kutia Kondh, Desia Kondh - Each sub-group has distinct cultural practices",
      responsibleTravel: [
        "Seek permission before photographing tribal members",
        "Respect sacred groves (Niyamraja) which are central to their beliefs",
        "Do not litter in tribal areas",
        "Support local artisans by purchasing authentic handicrafts",
        "Hire local tribal guides for authentic experiences"
      ],
      traditions: [
        "Celebrate Meriah festival with traditional dances",
        "Practice shifting cultivation (Podu Chasa)",
        "Known for intricate bead jewelry and brass ornaments",
        "Dongria Kondh worship Niyam Raja (mountain deity)"
      ]
    },
    {
      name: "Saura Tribe",
      image: sauraImg,
      overview: "The Saura (Savara) tribe is known for their unique pictographic art called 'Saura paintings' or 'Idital'. These wall paintings depict their daily life, rituals, and relationship with nature using simple geometric patterns.",
      regions: "Gajapati, Ganjam, Rayagada, Koraput districts",
      belt: "Concentrated in the hilly terrains bordering Andhra Pradesh, particularly around Parlakimidi and Gunupur areas.",
      communities: "Lanjia Saura, Jara Saura, Sudha Saura, Kumbi Saura - Distinguished by their traditional occupations",
      responsibleTravel: [
        "Visit during weekly markets (haats) for cultural immersion",
        "Commission Saura paintings directly from artists",
        "Respect their animistic beliefs and sacred spaces",
        "Do not disturb religious ceremonies without invitation",
        "Stay in community-run homestays when available"
      ],
      traditions: [
        "Create Idital paintings during festivals and life events",
        "Practice ancestor worship (Labya cult)",
        "Known for terracotta pottery",
        "Traditional healers (Disari) play important social roles"
      ]
    },
    {
      name: "Santali Tribe",
      image: santaliImg,
      overview: "The Santals are one of India's largest tribal communities with a vibrant cultural identity. They have their own language (Santali), script (Ol Chiki), and rich traditions of music, dance, and literature.",
      regions: "Mayurbhanj, Balasore, Keonjhar, Sundargarh districts",
      belt: "Northern Odisha, particularly in Mayurbhanj district which has the highest Santal population. They also inhabit areas of Jharkhand, West Bengal, and Assam.",
      communities: "United community with strong social bonds through village councils (Manjhi system)",
      responsibleTravel: [
        "Experience Santal villages during Sarhul or Baha festivals",
        "Learn about their sustainable rice cultivation practices",
        "Respect their Jaher Than (sacred groves)",
        "Support Santal musicians and artists",
        "Participate in community meals (with permission)"
      ],
      traditions: [
        "Celebrate Sarhul (spring festival) and Karam (harvest)",
        "Famous for traditional Santal dance accompanied by Tamak, Tumdak drums",
        "Practice sustainable agriculture and forest conservation",
        "Have rich oral literature including Baha tales",
        "Traditional archery and hunting skills"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-4">
              🏹 The Heartbeat of Odisha: Tribal Heritage
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the indigenous communities who have preserved Odisha's oldest traditions for millennia
            </p>
          </div>

          <div className="tribes-container space-y-12">
            {tribes.map((tribe, idx) => (
              <Card key={idx} className="tribe-card overflow-hidden hover:shadow-premium transition-smooth">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="aspect-video md:aspect-auto overflow-hidden">
                    <img 
                      src={tribe.image}
                      alt={tribe.name}
                      className="w-full h-full object-cover hover:scale-105 transition-smooth"
                    />
                  </div>
                  
                  <CardContent className="p-6 space-y-4">
                    <h2 className="text-3xl font-display font-bold text-primary">{tribe.name}</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Overview</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{tribe.overview}</p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Regions</h3>
                        <p className="text-sm text-muted-foreground">{tribe.regions}</p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Tribal Belt (Indicative)</h3>
                        <p className="text-sm text-muted-foreground">{tribe.belt}</p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Communities</h3>
                        <p className="text-sm text-muted-foreground">{tribe.communities}</p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Cultural Traditions</h3>
                        <ul className="space-y-1">
                          {tribe.traditions.map((tradition, tidx) => (
                            <li key={tidx} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="text-primary mt-1">•</span>
                              <span>{tradition}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="border-t border-border pt-4">
                        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <span className="text-primary">⚠️</span>
                          Responsible Travel Guidelines
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {tribe.responsibleTravel.map((guideline, gidx) => (
                            <Badge key={gidx} variant="secondary" className="text-xs">
                              {guideline}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>

          <div className="bg-accent/50 rounded-lg p-8 mt-12 text-center animate-fade-in">
            <h3 className="text-2xl font-display font-bold mb-3">Preserving Ancient Wisdom</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Odisha's 62 tribal communities represent 22.8% of the state's population. They are the guardians of ecological knowledge, traditional arts, and sustainable living practices that the modern world is now rediscovering.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Tribes;