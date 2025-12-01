import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Check, X, MessageSquare, User } from "lucide-react";
import { SurferProfileDialog } from "./SurferProfileDialog";
import { MessagingDialog } from "./MessagingDialog";

export const HostRequestsSection = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [requests, setRequests] = useState<any[]>([]);
  const [hostProfile, setHostProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSurferId, setSelectedSurferId] = useState<string | null>(null);
  const [surferProfileOpen, setSurferProfileOpen] = useState(false);
  const [messagingOpen, setMessagingOpen] = useState(false);
  const [selectedSurfer, setSelectedSurfer] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    if (user) {
      fetchHostProfile();
    }
  }, [user]);

  useEffect(() => {
    if (hostProfile) {
      fetchRequests();
      subscribeToRequests();
    }
  }, [hostProfile]);

  const fetchHostProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('stays_hosts')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (!error && data) {
        setHostProfile(data);
      }
    } catch (error) {
      console.error('Error fetching host profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRequests = async () => {
    if (!hostProfile) return;

    try {
      const { data, error } = await supabase
        .from('stay_requests')
        .select('*, profiles(full_name, bio, hometown)')
        .eq('host_id', hostProfile.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setRequests(data || []);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const subscribeToRequests = () => {
    if (!hostProfile) return;

    const channel = supabase
      .channel('host_requests_realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'stay_requests',
          filter: `host_id=eq.${hostProfile.id}`,
        },
        async (payload) => {
          const { data: surferData } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('id', payload.new.surfer_id)
            .single();
          
          toast({
            title: "New Stay Request!",
            description: `${surferData?.full_name || 'Someone'} wants to stay with you.`,
          });
          
          fetchRequests();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const handleUpdateRequestStatus = async (requestId: string, status: 'approved' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('stay_requests')
        .update({ status })
        .eq('id', requestId);

      if (error) throw error;

      toast({
        title: `Request ${status}`,
        description: `You have ${status} the stay request.`,
      });

      fetchRequests();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const viewSurferProfile = (surferId: string) => {
    setSelectedSurferId(surferId);
    setSurferProfileOpen(true);
  };

  const openMessaging = (surferId: string, surferName: string) => {
    setSelectedSurfer({ id: surferId, name: surferName });
    setMessagingOpen(true);
  };

  if (!hostProfile) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            You need to become a host first to see requests.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center">Loading requests...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Incoming Stay Requests</CardTitle>
        </CardHeader>
        <CardContent>
          {requests.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No stay requests yet
            </p>
          ) : (
            <div className="space-y-4">
              {requests.map((request) => (
                <Card key={request.id}>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">
                              {request.profiles?.full_name || 'Surfer'}
                            </h4>
                            <Badge variant={
                              request.status === 'approved' ? 'default' :
                              request.status === 'rejected' ? 'destructive' :
                              'secondary'
                            }>
                              {request.status}
                            </Badge>
                          </div>
                          {request.profiles?.hometown && (
                            <p className="text-sm text-muted-foreground">
                              From: {request.profiles.hometown}
                            </p>
                          )}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => viewSurferProfile(request.surfer_id)}
                        >
                          <User className="h-4 w-4 mr-2" />
                          View Profile
                        </Button>
                      </div>

                      {request.message && (
                        <div className="bg-muted p-3 rounded-lg">
                          <p className="text-sm">{request.message}</p>
                        </div>
                      )}

                      <div className="flex gap-2">
                        {request.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleUpdateRequestStatus(request.id, 'approved')}
                              className="flex-1"
                            >
                              <Check className="h-4 w-4 mr-2" />
                              Accept
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleUpdateRequestStatus(request.id, 'rejected')}
                              className="flex-1"
                            >
                              <X className="h-4 w-4 mr-2" />
                              Decline
                            </Button>
                          </>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openMessaging(request.surfer_id, request.profiles?.full_name || 'Surfer')}
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                      </div>

                      <p className="text-xs text-muted-foreground">
                        Requested: {new Date(request.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {selectedSurferId && (
        <SurferProfileDialog
          open={surferProfileOpen}
          onOpenChange={setSurferProfileOpen}
          surferId={selectedSurferId}
        />
      )}

      {selectedSurfer && (
        <MessagingDialog
          open={messagingOpen}
          onOpenChange={setMessagingOpen}
          receiverId={selectedSurfer.id}
          receiverName={selectedSurfer.name}
        />
      )}
    </>
  );
};
