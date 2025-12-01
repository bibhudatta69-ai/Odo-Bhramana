import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Instagram, Linkedin, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="relative">
      {/* Instagram Join Section - Above Footer */}
      <div className="bg-gradient-to-br from-[#F4C430] via-[#FF8C42] to-[#FF6B6B] text-white">
        <div className="container mx-auto px-4 sm:px-6 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Instagram className="h-8 w-8" />
              <h3 className="text-3xl md:text-4xl font-display font-bold">
                Join Our Journey
              </h3>
            </div>
            <p className="text-lg text-white/90 mb-6 leading-relaxed">
              Follow Odo Bhraman on Instagram and stay connected with our journey across Odisha. 
              Discover daily stories, hidden gems, and cultural treasures.
            </p>
            <Button 
              asChild
              size="lg"
              className="bg-white text-foreground hover:bg-white/90 shadow-lg hover:shadow-xl transition-smooth rounded-xl h-12 px-8"
            >
              <a 
                href="https://www.instagram.com/odo_bhraman.ig?igsh=OGtqMnp3NzRkaXk2" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Instagram className="h-5 w-5" />
                Follow @odo_bhraman.ig
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Curved Top Border */}
      <div className="h-8 bg-background relative">
        <svg 
          className="absolute top-0 w-full h-8" 
          viewBox="0 0 1200 40" 
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M0,20 Q300,0 600,20 T1200,20 L1200,40 L0,40 Z" 
            fill="currentColor" 
            className="text-background"
          />
        </svg>
      </div>

      {/* Main Footer */}
      <div className="bg-muted/30 border-t border-border pt-12 pb-8">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-display font-bold text-primary mb-3">
                Odo Bhraman
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The modern guide to ancient wonders.
              </p>
              <p className="text-sm text-muted-foreground italic">
                Exploring Odisha, one story at a time.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4 text-foreground text-lg">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/districts" className="text-muted-foreground hover:text-primary transition-smooth flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary"></span>
                    Districts
                  </Link>
                </li>
                <li>
                  <Link to="/places" className="text-muted-foreground hover:text-primary transition-smooth flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary"></span>
                    Destinations
                  </Link>
                </li>
                <li>
                  <Link to="/festivals" className="text-muted-foreground hover:text-primary transition-smooth flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary"></span>
                    Festivals
                  </Link>
                </li>
                <li>
                  <Link to="/food" className="text-muted-foreground hover:text-primary transition-smooth flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary"></span>
                    Food
                  </Link>
                </li>
                <li>
                  <Link to="/culture" className="text-muted-foreground hover:text-primary transition-smooth flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary"></span>
                    Culture
                  </Link>
                </li>
                <li>
                  <Link to="/stays" className="text-muted-foreground hover:text-primary transition-smooth flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary"></span>
                    Stays
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Information */}
            <div>
              <h4 className="font-semibold mb-4 text-foreground text-lg">Contact Us</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-muted-foreground">
                  <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary" />
                  <div className="text-sm">
                    Mugupal, Kuakhia,<br />Jajpur, Odisha, 755009
                  </div>
                </li>
                <li className="flex items-start gap-3 text-muted-foreground">
                  <Phone className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary" />
                  <div className="text-sm">
                    <a href="tel:+919692207500" className="hover:text-primary transition-smooth block">
                      +91 9692207500
                    </a>
                    <a href="tel:+919090809265" className="hover:text-primary transition-smooth block">
                      +91 9090809265
                    </a>
                  </div>
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="h-5 w-5 flex-shrink-0 text-primary" />
                  <a 
                    href="mailto:odobhraman@gmail.com" 
                    className="hover:text-primary transition-smooth text-sm"
                  >
                    odobhraman@gmail.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Developer Social Links */}
            <div>
              <h4 className="font-semibold mb-4 text-foreground text-lg">Connect With Developer</h4>
              <div className="space-y-3">
                <a 
                  href="https://www.linkedin.com/in/bibhudutta-barik-45391334b" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-smooth group"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-smooth">
                    <Linkedin className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium">LinkedIn</span>
                </a>
                
                <a 
                  href="https://www.facebook.com/share/1FMZX2FLRf/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-smooth group"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-smooth">
                    <Facebook className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium">Facebook</span>
                </a>
                
                <a 
                  href="https://x.com/OBhraman18822" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-smooth group"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-smooth">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </div>
                  <span className="text-sm font-medium">X (Twitter)</span>
                </a>
                
                <a 
                  href="https://www.instagram.com/bibhu_actor" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-smooth group"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-smooth">
                    <Instagram className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium">Instagram</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-border pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-muted-foreground text-sm text-center md:text-left">
                © 2025 Odo Bhraman. All Rights Reserved.
              </p>
              <p className="text-muted-foreground text-sm text-center md:text-right">
                Designed with <span className="text-red-500">❤️</span> by <span className="font-semibold text-primary">Bibhu</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
