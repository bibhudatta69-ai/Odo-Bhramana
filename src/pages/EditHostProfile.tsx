import { useEffect, useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface HostRow {
  id: string;
  address: string;
  phone_number: string;
  interests: string[] | null;
  offerings: string | null;
  work_description: string | null;
}

interface HostFormState {
  address: string;
  phone_number: string;
  interestsText: string;
  offerings: string;
  work_description: string;
}

const EditHostProfile = () => {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [host, setHost] = useState<HostRow | null>(null);
  const [form, setForm] = useState<HostFormState>({
    address: "",
    phone_number: "",
    interestsText: "",
    offerings: "",
    work_description: "",
  });

  const [saving, setSaving] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login", { replace: true });
    }
  }, [loading, user, navigate]);

  useEffect(() => {
    if (!user) return;

    const fetchHost = async () => {
      const { data, error } = await supabase
        .from("stays_hosts")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error && error.code !== "PGRST116") {
        console.error("Error fetching host:", error.message);
        toast({
          title: "Error",
          description: "Could not load host profile.",
          variant: "destructive",
        });
      }

      if (!data) {
        toast({
          title: "No host profile found",
          description: "Create a host profile first from the Stays page.",
        });
        navigate("/stays");
        return;
      }

      const hostRow = data as HostRow;
      setHost(hostRow);
      setForm({
        address: hostRow.address,
        phone_number: hostRow.phone_number,
        offerings: hostRow.offerings || "",
        work_description: hostRow.work_description || "",
        interestsText: (hostRow.interests || []).join(", "),
      });

      setInitialLoading(false);
    };

    fetchHost();
  }, [user, navigate, toast]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!host) return;

    setSaving(true);

    const interestsArray =
      form.interestsText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean) || null;

    try {
      const { error } = await supabase
        .from("stays_hosts")
        .update({
          address: form.address,
          phone_number: form.phone_number,
          offerings: form.offerings || null,
          work_description: form.work_description || null,
          interests: interestsArray,
        })
        .eq("id", host.id);

      if (error) throw error;

      toast({
        title: "Host profile updated",
        description: "Your hosting details have been saved.",
      });

      navigate("/stays");
    } catch (err: any) {
      console.error(err);
      toast({
        title: "Error updating host profile",
        description: err.message || "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 pb-16 flex items-center justify-center">
          <p className="text-muted-foreground">Loading host profile...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!host) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 pb-16">
        <div className="container mx-auto max-w-3xl px-4">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Edit Host Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone_number">Phone Number *</Label>
                    <Input
                      id="phone_number"
                      name="phone_number"
                      value={form.phone_number}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="offerings">Offerings</Label>
                  <Textarea
                    id="offerings"
                    name="offerings"
                    value={form.offerings}
                    onChange={handleChange}
                    placeholder="e.g. Couch, room, local guide, home food..."
                  />
                </div>

                <div>
                  <Label htmlFor="work_description">About You</Label>
                  <Textarea
                    id="work_description"
                    name="work_description"
                    value={form.work_description}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label htmlFor="interestsText">
                    Interests (comma separated)
                  </Label>
                  <Input
                    id="interestsText"
                    name="interestsText"
                    value={form.interestsText}
                    onChange={handleChange}
                    placeholder="travel, photography, music..."
                  />
                </div>

                <div className="flex gap-3">
                  <Button type="submit" disabled={saving}>
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/stays")}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EditHostProfile;
