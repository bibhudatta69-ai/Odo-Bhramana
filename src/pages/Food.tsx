import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useSavedFoods } from "@/hooks/useSavedItems";

import abadhaImg from "@/assets/foods/abadha.jpg";
import pakhalaImg from "@/assets/foods/pakhala.jpg";
import chhenapodaImg from "@/assets/foods/chhenapoda.jpg";
import rasagolaImg from "@/assets/foods/rasagola.jpg";
import dalmaImg from "@/assets/foods/dalma.jpg";

// ⭐ Dahibara Aloodum (From Supabase)
const dahibaraUrl =
  "https://uhevzopbtwjloeoiadnt.supabase.co/storage/v1/object/public/foods/dahibara-aloodum.jpg";

const Food = () => {
  const [foods, setFoods] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { savedFoods, toggleSave } = useSavedFoods();

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const { data, error } = await supabase
        .from("foods")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setFoods(data || []);
    } catch (error) {
      console.error("Error fetching foods:", error);
    } finally {
      setLoading(false);
    }
  };

  const defaultFoods = [
    {
      id: "food-1",
      name: "Mahaprasad (Abadha)",
      description:
        "Sacred food offered at Jagannath Temple. Traditional dishes cooked in earthen pots.",
      image: abadhaImg,
    },
    {
      id: "food-2",
      name: "Pakhala Bhata",
      description:
        "Fermented rice soaked in water, served with fried accompaniments.",
      image: pakhalaImg,
    },
    {
      id: "food-3",
      name: "Chhena Poda",
      description: "Odisha's signature dessert made from baked cottage cheese.",
      image: chhenapodaImg,
    },
    {
      id: "food-4",
      name: "Rasagola",
      description:
        "Soft, spongy cheese balls soaked in light sugar syrup—origin in Odisha.",
      image: rasagolaImg,
    },
    {
      id: "food-5",
      name: "Dalma",
      description:
        "Lentil curry cooked with vegetables, a staple in Odia households.",
      image: dalmaImg,
    },
    {
      id: "food-6",
      name: "Dahibara aloodum", // ⭐ Must match Supabase EXACT NAME
      description:
        "Cuttack’s legendary dish – soft dahi-soaked vadas with spicy aloo dum.",
      image: dahibaraUrl,
    },
  ];

  const foodImageMap: Record<string, string> = {
    "Mahaprasad (Abadha)": abadhaImg,
    "Pakhala Bhata": pakhalaImg,
    "Chhena Poda": chhenapodaImg,
    Rasagola: rasagolaImg,
    Dalma: dalmaImg,
    "Dahibara aloodum": dahibaraUrl, // ⭐ NEW FIXED MAP
  };

  const getFoodImage = (food: any) => {
    if (food.image) return food.image; // Supabase column is "image"
    return foodImageMap[food.name] || dahibaraUrl;
  };

  const displayFoods = foods.length > 0 ? foods : defaultFoods;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold">The Royal Palate</h1>
            <p className="text-xl text-muted-foreground">
              Discover Odisha's culinary heritage
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">Loading foods...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayFoods.map((food) => (
                <Card
                  key={food.id}
                  className="overflow-hidden group hover:shadow-lg transition"
                >
                  <div className="aspect-square overflow-hidden relative">
                    <img
                      src={getFoodImage(food)}
                      alt={food.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition"
                    />

                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-white/70"
                      onClick={() => toggleSave(food.id)}
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          savedFoods.has(food.id)
                            ? "fill-primary text-primary"
                            : "text-black"
                        }`}
                      />
                    </Button>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold">{food.name}</h3>
                    <p className="text-muted-foreground">{food.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Food;
