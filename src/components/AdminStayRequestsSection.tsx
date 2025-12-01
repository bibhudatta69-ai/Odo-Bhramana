import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { format } from "date-fns";

interface StayRequest {
  id: string;
  host_id: string;
  surfer_id: string;
  message: string | null;
  status: string | null;
  created_at: string;
  host_profile?: {
    full_name: string | null;
  };
  surfer_profile?: {
    full_name: string | null;
  };
}

const AdminStayRequestsSection = () => {
  const [requests, setRequests] = useState<StayRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('stay_requests')
        .select(`
          *,
          host_profile:stays_hosts!stay_requests_host_id_fkey(profiles(full_name)),
          surfer_profile:surfer_id(full_name)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Flatten the nested structure
      const formattedData = data?.map(req => ({
        ...req,
        host_profile: req.host_profile?.[0]?.profiles,
        surfer_profile: req.surfer_profile
      }));
      
      setRequests(formattedData as any || []);
    } catch (error) {
      console.error('Error fetching stay requests:', error);
      toast({
        title: "Error",
        description: "Failed to load stay requests.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string | null) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading stay requests...</div>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">All Stay Requests ({requests.length})</h3>
      
      {requests.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            No stay requests yet.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {requests.map((request) => (
            <Card key={request.id} className="hover:shadow-card transition-smooth">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base">
                      Surfer: {request.surfer_profile?.full_name || 'Unknown'}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Host: {request.host_profile?.full_name || 'Unknown'}
                    </p>
                  </div>
                  {getStatusBadge(request.status)}
                </div>
              </CardHeader>
              <CardContent>
                {request.message && (
                  <p className="text-sm mb-2 italic">"{request.message}"</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Requested on {format(new Date(request.created_at), 'PPp')}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminStayRequestsSection;
