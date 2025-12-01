import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

type Host = {
  id: string;
  user_id: string;
  name: string | null;
  address: string | null;
  phone_number: string | null;
  work_description: string | null;
  offerings: string | null;
  interests: string[] | null;
  photo_url?: string | null;
};

const HostProfile = () => {
  const { hostId } = useParams<{ hostId: string }>();
  const navigate = useNavigate();

  const [host, setHost] = useState<Host | null>(null);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    if (!hostId) return;

    const fetchHost = async () => {
      setPageLoading(true);

      const { data, error } = await supabase
        .from("stays_hosts")
        .select("*")
        .eq("id", hostId)
        .maybeSingle();

      if (error) {
        console.error("Error loading host:", error);
      }

      if (data) {
        setHost(data as Host);
      }

      setPageLoading(false);
    };

    fetchHost();
  }, [hostId]);

  if (pageLoading)
    return (
      <>
        <Navigation />
        <div className="min-h-[70vh] flex items-center justify-center text-xl text-orange-600">
          Loading host profile...
        </div>
        <Footer />
      </>
    );

  if (!host)
    return (
      <>
        <Navigation />
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
          <h2 className="text-2xl font-bold text-red-500">Host Not Found</h2>
          <p className="mt-2 text-gray-600">This host does not exist.</p>
          <button
            onClick={() => navigate("/stays")}
            className="mt-4 px-6 py-2 bg-orange-600 text-white rounded-lg"
          >
            Go Back
          </button>
        </div>
        <Footer />
      </>
    );

  return (
    <>
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-10 p-6 rounded-2xl bg-gradient-to-r from-orange-500 via-red-500 to-yellow-400 shadow-lg text-white">
          <h1 className="text-3xl font-bold tracking-wide">
            {host.name || "Host Profile"}
          </h1>
          <p className="text-sm opacity-90 mt-1">
            Explore the details of this warm and welcoming host.
          </p>
        </div>

        {/* Content */}
        <div className="bg-white shadow-xl rounded-2xl p-6 grid gap-6">

          {/* Photo */}
          {host.photo_url && (
            <img
              src={host.photo_url}
              alt="Host"
              className="w-full h-72 object-cover rounded-xl shadow-md"
            />
          )}

          {/* Name */}
          <h2 className="text-2xl font-bold text-orange-600">
            {host.name || "Friendly Host"}
          </h2>

          {/* Address */}
          {host.address && (
            <p className="text-gray-700 text-lg">
              📍 <span className="font-semibold">Location:</span> {host.address}
            </p>
          )}

          {/* Phone */}
          {host.phone_number && (
            <p className="text-gray-700 text-lg">
              📞 <span className="font-semibold">Phone:</span> {host.phone_number}
            </p>
          )}

          {/* About */}
          {host.work_description && (
            <div>
              <h3 className="text-lg font-semibold text-green-700">About</h3>
              <p className="text-gray-700 mt-1">{host.work_description}</p>
            </div>
          )}

          {/* Offerings */}
          {host.offerings && (
            <div>
              <h3 className="text-lg font-semibold text-blue-700">Offerings</h3>
              <p className="text-gray-700 mt-1">{host.offerings}</p>
            </div>
          )}

          {/* Interests */}
          {host.interests && host.interests.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-purple-700">
                Interests
              </h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {host.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm bg-orange-100 text-orange-700 rounded-full"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => navigate(-1)}
          className="mt-8 w-full py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-lg shadow hover:opacity-90"
        >
          ← Back to Stays
        </button>
      </div>

      <Footer />
    </>
  );
};

export default HostProfile;
