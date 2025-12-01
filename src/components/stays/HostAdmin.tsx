

import { useEffect, useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface HostRow {
  id: string;
  address: string;
  phone_number: string;
  interests: string[] | null;
  offerings: string | null;
  work_description: string | null;
}

interface ProfileRow {
  id: string;
  full_name: string | null;
  bio: string | null;
  languages_spoken: string[] | null;
}

interface StayRequestRow {
  id: string;
  host_id: string;
  surfer_id: string;
  message: string | null;
  status: string | null;
  created_at: string | null;
}

const HostAdmin = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [host, setHost] = useState<HostRow | null>(null);
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [hostRequests, setHostRequests] = useState<StayRequestRow[]>([]);
  const [surferRequests, setSurferRequests] = useState<StayRequestRow[]>([]);
  const [loading, setLoading] = useState(true);

  const [profileForm, setProfileForm] = useState({
    full_name: "",
    bio: "",
    languagesText: "",
  });

  const [savingProfile, setSavingProfile] = useState(false);

  // --------------------------------------------------------
  // LOAD ALL DASHBOARD DATA
  // --------------------------------------------------------
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const load = async () => {
      // Fetch host profile
      const { data: hostData } = await supabase
        .from("stays_hosts")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (hostData) {
        setHost(hostData as HostRow);
      }

      // Fetch surfer profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("id, full_name, bio, languages_spoken")
        .eq("id", user.id)
        .maybeSingle();

      if (profileData) {
        const p = profileData as ProfileRow;
        setProfile(p);

        setProfileForm({
          full_name: p.full_name || "",
          bio: p.bio || "",
          languagesText: (p.languages_spoken || []).join(", "),
        });
      }

      // Requests received (as HOST)
      if (hostData) {
        const { data: reqHost } = await supabase
          .from("stay_requests")
          .select("*")
          .eq("host_id", hostData.id)
          .order("created_at", { ascending: false });

        setHostRequests((reqHost || []) as StayRequestRow[]);
      }

      // Requests sent (as SURFER)
      const { data: reqSurfer } = await supabase
        .from("stay_requests")
        .select("*")
        .eq("surfer_id", user.id)
        .order("created_at", { ascending: false });

      setSurferRequests((reqSurfer || []) as StayRequestRow[]);

      setLoading(false);
    };

    load();
  }, [user]);

  // --------------------------------------------------------
  // HANDLE PROFILE EDIT
  // --------------------------------------------------------
  const handleProfileChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSavingProfile(true);

    const languagesArray =
      profileForm.languagesText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean) || null;

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: profileForm.full_name || null,
          bio: profileForm.bio || null,
          languages_spoken: languagesArray,
        })
        .eq("id", user.id);

      if (error) throw error;

      toast({
        title: "Profile updated",
        description: "Your surfer profile has been updated.",
      });
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    }

    setSavingProfile(false);
  };

  // --------------------------------------------------------
  // REQUEST STATUS UPDATE
  // --------------------------------------------------------
  const handleUpdateRequestStatus = async (
    requestId: string,
    newStatus: string
  ) => {
    try {
      const { error } = await supabase
        .from("stay_requests")
        .update({ status: newStatus })
        .eq("id", requestId);

      if (error) throw error;

      setHostRequests((prev) =>
        prev.map((r) => (r.id === requestId ? { ...r, status: newStatus } : r))
      );

      toast({
        title: "Updated",
        description: `Request marked as ${newStatus}.`,
      });
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  // --------------------------------------------------------
  // DELETE HOST PROFILE
  // --------------------------------------------------------
  const handleDeleteHostProfile = async () => {
    if (!host) return;

    const ok = window.confirm(
      "Are you sure you want to delete your host profile?"
    );
    if (!ok) return;

    try {
      const { error } = await supabase
        .from("stays_hosts")
        .delete()
        .eq("id", host.id);

      if (error) throw error;

      setHost(null);

      toast({
        title: "Deleted",
        description: "Your host profile was removed.",
      });
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  // --------------------------------------------------------
  // LOADING STATE
  // --------------------------------------------------------
  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading...</p>;
  }

  if (!user) {
    return <p className="text-sm text-muted-foreground">Login required.</p>;
  }

  // --------------------------------------------------------
  // UI
  // --------------------------------------------------------
  return (
    <div className="space-y-6">
      {/* HOST PROFILE */}
{/* HOST PROFILE */}
<Card>
  <CardHeader>
    <CardTitle>Host Profile</CardTitle>
  </CardHeader>
  <CardContent>
    {host ? (
      <>
        <p><b>Address:</b> {host.address}</p>
        <p><b>Phone:</b> {host.phone_number}</p>
        {host.offerings && <p><b>Offerings:</b> {host.offerings}</p>}
        {host.work_description && <p><b>About:</b> {host.work_description}</p>}

        {host.interests && (
          <div className="flex flex-wrap gap-2 mt-2">
            {host.interests.map((i, idx) => (
              <Badge key={idx}>{i}</Badge>
            ))}
          </div>
        )}

        <div className="flex gap-3 mt-3">
          <Button onClick={() => navigate("/edit-host-profile")}>
            Edit
          </Button>
          <Button variant="outline" onClick={handleDeleteHostProfile}>
            Delete
          </Button>
        </div>
      </>
    ) : (
      <p className="text-muted-foreground text-sm">
        You are not a host yet. Go to "Become a Host" tab.
      </p>
    )}
  </CardContent>
</Card>


      {/* SURFER PROFILE */}
      <Card>
        <CardHeader>
          <CardTitle>Surfer Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSaveProfile} className="space-y-3">
            <div>
              <Label>Full Name</Label>
              <Input
                name="full_name"
                value={profileForm.full_name}
                onChange={handleProfileChange}
              />
            </div>

            <div>
              <Label>Bio</Label>
              <Textarea
                name="bio"
                value={profileForm.bio}
                onChange={handleProfileChange}
              />
            </div>

            <div>
              <Label>Languages (comma separated)</Label>
              <Input
                name="languagesText"
                value={profileForm.languagesText}
                onChange={handleProfileChange}
              />
            </div>

            <Button type="submit" disabled={savingProfile}>
              {savingProfile ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* REQUESTS RECEIVED */}
      <Card>
        <CardHeader>
          <CardTitle>Requests Received (as Host)</CardTitle>
        </CardHeader>
        <CardContent>
          {hostRequests.length === 0 ? (
            <p className="text-sm text-muted-foreground">No requests yet.</p>
          ) : (
            hostRequests.map((r) => (
              <div key={r.id} className="border rounded-md p-3 mb-3">
                <p className="text-xs text-muted-foreground">
                  From surfer: {r.surfer_id}
                </p>

                {r.message && (
                  <p><b>Message:</b> {r.message}</p>
                )}

                <p><b>Status:</b> {r.status || "pending"}</p>

                <div className="flex gap-2 mt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      handleUpdateRequestStatus(r.id, "accepted")
                    }
                  >
                    Accept
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      handleUpdateRequestStatus(r.id, "rejected")
                    }
                  >
                    Reject
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* REQUESTS SENT */}
      <Card>
        <CardHeader>
          <CardTitle>Requests Sent (as Surfer)</CardTitle>
        </CardHeader>
        <CardContent>
          {surferRequests.length === 0 ? (
            <p className="text-sm text-muted-foreground">No requests sent.</p>
          ) : (
            surferRequests.map((r) => (
              <div key={r.id} className="border rounded-md p-3 mb-3">
                <p className="text-xs text-muted-foreground">
                  To host: {r.host_id}
                </p>

                {r.message && (
                  <p><b>Message:</b> {r.message}</p>
                )}

                <p><b>Status:</b> {r.status || "pending"}</p>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default HostAdmin;
