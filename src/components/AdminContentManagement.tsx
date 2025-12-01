import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { MapPin, Utensils, CalendarDays, Users as UsersIcon, Pencil, Trash2 } from "lucide-react";

const AdminContentManagement = () => {
  const [places, setPlaces] = useState<any[]>([]);
  const [foods, setFoods] = useState<any[]>([]);
  const [festivals, setFestivals] = useState<any[]>([]);
  const [tribes, setTribes] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchAllContent();
  }, []);

  const fetchAllContent = async () => {
    try {
      const [placesRes, foodsRes, festivalsRes, tribesRes] = await Promise.all([
        supabase.from('places').select('*').order('name'),
        supabase.from('foods').select('*').order('name'),
        supabase.from('festivals').select('*').order('name'),
        supabase.from('tribes').select('*').order('name'),
      ]);

      setPlaces(placesRes.data || []);
      setFoods(foodsRes.data || []);
      setFestivals(festivalsRes.data || []);
      setTribes(tribesRes.data || []);
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  const handleDelete = async (table: 'places' | 'foods' | 'festivals' | 'tribes', id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `${name} deleted successfully.`
      });
      fetchAllContent();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete item.",
        variant: "destructive"
      });
    }
  };

  const renderContentList = (items: any[], table: 'places' | 'foods' | 'festivals' | 'tribes', icon: any) => {
    const Icon = icon;
    return (
      <div className="space-y-3">
        {items.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No items yet.</p>
        ) : (
          items.map((item) => (
            <Card key={item.id} className="hover:shadow-card transition-smooth">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-primary" />
                    <CardTitle className="text-base">{item.name}</CardTitle>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toast({ title: "Edit feature", description: "Use Cloud backend to edit content directly." })}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(table, item.id, item.name)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    );
  };

  return (
    <Tabs defaultValue="places" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="places">
          <MapPin className="h-4 w-4 mr-2" />
          Places
        </TabsTrigger>
        <TabsTrigger value="foods">
          <Utensils className="h-4 w-4 mr-2" />
          Foods
        </TabsTrigger>
        <TabsTrigger value="festivals">
          <CalendarDays className="h-4 w-4 mr-2" />
          Festivals
        </TabsTrigger>
        <TabsTrigger value="tribes">
          <UsersIcon className="h-4 w-4 mr-2" />
          Tribes
        </TabsTrigger>
      </TabsList>

      <TabsContent value="places" className="mt-4">
        {renderContentList(places, 'places', MapPin)}
      </TabsContent>

      <TabsContent value="foods" className="mt-4">
        {renderContentList(foods, 'foods', Utensils)}
      </TabsContent>

      <TabsContent value="festivals" className="mt-4">
        {renderContentList(festivals, 'festivals', CalendarDays)}
      </TabsContent>

      <TabsContent value="tribes" className="mt-4">
        {renderContentList(tribes, 'tribes', UsersIcon)}
      </TabsContent>
    </Tabs>
  );
};

export default AdminContentManagement;
