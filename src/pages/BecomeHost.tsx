import { useEffect, useState, FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type HostRow = {
  id: string;
  user_id: string;
  address: string;
  phone_number: string;
  interests: string[] | null;
  offerings: string | null;
  work_description: string | null;
};

interface HostFormState {
  address: string;
  phone_number: string;
  interestsText: string;
  offerings: string;
  work_description: string;
}

const BecomeHost = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [existingHost, setExistingHost] = useState<HostRow | null>(null);
  const [form, setForm] = useState<HostFormState>({
    address: "",
    phone_number: "",
    interestsText: "",
    offerings: "",
    work_description: "",
  });

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchHost = async () => {
      const { data, error } = await supabase
        .from("stays_hosts")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error && error.code !== "PGRST116") {
        console.error("Error fetching host profile:", error.message);
        toast({
          title: "Error",
          description: "Could not load your host profile.",
          variant: "destructive",
        });
      }

      if (data) {
        setExistingHost(data as HostRow);
      }

      setLoading(false);
    };

    fetchHost();
  }, [user, toast]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);

    const interestsArray =
      form.interestsText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean) || null;

    try {
      const { data, error } = await supabase
        .from("stays_hosts")
        .insert({
          user_id: user.id,
          address: form.address,
          phone_number: form.phone_number,
          offerings: form.offerings || null,
          work_description: form.work_description || null,
          interests: interestsArray,
        })
        .select("*")
        .single();

      if (error) throw error;

      setExistingHost(data as HostRow);

      toast({
        title: "You are now a host! 🎉",
        description: "Your host profile has been created.",
      });
    } catch (err: any) {
      console.error(err);
      toast({
        title: "Error creating host profile",
        description: err.message || "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <p className="text-sm text-muted-foreground">
        Please log in to become a host.
      </p>
    );
  }

  if (loading) {
    return (
      <p className="text-sm text-muted-foreground">Loading your host data...</p>
    );
  }

  if (existingHost) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          You already have a host profile. You can edit it from the{" "}
          <span className="font-semibold">Host / Surfer Dashboard</span> tab or
          using the button below.
        </p>

        <div className="border rounded-lg p-4 space-y-2">
          <p className="text-sm">
            <span className="font-semibold">Address:</span>{" "}
            {existingHost.address}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Phone:</span>{" "}
            {existingHost.phone_number}
          </p>
          {existingHost.offerings && (
            <p className="text-sm">
              <span className="font-semibold">Offerings:</span>{" "}
              {existingHost.offerings}
            </p>
          )}
          {existingHost.work_description && (
            <p className="text-sm">
              <span className="font-semibold">Work / About:</span>{" "}
              {existingHost.work_description}
            </p>
          )}
        </div>

        <Button
          type="button"
          onClick={() => (window.location.href = "/edit-host-profile")}
        >
          Edit Host Profile
        </Button>
      </div>
    );
  }

  // No existing host → show create form
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="address">Address *</Label>
          <Input
            id="address"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
            placeholder="Your full address"
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
            placeholder="+91..."
          />
        </div>
      </div>

      <div>
        <Label htmlFor="offerings">What can you offer? (optional)</Label>
        <Textarea
          id="offerings"
          name="offerings"
          value={form.offerings}
          onChange={handleChange}
          placeholder="e.g. Couch, private room, homemade food, local guiding..."
        />
      </div>

      <div>
        <Label htmlFor="work_description">
          About you / what do you do? (optional)
        </Label>
        <Textarea
          id="work_description"
          name="work_description"
          value={form.work_description}
          onChange={handleChange}
          placeholder="Tell surfers a bit about yourself and your lifestyle."
        />
      </div>

      <div>
        <Label htmlFor="interestsText">
          Interests (comma separated, optional)
        </Label>
        <Input
          id="interestsText"
          name="interestsText"
          value={form.interestsText}
          onChange={handleChange}
          placeholder="travel, photography, music..."
        />
      </div>

      <Button type="submit" disabled={saving}>
        {saving ? "Saving..." : "Create Host Profile"}
      </Button>
    </form>
  );
};

export default BecomeHost;
