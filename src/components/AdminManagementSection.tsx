import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, UserCheck, Pencil, Trash2 } from "lucide-react";

interface Host {
  id: string;
  user_id: string;
  address: string;
  phone_number: string;
  work_description: string | null;
  offerings: string | null;
  interests: string[] | null;
  profiles: {
    full_name: string | null;
    bio: string | null;
  };
}

interface Surfer {
  id: string;
  full_name: string | null;
  bio: string | null;
  hometown: string | null;
  interests: string[] | null;
  languages_spoken: string[] | null;
}

const AdminManagementSection = () => {
  const [hosts, setHosts] = useState<Host[]>([]);
  const [surfers, setSurfers] = useState<Surfer[]>([]);
  const [editingHost, setEditingHost] = useState<Host | null>(null);
  const [editingSurfer, setEditingSurfer] = useState<Surfer | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchHosts();
    fetchSurfers();
  }, []);

  const fetchHosts = async () => {
    const { data, error } = await supabase
      .from('stays_hosts')
      .select('*, profiles(full_name, bio)');
    
    if (!error && data) {
      setHosts(data as any);
    }
  };

  const fetchSurfers = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, full_name, bio, hometown, interests, languages_spoken')
      .not('bio', 'is', null);
    
    if (!error && data) {
      setSurfers(data);
    }
  };

  const handleUpdateHost = async () => {
    if (!editingHost) return;

    const { error } = await supabase
      .from('stays_hosts')
      .update({
        address: editingHost.address,
        phone_number: editingHost.phone_number,
        work_description: editingHost.work_description,
        offerings: editingHost.offerings,
        interests: editingHost.interests
      })
      .eq('id', editingHost.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update host profile.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Host profile updated successfully."
      });
      setEditingHost(null);
      fetchHosts();
    }
  };

  const handleUpdateSurfer = async () => {
    if (!editingSurfer) return;

    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: editingSurfer.full_name,
        bio: editingSurfer.bio,
        hometown: editingSurfer.hometown,
        interests: editingSurfer.interests,
        languages_spoken: editingSurfer.languages_spoken
      })
      .eq('id', editingSurfer.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update surfer profile.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Surfer profile updated successfully."
      });
      setEditingSurfer(null);
      fetchSurfers();
    }
  };

  const handleDeleteHost = async (hostId: string) => {
    if (!confirm("Are you sure you want to delete this host?")) return;

    const { error } = await supabase
      .from('stays_hosts')
      .delete()
      .eq('id', hostId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete host.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Host deleted successfully."
      });
      fetchHosts();
    }
  };

  return (
    <Tabs defaultValue="hosts" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="hosts">
          <Users className="h-4 w-4 mr-2" />
          Manage Hosts
        </TabsTrigger>
        <TabsTrigger value="surfers">
          <UserCheck className="h-4 w-4 mr-2" />
          Manage Surfers
        </TabsTrigger>
      </TabsList>

      <TabsContent value="hosts">
        <div className="space-y-4">
          {hosts.map((host) => (
            <Card key={host.id} className="hover:shadow-card transition-smooth">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{host.profiles?.full_name || "Unnamed Host"}</span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingHost(host)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteHost(host.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm space-y-2">
                  <p><strong>Address:</strong> {host.address}</p>
                  <p><strong>Phone:</strong> {host.phone_number}</p>
                  <p><strong>Work:</strong> {host.work_description || "N/A"}</p>
                  <p><strong>Offerings:</strong> {host.offerings || "N/A"}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {editingHost && (
          <Card className="mt-6 border-primary">
            <CardHeader>
              <CardTitle>Edit Host: {editingHost.profiles?.full_name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Address</Label>
                <Input
                  value={editingHost.address}
                  onChange={(e) => setEditingHost({ ...editingHost, address: e.target.value })}
                />
              </div>
              <div>
                <Label>Phone Number</Label>
                <Input
                  value={editingHost.phone_number}
                  onChange={(e) => setEditingHost({ ...editingHost, phone_number: e.target.value })}
                />
              </div>
              <div>
                <Label>Work Description</Label>
                <Textarea
                  value={editingHost.work_description || ""}
                  onChange={(e) => setEditingHost({ ...editingHost, work_description: e.target.value })}
                />
              </div>
              <div>
                <Label>Offerings</Label>
                <Textarea
                  value={editingHost.offerings || ""}
                  onChange={(e) => setEditingHost({ ...editingHost, offerings: e.target.value })}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleUpdateHost}>Save Changes</Button>
                <Button variant="outline" onClick={() => setEditingHost(null)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </TabsContent>

      <TabsContent value="surfers">
        <div className="space-y-4">
          {surfers.map((surfer) => (
            <Card key={surfer.id} className="hover:shadow-card transition-smooth">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{surfer.full_name || "Unnamed Surfer"}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingSurfer(surfer)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm space-y-2">
                  <p><strong>Bio:</strong> {surfer.bio || "N/A"}</p>
                  <p><strong>Hometown:</strong> {surfer.hometown || "N/A"}</p>
                  <p><strong>Interests:</strong> {surfer.interests?.join(", ") || "N/A"}</p>
                  <p><strong>Languages:</strong> {surfer.languages_spoken?.join(", ") || "N/A"}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {editingSurfer && (
          <Card className="mt-6 border-primary">
            <CardHeader>
              <CardTitle>Edit Surfer: {editingSurfer.full_name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Full Name</Label>
                <Input
                  value={editingSurfer.full_name || ""}
                  onChange={(e) => setEditingSurfer({ ...editingSurfer, full_name: e.target.value })}
                />
              </div>
              <div>
                <Label>Bio</Label>
                <Textarea
                  value={editingSurfer.bio || ""}
                  onChange={(e) => setEditingSurfer({ ...editingSurfer, bio: e.target.value })}
                />
              </div>
              <div>
                <Label>Hometown</Label>
                <Input
                  value={editingSurfer.hometown || ""}
                  onChange={(e) => setEditingSurfer({ ...editingSurfer, hometown: e.target.value })}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleUpdateSurfer}>Save Changes</Button>
                <Button variant="outline" onClick={() => setEditingSurfer(null)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default AdminManagementSection;
