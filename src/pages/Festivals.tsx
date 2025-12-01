import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Calendar, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useSavedFestivals } from "@/hooks/useSavedItems";
import festivalImage from "@/assets/festival-ratha-yatra.jpg";

const Festivals = () => {
  const [festivals, setFestivals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { savedFestivals, toggleSave } = useSavedFestivals();

  useEffect(() => {
    fetchFestivals();
  }, []);

  const fetchFestivals = async () => {
    try {
      const { data, error } = await supabase
        .from('festivals')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setFestivals(data || []);
    } catch (error) {
      console.error('Error fetching festivals:', error);
    } finally {
      setLoading(false);
    }
  };

  // Default festivals if database is empty
  const defaultFestivals = [
    {
      id: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
      name: "Rath Yatra",
      description: "The world-famous chariot festival where Lord Jagannath, Balabhadra, and Subhadra are taken in grand processions on massive wooden chariots.",
      date_info: "June-July (Ashadha Shukla Dwitiya)",
      location: "Puri",
      details: "Millions of devotees gather to pull the sacred chariots. The festival symbolizes Lord Jagannath's annual visit to his aunt's home.",
      image_url: festivalImage
    },
    {
      id: 'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
      name: "Raja Parba",
      description: "A unique three-day festival celebrating womanhood and the Earth's menstruation cycle, marking the onset of monsoon.",
      date_info: "Mid-June",
      location: "Throughout Odisha",
      details: "Women and girls enjoy swing rides (doli), play traditional games, and wear new clothes. Agricultural activities are suspended.",
      image_url: festivalImage
    },
    {
      id: 'c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f',
      name: "Bali Yatra",
      description: "Commemorates Odisha's ancient maritime heritage when Sadhavas (traders) sailed to Bali, Java, and Southeast Asia for trade.",
      date_info: "October-November (Kartik Purnima)",
      location: "Cuttack",
      details: "Features boat rides, traditional crafts fair, and cultural performances. Celebrated near Mahanadi riverbank.",
      image_url: festivalImage
    },
    {
      id: 'd4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a',
      name: "Durga Puja",
      description: "Grand celebration of Goddess Durga's victory over evil, featuring elaborate pandals, cultural programs, and community feasts.",
      date_info: "September-October (Ashwin)",
      location: "Cuttack, Bhubaneswar",
      details: "Cuttack's silver filigree work adorns pandals. Traditional dhak drums and dhunuchi dance are highlights.",
      image_url: festivalImage
    },
    {
      id: 'e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b',
      name: "Konark Dance Festival",
      description: "Classical dance festival held against the backdrop of the magnificent Sun Temple, featuring India's finest dancers.",
      date_info: "December 1-5",
      location: "Konark",
      details: "Odissi, Bharatanatyam, Kathak, and other classical dance forms are performed in the open-air auditorium.",
      image_url: festivalImage
    },
    {
      id: 'f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f8a9b0c',
      name: "Nuakhai",
      description: "Agricultural festival celebrating the harvest of new rice, welcoming the new crop with joy and gratitude.",
      date_info: "August-September",
      location: "Western Odisha",
      details: "Families gather to consume newly harvested rice together. Traditional dishes and cultural performances mark the celebration.",
      image_url: festivalImage
    }
  ];

  const festivalImageMap: Record<string, string> = {
  "Rath Yatra": "https://uhevzopbtwjloeoiadnt.supabase.co/storage/v1/object/public/festivals/festival-ratha-yatra.jpg",
  "Raja Parba": "https://uhevzopbtwjloeoiadnt.supabase.co/storage/v1/object/public/festivals/raja-parba.jpg",
  "Bali Yatra": "https://uhevzopbtwjloeoiadnt.supabase.co/storage/v1/object/public/festivals/bali-yatra.jpg",
  "Durga Puja": "https://uhevzopbtwjloeoiadnt.supabase.co/storage/v1/object/public/festivals/durga-puja.jpg",
  "Konark Dance Festival": "https://uhevzopbtwjloeoiadnt.supabase.co/storage/v1/object/public/festivals/konark-dance-festival.jpg",
  "Nuakhai": "https://uhevzopbtwjloeoiadnt.supabase.co/storage/v1/object/public/festivals/nuakhai.jpg",
};


  const getFestivalImage = (festival: any) => {
    if (festival.image_url) return festival.image_url;
    return festivalImageMap[festival.name] || festivalImage;
  };

  const displayFestivals = festivals.length > 0 ? festivals : defaultFestivals;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-4">
              Odisha's Biggest Celebrations
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the vibrant festivals that showcase Odisha's rich cultural tapestry
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">Loading festivals...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayFestivals.map((festival) => (
                <Card key={festival.id} className="overflow-hidden hover:shadow-card transition-smooth animate-fade-in group">
                  <div className="aspect-video overflow-hidden relative">
                    <img 
                      src={getFestivalImage(festival)}
                      alt={festival.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background"
                      onClick={() => toggleSave(festival.id)}
                    >
                      <Heart 
                        className={`h-5 w-5 ${
                          savedFestivals.has(festival.id) 
                            ? 'fill-primary text-primary' 
                            : 'text-foreground'
                        }`}
                      />
                    </Button>
                  </div>
                  <CardContent className="p-6 space-y-3">
                    <h3 className="text-2xl font-display font-semibold text-foreground">
                      {festival.name}
                    </h3>
                    
                    <div className="flex items-center gap-2 text-sm text-primary">
                      <Calendar className="h-4 w-4" />
                      <span>{festival.date_info}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{festival.location}</span>
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {festival.description}
                    </p>
                    
                    {festival.details && (
                      <p className="text-sm text-muted-foreground border-t border-border pt-3 mt-3">
                        {festival.details}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center mt-12 animate-fade-in">
            <p className="text-muted-foreground">
              Click the heart icon to save your favorite festivals • Login to save
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Festivals;