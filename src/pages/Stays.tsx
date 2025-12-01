import { useEffect, useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// ----------------------
// Types
// ----------------------
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

type Tab = "browse" | "become" | "admin";

// ----------------------
// Component
// ----------------------
const Stays = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const [activeTab, setActiveTab] = useState<Tab>("browse");

  const [hosts, setHosts] = useState<Host[]>([]);
  const [myHost, setMyHost] = useState<Host | null>(null);

  const [pageLoading, setPageLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Create Host Form
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [workDescription, setWorkDescription] = useState("");
  const [offerings, setOfferings] = useState("");
  const [interests, setInterests] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  // Edit Host Form
  const [editName, setEditName] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editWork, setEditWork] = useState("");
  const [editOfferings, setEditOfferings] = useState("");
  const [editInterests, setEditInterests] = useState("");
  const [editPhotoFile, setEditPhotoFile] = useState<File | null>(null);

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) navigate("/login");
  }, [user, loading, navigate]);

  // Load hosts + my host
  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      setPageLoading(true);

      // Load browse hosts
      const { data: hostsData } = await supabase
        .from("stays_hosts")
        .select("*")
        .order("created_at", { ascending: false });

      if (hostsData)
        setHosts(hostsData as unknown as Host[]);

      // Load my host
      const { data: myHostData } = await supabase
        .from("stays_hosts")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      const host = (myHostData as unknown as Host) || null;
      setMyHost(host);

      if (host) {
        setEditName(host.name || "");
        setEditAddress(host.address || "");
        setEditPhone(host.phone_number || "");
        setEditWork(host.work_description || "");
        setEditOfferings(host.offerings || "");
        setEditInterests((host.interests || []).join(", "));
      }

      setPageLoading(false);
    };

    fetchData();
  }, [user]);

  // Notifications
  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 2500);
  };

  const showError = (msg: string) => {
    setErrorMessage(msg);
    setTimeout(() => setErrorMessage(null), 3500);
  };

  // Upload image to Supabase storage
  const uploadPhoto = async (file: File): Promise<string | null> => {
    const fileName = `${user!.id}-${Date.now()}.jpg`;

    const { data, error } = await supabase.storage
      .from("host-photos")
      .upload(fileName, file);

    if (error) {
      console.log(error);
      return null;
    }

    const { data: url } = supabase.storage
      .from("host-photos")
      .getPublicUrl(fileName);

    return url.publicUrl || null;
  };

  // Become Host
  const handleBecomeHostSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);

    let photo_url: string | null = null;

    if (photoFile) {
      photo_url = await uploadPhoto(photoFile);
    }

    const interestsArray = interests
      .split(",")
      .map((i) => i.trim())
      .filter(Boolean);

    const { data, error } = await supabase
      .from("stays_hosts")
      .insert([
        {
          user_id: user.id,
          name,
          address,
          phone_number: phone,
          work_description: workDescription,
          offerings,
          interests: interestsArray.length ? interestsArray : null,
          photo_url,
        },
      ])
      .select("*")
      .single();

    if (error) {
      showError("Could not create host.");
    } else {
      const newHost = data as unknown as Host;
      setMyHost(newHost);
      setHosts((prev) => [newHost, ...prev]);
      showSuccess("🎉 Host profile created!");
      setActiveTab("admin");
    }

    setSaving(false);
  };

  // Save edits
  const handleEditHostSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!user || !myHost) return;
    setSaving(true);

    let photo_url = myHost.photo_url;

    if (editPhotoFile) {
      photo_url = await uploadPhoto(editPhotoFile);
    }

    const interestsArray = editInterests
      .split(",")
      .map((i) => i.trim())
      .filter(Boolean);

    const { data, error } = await supabase
      .from("stays_hosts")
      .update({
        name: editName,
        address: editAddress,
        phone_number: editPhone,
        work_description: editWork,
        offerings: editOfferings,
        interests: interestsArray.length ? interestsArray : null,
        photo_url,
      })
      .eq("id", myHost.id)
      .eq("user_id", user.id)
      .select("*")
      .single();

    if (error) showError("Update failed.");
    else {
      const updatedHost = data as unknown as Host;
      setMyHost(updatedHost);
      setHosts((prev) =>
        prev.map((h) => (h.id === updatedHost.id ? updatedHost : h))
      );
      showSuccess("Changes saved.");
    }

    setSaving(false);
  };

  // Delete
  const handleDeleteHost = async () => {
    if (!user || !myHost) return;
    if (!confirm("Delete your host profile?")) return;
    setDeleting(true);

    const { error } = await supabase
      .from("stays_hosts")
      .delete()
      .eq("id", myHost.id)
      .eq("user_id", user.id);

    if (error) showError("Could not delete.");
    else {
      setMyHost(null);
      setHosts((prev) => prev.filter((h) => h.id !== myHost.id));
      showSuccess("Deleted.");
    }

    setDeleting(false);
  };

  // -------------------- UI START -----------------------

  if (loading || pageLoading)
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-xl text-orange-600">
        Loading Stays...
      </div>
    );

  return (
    <>
      <Navigation />

      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="mb-10 p-6 rounded-2xl bg-gradient-to-r from-orange-500 via-red-500 to-yellow-400 shadow-lg text-white">
          <h1 className="text-3xl font-bold tracking-wide">Stays</h1>
          <p className="text-sm opacity-90 mt-1">
            Become a host, browse warm homestays, and connect with travelers.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b mb-8">
          {(["browse", "become", "admin"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-1 font-semibold text-sm transition-all ${
                activeTab === tab
                  ? "text-orange-600 border-b-4 border-orange-600"
                  : "text-gray-600 hover:text-orange-500"
              }`}
            >
              {tab === "browse" && "Browse Hosts"}
              {tab === "become" && "Become a Host"}
              {tab === "admin" && "Host Admin"}
            </button>
          ))}
        </div>

        {/* Alerts */}
        {errorMessage && (
          <div className="mb-  
4 bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded-lg">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="mb-4 bg-green-100 border border-green-300 text-green-700 px-4 py-2 rounded-lg">
            {successMessage}
          </div>
        )}

        {/* -------------------- BROWSE HOSTS -------------------- */}
        {activeTab === "browse" && (
          <div>
            <h2 className="text-xl font-bold mb-6 text-orange-600">
              Browse Hosts
            </h2>

            {hosts.length === 0 ? (
              <p className="text-gray-500">No hosts available.</p>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {hosts.map((host) => (
                  <div
                    key={host.id}
                    className="rounded-xl bg-white border shadow-md p-5 hover:shadow-lg transition"
                  >
                    {host.photo_url && (
                      <img
                        src={host.photo_url}
                        className="w-full h-44 object-cover rounded-lg mb-3"
                      />
                    )}

                    <h3 className="text-xl font-semibold text-red-600">
                      {host.name || "Friendly Host"}
                    </h3>
                    <p className="text-gray-700 mt-1">{host.address}</p>
                    <p className="text-gray-600 mt-2">📞 {host.phone_number}</p>

                    <p className="mt-3 text-sm">
                      <span className="text-blue-600 font-semibold">
                        Offerings:
                      </span>{" "}
                      {host.offerings}
                    </p>

                    <p className="mt-1 text-sm">
                      <span className="text-green-600 font-semibold">
                        About:
                      </span>{" "}
                      {host.work_description}
                    </p>

                    {host.interests && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {host.interests.map((i, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-700"
                          >
                            {i}
                          </span>
                        ))}
                      </div>
                    )}

                    <button
  onClick={() => navigate(`/stay/host/${host.id}`)}
  className="mt-4 w-full py-2 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700"
>
  View Profile
</button>

                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* -------------------- BECOME HOST -------------------- */}
        {activeTab === "become" && (
          <div>
            <h2 className="text-xl font-bold mb-6 text-orange-600">
              Become a Host
            </h2>

            {myHost ? (
              <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-3 rounded-lg">
                You are already a host.  
                Go to{" "}
                <span
                  className="underline cursor-pointer font-semibold"
                  onClick={() => setActiveTab("admin")}
                >
                  Host Admin
                </span>
              </div>
            ) : (
              <form
                onSubmit={handleBecomeHostSubmit}
                className="bg-white shadow-lg p-6 rounded-xl grid gap-4"
              >
                {/* Photo */}
                <div>
                  <label className="font-semibold text-sm text-gray-700">
                    Upload Photo (optional)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full mt-1"
                    onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
                  />
                </div>

                {/* Inputs */}
                <input
                  placeholder="Your Name"
                  className="border rounded-md px-3 py-2"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <input
                  placeholder="Address / Location"
                  className="border rounded-md px-3 py-2"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />

                <input
                  placeholder="Phone Number"
                  className="border rounded-md px-3 py-2"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />

                <textarea
                  placeholder="About You"
                  className="border rounded-md px-3 py-2"
                  rows={3}
                  value={workDescription}
                  onChange={(e) => setWorkDescription(e.target.value)}
                />

                <textarea
                  placeholder="What You Offer"
                  className="border rounded-md px-3 py-2"
                  rows={3}
                  value={offerings}
                  onChange={(e) => setOfferings(e.target.value)}
                />

                <input
                  placeholder="Interests (comma separated)"
                  className="border rounded-md px-3 py-2"
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                />

                <button
                  type="submit"
                  disabled={saving}
                  className="mt-3 py-2 w-full rounded-lg bg-orange-600 text-white font-semibold hover:bg-orange-700"
                >
                  {saving ? "Saving..." : "Create Host Profile"}
                </button>
              </form>
            )}
          </div>
        )}

        {/* -------------------- HOST ADMIN -------------------- */}
        {activeTab === "admin" && (
          <div>
            <h2 className="text-xl font-bold mb-6 text-orange-600">
              Host Admin
            </h2>

            {!myHost ? (
              <div className="bg-blue-100 border border-blue-300 text-blue-800 px-4 py-3 rounded-lg">
                You are not a host yet.  
                Go to{" "}
                <span
                  className="underline cursor-pointer font-semibold"
                  onClick={() => setActiveTab("become")}
                >
                  Become a Host
                </span>
              </div>
            ) : (
              <form
                onSubmit={handleEditHostSave}
                className="bg-white border shadow-lg p-6 rounded-xl grid gap-4"
              >
                {/* Photo */}
                <div>
                  <label className="font-semibold text-sm text-gray-700">
                    Change Photo (optional)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full"
                    onChange={(e) =>
                      setEditPhotoFile(e.target.files?.[0] || null)
                    }
                  />
                </div>

                <input
                  placeholder="Name"
                  className="border rounded-md px-3 py-2"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />

                <input
                  placeholder="Address"
                  className="border rounded-md px-3 py-2"
                  value={editAddress}
                  onChange={(e) => setEditAddress(e.target.value)}
                />

                <input
                  placeholder="Phone"
                  className="border rounded-md px-3 py-2"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                />

                <textarea
                  placeholder="About You"
                  className="border rounded-md px-3 py-2"
                  value={editWork}
                  rows={3}
                  onChange={(e) => setEditWork(e.target.value)}
                />

                <textarea
                  placeholder="What You Offer"
                  className="border rounded-md px-3 py-2"
                  value={editOfferings}
                  rows={3}
                  onChange={(e) => setEditOfferings(e.target.value)}
                />

                <input
                  placeholder="Interests (comma separated)"
                  className="border rounded-md px-3 py-2"
                  value={editInterests}
                  onChange={(e) => setEditInterests(e.target.value)}
                />

                <div className="flex gap-3 mt-3">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700"
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>

                  <button
                    type="button"
                    disabled={deleting}
                    onClick={handleDeleteHost}
                    className="flex-1 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700"
                  >
                    {deleting ? "Deleting..." : "Delete Profile"}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Stays;
