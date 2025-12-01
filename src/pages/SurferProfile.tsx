import { useEffect, useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

type Profile = {
  id: string;
  full_name: string | null;
  bio: string | null;
  hometown: string | null;
  date_of_birth: string | null;
  languages_spoken: string[] | null;
  interests: string[] | null;
};

const SurferProfile = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // form fields
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [hometown, setHometown] = useState("");
  const [dob, setDob] = useState("");
  const [languagesInput, setLanguagesInput] = useState("");
  const [interestsInput, setInterestsInput] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      setPageLoading(true);
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .maybeSingle();

        if (error) {
          console.error("Error loading profile", error);
        }

        if (data) {
          const p = data as Profile;
          setProfile(p);
          setFullName(p.full_name || "");
          setBio(p.bio || "");
          setHometown(p.hometown || "");
          setDob(p.date_of_birth || "");
          setLanguagesInput((p.languages_spoken || []).join(", "));
          setInterestsInput((p.interests || []).join(", "));
        }
      } finally {
        setPageLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const showError = (msg: string) => {
    setErrorMessage(msg);
    setTimeout(() => setErrorMessage(null), 3500);
  };

  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);

    const languages = languagesInput
      .split(",")
      .map((l) => l.trim())
      .filter(Boolean);

    const interests = interestsInput
      .split(",")
      .map((i) => i.trim())
      .filter(Boolean);

    try {
      const { error } = await supabase.from("profiles").upsert({
        id: user.id, // important: fk to auth.users.id
        full_name: fullName,
        bio,
        hometown,
        date_of_birth: dob || null,
        languages_spoken: languages.length ? languages : null,
        interests: interests.length ? interests : null,
      });

      if (error) {
        console.error(error);
        showError("Could not save profile. Please try again.");
      } else {
        showSuccess("Profile saved successfully.");
        navigate("/stays");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading || pageLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 pt-28 pb-20 text-center text-orange-600">
          Loading your profile...
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 pt-24 pb-20">
        {/* Header */}
        <div className="mb-10 p-6 rounded-2xl bg-gradient-to-r from-orange-500 via-red-500 to-yellow-400 shadow-lg text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-1">
            Your Surfer Profile
          </h1>
          <p className="text-sm md:text-base opacity-90">
            Hosts will see this when you send a stay request. Be honest and friendly!
          </p>
        </div>

        {/* Alerts */}
        {errorMessage && (
          <div className="mb-4 bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded-lg">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="mb-4 bg-green-100 border border-green-300 text-green-700 px-4 py-2 rounded-lg">
            {successMessage}
          </div>
        )}

        {/* Form card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Full Name *
              </label>
              <input
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="How you’d like hosts to address you"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                About You *
              </label>
              <textarea
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
                rows={4}
                required
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Share a little about your personality, travel style, and why you love meeting people."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Hometown
                </label>
                <input
                  className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
                  value={hometown}
                  onChange={(e) => setHometown(e.target.value)}
                  placeholder="Where are you from?"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Languages you speak (comma separated)
              </label>
              <input
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
                value={languagesInput}
                onChange={(e) => setLanguagesInput(e.target.value)}
                placeholder="English, Hindi, Odia…"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Interests (comma separated)
              </label>
              <input
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
                value={interestsInput}
                onChange={(e) => setInterestsInput(e.target.value)}
                placeholder="Travel, local food, photography…"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-3 pt-3">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 inline-flex items-center justify-center rounded-lg bg-orange-600 text-white font-semibold py-2.5 text-sm hover:bg-orange-700 disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Profile"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/stays")}
                className="flex-1 inline-flex items-center justify-center rounded-lg border border-gray-300 text-gray-700 font-semibold py-2.5 text-sm hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SurferProfile;
