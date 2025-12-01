import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AdminManagementSection from "@/components/AdminManagementSection";
import AdminFeedbackSection from "@/components/AdminFeedbackSection";
import AdminMessagesSection from "@/components/AdminMessagesSection";
import AdminStayRequestsSection from "@/components/AdminStayRequestsSection";
import AdminContentManagement from "@/components/AdminContentManagement";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { Database, Users, Image, MapPin, Utensils, CalendarDays, Heart, MessageSquare, UserCheck } from "lucide-react";

const Admin = () => {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/");
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  const adminSections = [
    {
      title: "Manage Places",
      description: "Add, edit, or remove tourist places",
      icon: MapPin,
      count: "6+ places"
    },
    {
      title: "Manage Foods",
      description: "Update Odishan cuisine database",
      icon: Utensils,
      count: "5+ dishes"
    },
    {
      title: "Manage Festivals",
      description: "Add and edit festival information",
      icon: CalendarDays,
      count: "6+ festivals"
    },
    {
      title: "Manage Tribes",
      description: "Update tribal heritage content",
      icon: Users,
      count: "3 tribes"
    },
    {
      title: "Manage Gallery",
      description: "Upload and organize photos",
      icon: Image,
      count: "Gallery"
    },
    {
      title: "View Statistics",
      description: "User engagement and saved items",
      icon: Heart,
      count: "Analytics"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-4">
              Admin Dashboard
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Manage Odo Bhraman content and settings
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminSections.map((section, idx) => {
              const Icon = section.icon;
              return (
                <Card key={idx} className="hover:shadow-card transition-smooth animate-fade-in cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-smooth">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <span className="text-sm text-muted-foreground">{section.count}</span>
                    </div>
                    <CardTitle className="text-xl">{section.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{section.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Comprehensive Admin Management Tabs */}
          <Card className="mt-12 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Admin Management Center
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="users" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="users">
                    <Users className="h-4 w-4 mr-2" />
                    Users
                  </TabsTrigger>
                  <TabsTrigger value="requests">
                    <UserCheck className="h-4 w-4 mr-2" />
                    Stay Requests
                  </TabsTrigger>
                  <TabsTrigger value="messages">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Messages
                  </TabsTrigger>
                  <TabsTrigger value="content">
                    <MapPin className="h-4 w-4 mr-2" />
                    Content
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="users" className="mt-6">
                  <AdminManagementSection />
                </TabsContent>

                <TabsContent value="requests" className="mt-6">
                  <AdminStayRequestsSection />
                </TabsContent>

                <TabsContent value="messages" className="mt-6">
                  <AdminMessagesSection />
                </TabsContent>

                <TabsContent value="content" className="mt-6">
                  <AdminContentManagement />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Feedback Section - Above Footer */}
      <div className="bg-muted/30 py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-display font-bold mb-2">Admin Feedback & Messaging</h2>
            <p className="text-muted-foreground">Submit reviews and send messages</p>
          </div>
          <AdminFeedbackSection />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Admin;