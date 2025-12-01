import introMusic from "./assets/music/intro.mp3";
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import LoadingScreen from "@/components/LoadingScreen";

// Pages
import EditHostProfile from "./pages/EditHostProfile";
import Home from "./pages/Home";
import About from "./pages/About";
import Odisha from "./pages/Odisha";
import Login from "./pages/Login";
import Places from "./pages/Places";
import Stays from "./pages/Stays";
import HostProfile from "./pages/HostProfile";
import SurferProfile from "./pages/SurferProfile";
import Culture from "./pages/Culture";
import Festivals from "./pages/Festivals";
import Food from "./pages/Food";
import Tribes from "./pages/Tribes";
import Gallery from "./pages/Gallery";
import Districts from "./pages/Districts";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import SavedItems from "./pages/SavedItems";

const queryClient = new QueryClient();

const App = () => {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const introPlayed = localStorage.getItem("introPlayed");
    const audio = new Audio(introMusic);
    audio.volume = 0;

    const clickHandler = () => {
      if (!introPlayed) {
        audio.play().catch(() => {});
        localStorage.setItem("introPlayed", "true");
      }

      document.removeEventListener("click", clickHandler);
      document.removeEventListener("touchstart", clickHandler);
    };

    document.addEventListener("click", clickHandler);
    document.addEventListener("touchstart", clickHandler);

    const hasVisited = sessionStorage.getItem("hasVisited");
    if (hasVisited) {
      setShowLoading(false);
    } else {
      sessionStorage.setItem("hasVisited", "true");
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />

          {showLoading && (
            <LoadingScreen onComplete={() => setShowLoading(false)} />
          )}

          {/* MUST wrap all routes inside BrowserRouter */}
          <BrowserRouter basename="/">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/odisha" element={<Odisha />} />
              <Route path="/login" element={<Login />} />

              <Route path="/places" element={<Places />} />
              <Route path="/stays" element={<Stays />} />
              <Route path="/edit-host-profile" element={<EditHostProfile />} />

              {/* HOST PROFILE ROUTE */}
              <Route path="/stay/host/:hostId" element={<HostProfile />} />

              <Route path="/surfer-profile" element={<SurferProfile />} />
              <Route path="/culture" element={<Culture />} />
              <Route path="/festivals" element={<Festivals />} />
              <Route path="/food" element={<Food />} />
              <Route path="/tribes" element={<Tribes />} />
              <Route path="/gallery" element={<Gallery />} />

              <Route path="/saved" element={<SavedItems />} />

              <Route path="/districts" element={<Districts />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/profile" element={<Profile />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
