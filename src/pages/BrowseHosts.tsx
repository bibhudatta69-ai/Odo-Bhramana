import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface Host {
  id: string;
  name: string | null;
  address: string | null;
  phone_number: string | null;
  offerings: string | null;
  work_description: string | null;
  interests: string[] | null;
  photo_url?: string | null;
}

const BrowseHosts = () => {
  const [hosts, setHosts] = useState<Host[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("stays_hosts")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setHosts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchHosts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-orange-600">Browse Hosts</h2>

      {loading && <p>Loading hosts...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hosts.map((host) => (
          <div
            key={host.id}
            className="rounded-xl border shadow-sm p-4 bg-white"
          >
            <h3 className="text-xl font-bold text-orange-600">
              {host.name || "Friendly Host"}
            </h3>

            <p className="text-gray-700">{host.address}</p>
            <p className="text-gray-700">📞 {host.phone_number}</p>

            <p className="mt-2">
              <span className="font-semibold text-blue-600">Offerings:</span>{" "}
              {host.offerings}
            </p>

            <p>
              <span className="font-semibold text-green-600">About:</span>{" "}
              {host.work_description}
            </p>

            {host.interests && (
              <p className="mt-2 text-sm bg-orange-100 px-3 py-1 rounded-md inline-block">
                {JSON.stringify(host.interests)}
              </p>
            )}

            <Link to={`/stays/host/${host.id}`}>
              <button className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg">
                View Full Profile
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseHosts;
