import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useSavedPlaces } from "@/hooks/useSavedItems";
import konarkImg from "@/assets/places/konark-sun-temple.jpg";
import jagannathImg from "@/assets/places/jagannath-temple.jpg";
import chilikaImg from "@/assets/places/chilika-lake.jpg";
import lingarajImg from "@/assets/places/lingaraj-temple.jpg";
import similipalImg from "@/assets/places/similipal-park.jpg";
import dhauliImg from "@/assets/places/dhauli-peace-pagoda.jpg";

const Places = () => {
  const [places, setPlaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { savedPlaces, toggleSave } = useSavedPlaces();

  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = async () => {
    try {
      const { data, error } = await supabase
        .from('places')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setPlaces(data || []);
    } catch (error) {
      console.error('Error fetching places:', error);
    } finally {
      setLoading(false);
    }
  };

  const defaultPlaces = [
    {
      id: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
      name: "Konark Sun Temple",
      location: "Konark",
      description: "UNESCO World Heritage Site, architectural marvel shaped as a massive chariot",
      image_url: konarkImg
    },
    {
      id: 'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
      name: "Jagannath Temple",
      location: "Puri",
      description: "One of the four sacred Char Dham pilgrimage sites for Hindus",
      image_url: jagannathImg
    },
    {
      id: 'c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f',
      name: "Chilika Lake",
      location: "Khurda & Ganjam",
      description: "Asia's largest brackish water lagoon, paradise for bird watchers",
      image_url: chilikaImg
    },
    {
      id: 'd4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a',
      name: "Lingaraj Temple",
      location: "Bhubaneswar",
      description: "11th-century temple dedicated to Lord Shiva, finest example of Kalinga architecture",
      image_url: lingarajImg
    },
    {
      id: 'e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b',
      name: "Similipal National Park",
      location: "Mayurbhanj",
      description: "Tiger reserve with stunning waterfalls and diverse wildlife",
      image_url: similipalImg
    },
    {
      id: 'f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f8a9b0c',
      name: "Dhauli Peace Pagoda",
      location: "Bhubaneswar",
      description: "Historic site of the Kalinga War, now a symbol of peace",
      image_url: dhauliImg
    },
  ];

  const placeImageMap: Record<string, string> = {
    "Konark Sun Temple": konarkImg,
    "Jagannath Temple": jagannathImg,
    "Chilika Lake": chilikaImg,
    "Lingaraj Temple": lingarajImg,
    "Similipal National Park": similipalImg,
    "Dhauli Peace Pagoda": dhauliImg,
  };

  const getPlaceImage = (place: any) => {
    if (place.image_url) return place.image_url;
    return placeImageMap[place.name] || konarkImg;
  };

  const displayPlaces = places.length > 0 ? places : defaultPlaces;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-4">
              Discover Places
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore Odisha's iconic temples, pristine beaches, wildlife sanctuaries, and hidden gems
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">Loading places...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayPlaces.map((place) => (
                <Card key={place.id} className="overflow-hidden hover:shadow-card transition-smooth animate-fade-in group">
                  <div className="aspect-video overflow-hidden relative">
                    <img 
                      src={getPlaceImage(place)}
                      alt={place.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background"
                      onClick={() => toggleSave(place.id)}
                    >
                      <Heart 
                        className={`h-5 w-5 ${
                          savedPlaces.has(place.id) 
                            ? 'fill-primary text-primary' 
                            : 'text-foreground'
                        }`}
                      />
                    </Button>
                  </div>
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-sm text-primary mb-2">
                      <MapPin className="h-4 w-4" />
                      <span>{place.location}</span>
                    </div>
                    <h3 className="text-2xl font-display font-semibold text-foreground">
                      {place.name}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {place.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Click the heart icon to save places to your favorites • Login to save
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Places;
