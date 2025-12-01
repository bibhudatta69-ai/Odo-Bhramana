import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type Host = {
  id: string;
  address: string;
  phone_number: string;
  offerings: string | null;
  work_description: string | null;
  interests: string[] | null;
};

const BrowseHosts = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const [hosts, setHosts] = useState<Host[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedHost, setSelectedHost] = useState<Host | null>(null);
  const [sending, setSending] = useState(false);

  // ------------------------------------------------
  // LOAD HOSTS FROM SUPABASE
  // ------------------------------------------------
  useEffect(() => {
    const fetchHosts = async () => {
      const { data, error } = await supabase
        .from("stays_hosts")
        .select("id, address, phone_number, offerings, work_description, interests");

      if (error) {
        console.error("Error fetching hosts:", error.message);
        toast({
          title: "Error loading hosts",
          description: "Unable to fetch host list right now.",
          variant: "destructive",
        });
        setHosts([]);
      } else {
        setHosts((data || []) as Host[]);
      }

      setLoading(false);
    };

    fetchHosts();
  }, [toast]);

  // ------------------------------------------------
  // SEND STAY REQUEST
  // ------------------------------------------------
  const handleRequestStay = async (host: Host) => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to send a stay request.",
        variant: "destructive",
      });
      return;
    }

    const message = window.prompt(
      `Send a message to this host (optional):`
    );

    setSending(true);

    try {
      const { error } = await supabase.from("stay_requests").insert({
        host_id: host.id,
        surfer_id: user.id,
        message: message && message.trim().length > 0 ? message.trim() : null,
        status: "pending",
      });

      if (error) throw error;

      toast({
        title: "Request sent ✅",
        description: "Your stay request has been sent to the host.",
      });
    } catch (err: any) {
      console.error(err);
      toast({
        title: "Could not send request",
        description: err.message || "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  // ------------------------------------------------
  // UI
  // ------------------------------------------------
  if (loading) {
    return (
      <p className="text-sm text-muted-foreground">
        Loading hosts from Supabase...
      </p>
    );
  }

  if (!hosts.length) {
    return (
      <p className="text-sm text-muted-foreground">
        No hosts have registered yet. Once someone becomes a host, they will appear here.
      </p>
    );
  }

  return (
    <>
      <p className="text-sm text-muted-foreground mb-4">
        Browse all available hosts in Odisha. Click any host card to see more details and request a stay.
      </p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {hosts.map((host) => (
          <Card
            key={host.id}
            className="cursor-pointer hover:shadow-md transition"
            onClick={() => setSelectedHost(host)}
          >
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Host</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>
                <span className="font-semibold">📍 Address:</span> {host.address}
              </p>
              <p>
                <span className="font-semibold">📞 Phone:</span> {host.phone_number}
              </p>
              {host.offerings && (
                <p>
                  <span className="font-semibold">🏡 Offerings:</span> {host.offerings}
                </p>
              )}
              {host.interests && host.interests.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {host.interests.map((interest, idx) => (
                    <Badge key={idx} variant="outline">
                      {interest}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* DETAIL DIALOG */}
      <Dialog open={!!selectedHost} onOpenChange={() => setSelectedHost(null)}>
        <DialogContent>
          {selectedHost && (
            <>
              <DialogHeader>
                <DialogTitle>Host Details</DialogTitle>
                <DialogDescription>
                  View full information about this host and send a stay request.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-2 text-sm mt-2">
                <p>
                  <span className="font-semibold">Address:</span> {selectedHost.address}
                </p>
                <p>
                  <span className="font-semibold">Phone:</span> {selectedHost.phone_number}
                </p>

                {selectedHost.offerings && (
                  <p>
                    <span className="font-semibold">Offerings:</span>{" "}
                    {selectedHost.offerings}
                  </p>
                )}

                {selectedHost.work_description && (
                  <p>
                    <span className="font-semibold">About host:</span>{" "}
                    {selectedHost.work_description}
                  </p>
                )}

                {selectedHost.interests && selectedHost.interests.length > 0 && (
                  <div className="mt-2">
                    <span className="font-semibold">Interests:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedHost.interests.map((interest, idx) => (
                        <Badge key={idx} variant="secondary">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => setSelectedHost(null)}
                >
                  Close
                </Button>
                <Button
                  disabled={sending}
                  onClick={() => handleRequestStay(selectedHost)}
                >
                  {sending ? "Sending..." : "Request Stay"}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BrowseHosts;
