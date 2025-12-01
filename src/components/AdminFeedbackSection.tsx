import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const AdminFeedbackSection = () => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  const handleSendReview = async () => {
    if (rating === 0 || !feedback.trim()) {
      toast({
        title: "Incomplete Review",
        description: "Please provide a rating and feedback.",
        variant: "destructive"
      });
      return;
    }

    setSending(true);
    try {
      const { error } = await supabase
        .from('reviews')
        .insert({
          rating,
          review_text: feedback,
          user_name: "Admin Review"
        });

      if (error) throw error;

      toast({
        title: "Review Submitted!",
        description: "Your feedback has been recorded."
      });
      
      setRating(0);
      setFeedback("");
    } catch (error) {
      console.error("Error sending review:", error);
      toast({
        title: "Error",
        description: "Failed to send review. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSending(false);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) {
      toast({
        title: "Empty Message",
        description: "Please enter a message.",
        variant: "destructive"
      });
      return;
    }

    setSending(true);
    try {
      // For now, we'll log it. You can integrate with a messages table later
      console.log("Admin message:", message);
      
      toast({
        title: "Message Sent!",
        description: "Your message has been delivered."
      });
      
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Review Section */}
      <Card className="hover:shadow-card transition-smooth">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-accent" />
            Submit Review
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="rating">Rating</Label>
            <div className="flex gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= (hoveredRating || rating)
                        ? "fill-accent text-accent"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-sm text-muted-foreground mt-1">
                {rating} out of 5 stars
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="feedback">Your Feedback</Label>
            <Textarea
              id="feedback"
              placeholder="Share your thoughts about Odo Bhraman..."
              rows={4}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="mt-2"
            />
          </div>

          <Button
            onClick={handleSendReview}
            disabled={sending}
            className="w-full"
          >
            <Send className="mr-2 h-4 w-4" />
            {sending ? "Sending..." : "Submit Review"}
          </Button>
        </CardContent>
      </Card>

      {/* Message Section */}
      <Card className="hover:shadow-card transition-smooth">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="h-5 w-5 text-primary" />
            Send Message
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Type your message to users or support..."
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-2"
            />
          </div>

          <Button
            onClick={handleSendMessage}
            disabled={sending}
            variant="outline"
            className="w-full"
          >
            <Send className="mr-2 h-4 w-4" />
            {sending ? "Sending..." : "Send Message"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminFeedbackSection;
