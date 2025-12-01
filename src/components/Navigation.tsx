import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserMenu from "@/components/UserMenu";
import odoBhramanLogo from "@/assets/odo-bhraman-logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const exploreItems = [
    { label: "Culture", href: "/culture" },
    { label: "Places", href: "/places" },
    { label: "Festivals", href: "/festivals" },
    { label: "Food", href: "/food" },
    { label: "Tribes", href: "/tribes" },
    { label: "Gallery", href: "/gallery" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={odoBhramanLogo} 
              alt="Odo Bhraman Logo" 
              className="h-10 w-10 object-contain group-hover:scale-110 transition-transform duration-300"
            />
            <div className="text-2xl font-display font-bold text-primary group-hover:text-primary-glow transition-smooth">
              Odo Bhraman
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 text-foreground hover:text-primary transition-smooth">
              <Home className="h-5 w-5" />
            </Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-smooth font-medium">
              About
            </Link>
            <Link to="/odisha" className="text-foreground hover:text-primary transition-smooth font-medium">
              Odisha
            </Link>
            <Link to="/stays" className="text-foreground hover:text-primary transition-smooth font-medium">
              Stays
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1">
                  Explore <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {exploreItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link to={item.href} className="cursor-pointer">
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <UserMenu />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground hover:text-primary transition-smooth"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-border animate-fade-in">
            <Link
              to="/"
              className="flex items-center gap-2 py-2 text-foreground hover:text-primary transition-smooth"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link
              to="/about"
              className="block py-2 text-foreground hover:text-primary transition-smooth"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/odisha"
              className="block py-2 text-foreground hover:text-primary transition-smooth"
              onClick={() => setIsMenuOpen(false)}
            >
              Odisha
            </Link>
            <Link
              to="/stays"
              className="block py-2 text-foreground hover:text-primary transition-smooth"
              onClick={() => setIsMenuOpen(false)}
            >
              Stays
            </Link>
            <div className="border-t border-border pt-2 mt-2">
              <div className="text-sm font-semibold text-muted-foreground mb-2">Explore</div>
              {exploreItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="block py-2 text-foreground hover:text-primary transition-smooth"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
