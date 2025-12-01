
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient"; 
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";

export default function SavedItems() {
  const [user, setUser] = useState(null);

  const [savedPlaces, setSavedPlaces] = useState([]);
  const [savedFoods, setSavedFoods] = useState([]);
  const [savedFestivals, setSavedFestivals] = useState([]);

  // --------------------------------------------------------
  // ✅ Fetch Logged-in User
  // --------------------------------------------------------
  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    }
    getUser();
  }, []);

  // --------------------------------------------------------
  // ✅ Fetch Saved Items
  // --------------------------------------------------------
  useEffect(() => {
    if (!user) return;

    async function fetchSaved() {
      // 🌍 PLACES
      const { data: placeIds } = await supabase
        .from("saved_places")
        .select("place_id")
        .eq("user_id", user.id);

      if (placeIds?.length > 0) {
        const { data: places } = await supabase
          .from("places")
          .select("*")
          .in("id", placeIds.map((x) => x.place_id));

        setSavedPlaces(places);
      }

      // 🍛 FOODS
      const { data: foodIds } = await supabase
        .from("saved_foods")
        .select("food_id")
        .eq("user_id", user.id);

      if (foodIds?.length > 0) {
        const { data: foods } = await supabase
          .from("foods")
          .select("*")
          .in("id", foodIds.map((x) => x.food_id));

        setSavedFoods(foods);
      }

      // 🎉 FESTIVALS
      const { data: festivalIds } = await supabase
        .from("saved_festivals")
        .select("festival_id")
        .eq("user_id", user.id);

      if (festivalIds?.length > 0) {
        const { data: festivals } = await supabase
          .from("festivals")
          .select("*")
          .in("id", festivalIds.map((x) => x.festival_id));

        setSavedFestivals(festivals);
      }
    }

    fetchSaved();
  }, [user]);

  // --------------------------------------------------------
  // RETURN UI
  // --------------------------------------------------------
  return (
    <div className="max-w-6xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold text-center mb-4">My Saved Items</h1>
      <p className="text-center text-gray-500 mb-10">
        Your favorite places, foods, and festivals all in one place
      </p>

      <Tabs defaultValue="places" className="w-full">
        <TabsList className="flex justify-center space-x-4 mb-8">
          <TabsTrigger value="places">
            Places ({savedPlaces.length})
          </TabsTrigger>

          <TabsTrigger value="foods">
            Foods ({savedFoods.length})
          </TabsTrigger>

          <TabsTrigger value="festivals">
            Festivals ({savedFestivals.length})
          </TabsTrigger>
        </TabsList>

        {/* --------------------------------------------------
            🌍 PLACES TAB
        -------------------------------------------------- */}
        <TabsContent value="places">
          {savedPlaces.length === 0 ? (
            <p className="text-center text-gray-400">No saved places yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {savedPlaces.map((item) => (
                <div key={item.id} className="shadow rounded-lg p-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="rounded-md mb-3 object-cover w-full h-48"
                    onError={(e) =>
                      (e.currentTarget.src =
                        "https://placehold.co/600x400?text=No+Image")
                    }
                  />
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-gray-600">{item.location}</p>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        {/* --------------------------------------------------
            🍛 FOODS TAB
        -------------------------------------------------- */}
        <TabsContent value="foods">
          {savedFoods.length === 0 ? (
            <p className="text-center text-gray-400">No saved foods yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {savedFoods.map((item) => (
                <div key={item.id} className="shadow rounded-lg p-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="rounded-md mb-3 object-cover w-full h-48"
                    onError={(e) =>
                      (e.currentTarget.src =
                        "https://placehold.co/600x400?text=No+Image")
                    }
                  />
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        {/* --------------------------------------------------
            🎉 FESTIVALS TAB
        -------------------------------------------------- */}
        <TabsContent value="festivals">
          {savedFestivals.length === 0 ? (
            <p className="text-center text-gray-400">
              No saved festivals yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {savedFestivals.map((item) => (
                <div key={item.id} className="shadow rounded-lg p-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="rounded-md mb-3 object-cover w-full h-48"
                    onError={(e) =>
                      (e.currentTarget.src =
                        "https://placehold.co/600x400?text=No+Image")
                    }
                  />
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
