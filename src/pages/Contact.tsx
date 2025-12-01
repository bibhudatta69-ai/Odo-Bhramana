import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";

const Contact = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to send a message.",
      });
      navigate("/login");
      return;
    }

    setSending(true);
    
    // Simulate sending
    setTimeout(() => {
      setSending(false);
      toast({
        title: "Message Sent!",
        description: "We'll get back to you soon.",
      });
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-4">
              Connect With Us
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Have questions? We're here to help you plan your perfect Odisha journey
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-6 animate-fade-in">
              <Card className="hover:shadow-card transition-smooth">
                <CardHeader>
                  <CardTitle>Get in Touch</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Office Address</h3>
                      <p className="text-muted-foreground text-sm">
                        Mugupal, Kuakhia, Jajpur<br />
                        PIN–755009, Odisha, India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Phone Numbers</h3>
                      <p className="text-muted-foreground text-sm">
                        +91 9692207500<br />
                        +91 9090809265
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-muted-foreground text-sm">
                        odobhraman@gmail.com
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-card transition-smooth">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Location Map</h3>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59846.88819935294!2d86.12345678901234!3d20.85678901234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1bd3e6c0000001%3A0x1234567890abcdef!2sMugpal%2C%20Kuakhia%2C%20Jajpur%2C%20Odisha%20755009!5e0!3m2!1sen!2sin!4v1732445678901!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0, borderRadius: '0.5rem' }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Mugupal, Kuakhia, Jajpur Location"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
                {!user && (
                  <p className="text-sm text-muted-foreground">
                    Please log in to send a message
                  </p>
                )}
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input 
                      id="name" 
                      placeholder="Your name" 
                      required 
                      disabled={!user}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your@email.com" 
                      required 
                      disabled={!user}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="Your phone number" 
                      disabled={!user}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell us how we can help you..." 
                      rows={6} 
                      required 
                      disabled={!user}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={!user || sending}
                  >
                    {sending ? "Sending..." : !user ? "Login to Send Message" : "Send Message"}
                  </Button>

                  {!user && (
                    <p className="text-sm text-center text-muted-foreground">
                      <Button 
                        variant="link" 
                        onClick={() => navigate("/login")}
                        className="p-0 h-auto"
                      >
                        Click here to login
                      </Button>
                    </p>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;