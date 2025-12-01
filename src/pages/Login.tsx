import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff, Sparkles } from "lucide-react";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  
  const leftSideRef = useRef<HTMLDivElement>(null);
  const rightSideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftSideRef.current, {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
      
      gsap.from(rightSideRef.current, {
        x: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
      });
    });

    return () => ctx.revert();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await signIn(email, password);
    } catch (error) {
      // Error handled in auth context
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await signUp(email, password, fullName);
      setEmail("");
      setPassword("");
      setFullName("");
    } catch (error) {
      // Error handled in auth context
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-6xl bg-card rounded-[32px] shadow-premium overflow-hidden">
        <div className="grid lg:grid-cols-2 min-h-[600px]">
          {/* Left Side - Premium Gradient Section */}
          <div 
            ref={leftSideRef}
            className="relative bg-gradient-to-br from-[#F4C430] via-[#FF8C42] to-[#FF6B6B] p-12 flex flex-col justify-center items-start text-white overflow-hidden"
          >
            {/* Decorative circles */}
            <div className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-10 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
            
            <div className="relative z-10 max-w-md">
              <div className="mb-6 flex items-center gap-2">
                <Sparkles className="h-8 w-8" />
                <span className="text-2xl font-display font-bold">Odo Bhraman</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-display font-bold mb-6 leading-tight">
                {isSignup ? "Join Odo Bhraman" : "Welcome Back"}
              </h1>
              
              <p className="text-lg text-white/90 mb-8 leading-relaxed">
                {isSignup 
                  ? "Enter your details and start exploring Odisha's hidden treasures and cultural wonders"
                  : "Sign in to continue your journey through Odisha's rich heritage and traditions"
                }
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl">
                    🏛️
                  </div>
                  <div>
                    <p className="font-semibold">Discover Heritage</p>
                    <p className="text-sm text-white/80">Ancient temples & traditions</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl">
                    🤝
                  </div>
                  <div>
                    <p className="font-semibold">Connect Locally</p>
                    <p className="text-sm text-white/80">Stay with warm Odia hosts</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl">
                    🎭
                  </div>
                  <div>
                    <p className="font-semibold">Live Culture</p>
                    <p className="text-sm text-white/80">Experience authentic festivals</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form Section */}
          <div ref={rightSideRef} className="p-12 flex flex-col justify-center bg-white">
            <div className="max-w-md mx-auto w-full">
              <h2 className="text-3xl font-display font-bold text-foreground mb-2">
                {isSignup ? "Create Account" : "Sign In"}
              </h2>
              <p className="text-muted-foreground mb-8">
                {isSignup 
                  ? "Fill in your details to get started" 
                  : "Enter your credentials to continue"
                }
              </p>

              <form onSubmit={isSignup ? handleSignup : handleLogin} className="space-y-6">
                {isSignup && (
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground font-medium">
                      Full Name
                    </Label>
                    <Input 
                      id="name" 
                      type="text" 
                      placeholder="Enter your full name" 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="h-12 rounded-xl border-border focus:border-primary transition-smooth"
                      required 
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground font-medium">
                    Email Address
                  </Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="you@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 rounded-xl border-border focus:border-primary transition-smooth"
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Input 
                      id="password" 
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 rounded-xl border-border focus:border-primary transition-smooth pr-12"
                      required 
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-12 rounded-xl text-base font-semibold bg-[#F4C430] hover:bg-[#E5B520] text-foreground shadow-lg hover:shadow-xl transition-smooth"
                  disabled={isLoading}
                >
                  {isLoading 
                    ? (isSignup ? "Creating account..." : "Signing in...") 
                    : (isSignup ? "Create Account" : "Sign In")
                  }
                </Button>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={() => {
                    setIsSignup(!isSignup);
                    setEmail("");
                    setPassword("");
                    setFullName("");
                  }}
                  className="text-muted-foreground hover:text-primary transition-smooth font-medium"
                >
                  {isSignup 
                    ? "Already have an account? Sign In" 
                    : "Don't have an account? Sign Up"
                  }
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
