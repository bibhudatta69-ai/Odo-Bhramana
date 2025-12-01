import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Upload, X } from "lucide-react";

interface HostPhotoGalleryProps {
  hostId: string;
  isOwner: boolean;
}

export const HostPhotoGallery = ({ hostId, isOwner }: HostPhotoGalleryProps) => {
  const { toast } = useToast();
  const [photos, setPhotos] = useState<any[]>([]);
  const [photoUrl, setPhotoUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPhotos();
  }, [hostId]);

  const fetchPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from('host_photos')
        .select('*')
        .eq('host_id', hostId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPhotos(data || []);
    } catch (error: any) {
      console.error('Error fetching photos:', error);
    }
  };

  const addPhoto = async () => {
    if (!photoUrl.trim()) {
      toast({
        title: "Error",
        description: "Please enter a photo URL",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('host_photos')
        .insert({
          host_id: hostId,
          photo_url: photoUrl.trim(),
          caption: caption.trim() || null,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Photo added to gallery",
      });

      setPhotoUrl("");
      setCaption("");
      await fetchPhotos();
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

  const deletePhoto = async (photoId: string) => {
    try {
      const { error } = await supabase
        .from('host_photos')
        .delete()
        .eq('id', photoId);

      if (error) throw error;

      toast({
        title: "Photo deleted",
      });

      await fetchPhotos();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Photo Gallery</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isOwner && (
          <div className="space-y-3 pb-4 border-b">
            <div className="space-y-2">
              <Label htmlFor="photo-url">Photo URL</Label>
              <Input
                id="photo-url"
                placeholder="https://example.com/photo.jpg"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="caption">Caption (optional)</Label>
              <Input
                id="caption"
                placeholder="Describe your photo..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </div>
            <Button onClick={addPhoto} disabled={loading} className="w-full">
              <Upload className="mr-2 h-4 w-4" />
              Add Photo
            </Button>
          </div>
        )}

        {photos.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No photos yet</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {photos.map((photo) => (
              <div key={photo.id} className="relative group">
                <img
                  src={photo.photo_url}
                  alt={photo.caption || "Host photo"}
                  className="w-full h-40 object-cover rounded-lg"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d";
                  }}
                />
                {isOwner && (
                  <Button
                    size="icon"
                    variant="destructive"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => deletePhoto(photo.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
                {photo.caption && (
                  <p className="text-xs mt-1 text-muted-foreground truncate">
                    {photo.caption}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
