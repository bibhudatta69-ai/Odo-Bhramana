import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { 
  User, 
  MapPin, 
  Calendar, 
  Languages, 
  Star, 
  CheckCircle 
} from "lucide-react";

interface SurferProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  surferId: string;
}

export const SurferProfileDialog = ({ 
  open, 
  onOpenChange, 
  surferId 
}: SurferProfileDialogProps) => {
  const [profile, setProfile] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [stayHistory, setStayHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (open && surferId) {
      fetchSurferData();
    }
  }, [open, surferId]);

  const fetchSurferData = async () => {
    try {
      setLoading(true);

      // Fetch profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', surferId)
        .single();

      // Fetch reviews
      const { data: reviewsData } = await supabase
        .from('surfer_reviews')
        .select(`
          *,
          stays_hosts(
            profiles(full_name)
          )
        `)
        .eq('surfer_id', surferId)
        .order('created_at', { ascending: false });

      // Fetch stay history
      const { data: historyData } = await supabase
        .from('stay_requests')
        .select(`
          *,
          stays_hosts(
            address,
            profiles(full_name)
          )
        `)
        .eq('surfer_id', surferId)
        .eq('status', 'approved')
        .order('created_at', { ascending: false })
        .limit(10);

      setProfile(profileData);
      setReviews(reviewsData || []);
      setStayHistory(historyData || []);
    } catch (error) {
      console.error('Error fetching surfer data:', error);
    } finally {
      setLoading(false);
    }
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 'N/A';

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Surfer Profile</DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="text-center py-12">Loading profile...</div>
        ) : profile ? (
          <div className="space-y-6">
            {/* Profile Header */}
            <div className="flex items-start gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={profile.avatar_url} />
                <AvatarFallback className="text-lg">
                  {profile.full_name ? getInitials(profile.full_name) : 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-2xl font-display font-bold mb-1">
                  {profile.full_name || 'Anonymous Surfer'}
                </h2>
                {profile.hometown && (
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4" />
                    <span>{profile.hometown}</span>
                  </div>
                )}
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="font-semibold">{averageRating}</span>
                    <span className="text-muted-foreground">
                      ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">
                      {stayHistory.length} completed {stayHistory.length === 1 ? 'stay' : 'stays'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio */}
            {profile.bio && (
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <User className="h-4 w-4" />
                    About
                  </h3>
                  <p className="text-muted-foreground">{profile.bio}</p>
                </CardContent>
              </Card>
            )}

            {/* Interests & Languages */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profile.interests && profile.interests.length > 0 && (
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-3">Interests</h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.interests.map((interest: string, idx: number) => (
                        <Badge key={idx} variant="secondary">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {profile.languages_spoken && profile.languages_spoken.length > 0 && (
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Languages className="h-4 w-4" />
                      Languages
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.languages_spoken.map((lang: string, idx: number) => (
                        <Badge key={idx} variant="outline">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Reviews */}
            {reviews.length > 0 && (
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <h3 className="font-semibold text-lg">Reviews from Hosts</h3>
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b last:border-0 pb-4 last:pb-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold">
                            {review.stays_hosts?.profiles?.full_name || 'Host'}
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < review.rating
                                    ? 'fill-primary text-primary'
                                    : 'text-muted-foreground'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(review.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground italic">
                        "{review.review_text}"
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Stay History */}
            {stayHistory.length > 0 && (
              <Card>
                <CardContent className="pt-6 space-y-3">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Travel History
                  </h3>
                  {stayHistory.map((stay) => (
                    <div
                      key={stay.id}
                      className="flex items-center justify-between py-2 border-b last:border-0"
                    >
                      <div>
                        <p className="font-medium">
                          {stay.stays_hosts?.profiles?.full_name || 'Host'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {stay.stays_hosts?.address}
                        </p>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {new Date(stay.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {reviews.length === 0 && stayHistory.length === 0 && (
              <Card>
                <CardContent className="pt-6 text-center text-muted-foreground">
                  <p>This surfer is new to the platform.</p>
                  <p className="text-sm mt-2">No reviews or travel history yet.</p>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Profile not found</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
