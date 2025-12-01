import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const useSavedPlaces = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [savedPlaces, setSavedPlaces] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchSavedPlaces();
    } else {
      setSavedPlaces(new Set());
    }
  }, [user]);

  const fetchSavedPlaces = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('saved_places')
        .select('place_id')
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      setSavedPlaces(new Set(data.map(item => item.place_id)));
    } catch (error) {
      console.error('Error fetching saved places:', error);
    }
  };

  const toggleSave = async (placeId: string) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to save places.",
      });
      return;
    }

    setLoading(true);
    try {
      if (savedPlaces.has(placeId)) {
        const { error } = await supabase
          .from('saved_places')
          .delete()
          .eq('user_id', user.id)
          .eq('place_id', placeId);
        
        if (error) throw error;
        
        setSavedPlaces(prev => {
          const next = new Set(prev);
          next.delete(placeId);
          return next;
        });
        
        toast({
          title: "Removed from favorites",
        });
      } else {
        const { error } = await supabase
          .from('saved_places')
          .insert({ user_id: user.id, place_id: placeId });
        
        if (error) throw error;
        
        setSavedPlaces(prev => new Set(prev).add(placeId));
        
        toast({
          title: "Added to favorites",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return { savedPlaces, toggleSave, loading };
};

export const useSavedFoods = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [savedFoods, setSavedFoods] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchSavedFoods();
    } else {
      setSavedFoods(new Set());
    }
  }, [user]);

  const fetchSavedFoods = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('saved_foods')
        .select('food_id')
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      setSavedFoods(new Set(data.map(item => item.food_id)));
    } catch (error) {
      console.error('Error fetching saved foods:', error);
    }
  };

  const toggleSave = async (foodId: string) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to save foods.",
      });
      return;
    }

    setLoading(true);
    try {
      if (savedFoods.has(foodId)) {
        const { error } = await supabase
          .from('saved_foods')
          .delete()
          .eq('user_id', user.id)
          .eq('food_id', foodId);
        
        if (error) throw error;
        
        setSavedFoods(prev => {
          const next = new Set(prev);
          next.delete(foodId);
          return next;
        });
        
        toast({
          title: "Removed from favorites",
        });
      } else {
        const { error } = await supabase
          .from('saved_foods')
          .insert({ user_id: user.id, food_id: foodId });
        
        if (error) throw error;
        
        setSavedFoods(prev => new Set(prev).add(foodId));
        
        toast({
          title: "Added to favorites",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return { savedFoods, toggleSave, loading };
};

export const useSavedFestivals = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [savedFestivals, setSavedFestivals] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchSavedFestivals();
    } else {
      setSavedFestivals(new Set());
    }
  }, [user]);

  const fetchSavedFestivals = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('saved_festivals')
        .select('festival_id')
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      setSavedFestivals(new Set(data.map(item => item.festival_id)));
    } catch (error) {
      console.error('Error fetching saved festivals:', error);
    }
  };

  const toggleSave = async (festivalId: string) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to save festivals.",
      });
      return;
    }

    setLoading(true);
    try {
      if (savedFestivals.has(festivalId)) {
        const { error } = await supabase
          .from('saved_festivals')
          .delete()
          .eq('user_id', user.id)
          .eq('festival_id', festivalId);
        
        if (error) throw error;
        
        setSavedFestivals(prev => {
          const next = new Set(prev);
          next.delete(festivalId);
          return next;
        });
        
        toast({
          title: "Removed from favorites",
        });
      } else {
        const { error } = await supabase
          .from('saved_festivals')
          .insert({ user_id: user.id, festival_id: festivalId });
        
        if (error) throw error;
        
        setSavedFestivals(prev => new Set(prev).add(festivalId));
        
        toast({
          title: "Added to favorites",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return { savedFestivals, toggleSave, loading };
};