import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, MapPin, Calendar, UtensilsCrossed, Mail } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { SurferProfileDialog } from "@/components/SurferProfileDialog";
import { Eye } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [savedPlaces, setSavedPlaces] = useState<any[]>([]);
  const [savedFoods, setSavedFoods] = useState<any[]>([]);
  const [savedFestivals, setSavedFestivals] = useState<any[]>([]);
  const [stayRequests, setStayRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSurferId, setSelectedSurferId] = useState<string | null>(null);
  const [surferProfileOpen, setSurferProfileOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchSavedItems();
  }, [user, navigate]);

  const fetchSavedItems = async () => {
    try {
      // Fetch saved places
      const { data: placesData } = await supabase
        .from('saved_places')
        .select('place_id, places(*)')
        .eq('user_id', user?.id);
      
      // Fetch saved foods
      const { data: foodsData } = await supabase
        .from('saved_foods')
        .select('food_id, foods(*)')
        .eq('user_id', user?.id);
      
      // Fetch saved festivals
      const { data: festivalsData } = await supabase
        .from('saved_festivals')
        .select('festival_id, festivals(*)')
        .eq('user_id', user?.id);

      // Fetch stay requests where user is the host
      const { data: hostData } = await supabase
        .from('stays_hosts')
        .select('id')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (hostData) {
        const { data: requestsData } = await supabase
          .from('stay_requests')
          .select(`
            *,
            profiles!stay_requests_surfer_id_fkey(full_name)
          `)
          .eq('host_id', hostData.id)
          .order('created_at', { ascending: false });
        
        setStayRequests(requestsData || []);
      }

      setSavedPlaces(placesData?.map(item => item.places) || []);
      setSavedFoods(foodsData?.map(item => item.foods) || []);
      setSavedFestivals(festivalsData?.map(item => item.festivals) || []);
    } catch (error) {
      console.error('Error fetching saved items:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeSavedPlace = async (placeId: string) => {
    await supabase
      .from('saved_places')
      .delete()
      .eq('user_id', user?.id)
      .eq('place_id', placeId);
    fetchSavedItems();
  };

  const removeSavedFood = async (foodId: string) => {
    await supabase
      .from('saved_foods')
      .delete()
      .eq('user_id', user?.id)
      .eq('food_id', foodId);
    fetchSavedItems();
  };

  const removeSavedFestival = async (festivalId: string) => {
    await supabase
      .from('saved_festivals')
      .delete()
      .eq('user_id', user?.id)
      .eq('festival_id', festivalId);
    fetchSavedItems();
  };

  const handleUpdateRequestStatus = async (requestId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('stay_requests')
        .update({ status: newStatus })
        .eq('id', requestId);
      
      if (error) throw error;
      
      toast({
        title: "Success!",
        description: `Request ${newStatus}`,
      });
      
      fetchSavedItems();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const openSurferProfile = (surferId: string) => {
    setSelectedSurferId(surferId);
    setSurferProfileOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 pb-20 container mx-auto px-4">
          <div className="text-center py-12">Loading your saved items...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-4">
              My Saved Items
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Your favorite places, foods, and festivals all in one place
            </p>
          </div>

          <Tabs defaultValue="places" className="w-full">
            <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-4 mb-8">
              <TabsTrigger value="places">Places ({savedPlaces.length})</TabsTrigger>
              <TabsTrigger value="foods">Foods ({savedFoods.length})</TabsTrigger>
              <TabsTrigger value="festivals">Festivals ({savedFestivals.length})</TabsTrigger>
              <TabsTrigger value="requests">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Requests ({stayRequests.length})
                </div>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="places" className="animate-fade-in">
              {savedPlaces.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">You haven't saved any places yet.</p>
                  <Button onClick={() => navigate("/places")}>Explore Places</Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedPlaces.map((place) => (
                    <Card key={place.id} className="overflow-hidden hover:shadow-card transition-smooth group">
                      <div className="aspect-video overflow-hidden relative">
                        <img 
                          src={place.image_url}
                          alt={place.name}
                          className="w-full h-full object-cover"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background"
                          onClick={() => removeSavedPlace(place.id)}
                        >
                          <Heart className="h-5 w-5 fill-primary text-primary" />
                        </Button>
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 text-sm text-primary mb-2">
                          <MapPin className="h-4 w-4" />
                          <span>{place.location}</span>
                        </div>
                        <h3 className="text-xl font-display font-semibold mb-2">{place.name}</h3>
                        <p className="text-muted-foreground">{place.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="foods" className="animate-fade-in">
              {savedFoods.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">You haven't saved any foods yet.</p>
                  <Button onClick={() => navigate("/food")}>Explore Foods</Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedFoods.map((food) => (
                    <Card key={food.id} className="overflow-hidden hover:shadow-card transition-smooth group">
                      <div className="aspect-square overflow-hidden relative">
                        <img 
                          src={food.image_url}
                          alt={food.name}
                          className="w-full h-full object-cover"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background"
                          onClick={() => removeSavedFood(food.id)}
                        >
                          <Heart className="h-5 w-5 fill-primary text-primary" />
                        </Button>
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 text-sm text-primary mb-2">
                          <UtensilsCrossed className="h-4 w-4" />
                          <span>Traditional Dish</span>
                        </div>
                        <h3 className="text-xl font-display font-semibold mb-2">{food.name}</h3>
                        <p className="text-muted-foreground">{food.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="festivals" className="animate-fade-in">
              {savedFestivals.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">You haven't saved any festivals yet.</p>
                  <Button onClick={() => navigate("/festivals")}>Explore Festivals</Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedFestivals.map((festival) => (
                    <Card key={festival.id} className="overflow-hidden hover:shadow-card transition-smooth group">
                      <div className="aspect-video overflow-hidden relative">
                        <img 
                          src={festival.image_url}
                          alt={festival.name}
                          className="w-full h-full object-cover"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background"
                          onClick={() => removeSavedFestival(festival.id)}
                        >
                          <Heart className="h-5 w-5 fill-primary text-primary" />
                        </Button>
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 text-sm text-primary mb-2">
                          <Calendar className="h-4 w-4" />
                          <span>{festival.date_info}</span>
                        </div>
                        <h3 className="text-xl font-display font-semibold mb-2">{festival.name}</h3>
                        <p className="text-muted-foreground">{festival.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="requests" className="animate-fade-in">
              {stayRequests.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">No stay requests received yet.</p>
                  <Button onClick={() => navigate("/stays")}>Become a Host</Button>
                </div>
              ) : (
                <div className="max-w-3xl mx-auto space-y-4">
                  {stayRequests.map((request) => (
                    <Card key={request.id} className="border-2">
                      <CardContent className="pt-6 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-lg">{request.profiles?.full_name || 'Surfer'}</p>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openSurferProfile(request.surfer_id)}
                                className="h-8 gap-1"
                              >
                                <Eye className="h-4 w-4" />
                                View Profile
                              </Button>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Requested: {new Date(request.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge variant={
                            request.status === 'approved' ? 'default' : 
                            request.status === 'rejected' ? 'destructive' : 
                            'secondary'
                          }>
                            {request.status}
                          </Badge>
                        </div>
                        {request.message && (
                          <div className="bg-muted/50 p-4 rounded-md">
                            <p className="text-sm italic">"{request.message}"</p>
                          </div>
                        )}
                        {request.status === 'pending' && (
                          <div className="flex gap-2 pt-2">
                            <Button 
                              onClick={() => handleUpdateRequestStatus(request.id, 'approved')}
                              size="sm"
                              className="flex-1"
                            >
                              Approve
                            </Button>
                            <Button 
                              onClick={() => handleUpdateRequestStatus(request.id, 'rejected')}
                              size="sm"
                              variant="destructive"
                              className="flex-1"
                            >
                              Reject
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />

      {selectedSurferId && (
        <SurferProfileDialog
          open={surferProfileOpen}
          onOpenChange={setSurferProfileOpen}
          surferId={selectedSurferId}
        />
      )}
    </div>
  );
};

export default Profile;
