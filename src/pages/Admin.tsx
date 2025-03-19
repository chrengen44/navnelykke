
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Layout } from "@/components/Layout";
import { AdminPanel } from "@/components/admin/AdminPanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const ADMIN_PASSWORD = "babynames2024"; // Simple password protection

const Admin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Check if user is logged in
    if (!user) {
      toast({
        title: "Unauthorized",
        description: "Du må være logget inn for å få tilgang til admin-siden.",
        variant: "destructive",
      });
      navigate("/auth");
    }
  }, [user, navigate, toast]);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      toast({
        title: "Success",
        description: "Du er nå logget inn som administrator.",
      });
    } else {
      toast({
        title: "Feil passord",
        description: "Passordet du oppga er ikke riktig.",
        variant: "destructive",
      });
    }
  };

  if (!user) return null;

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="container max-w-xl py-10">
          <Card>
            <CardHeader>
              <CardTitle>Admin Tilgang</CardTitle>
              <CardDescription>
                Skriv inn admin-passordet for å få tilgang til administrasjonspanelet.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <Input
                  type="password"
                  placeholder="Admin passord"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                />
                <Button onClick={handleLogin}>Logg inn</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-6">Administrasjonspanel</h1>
        
        <Tabs defaultValue="names">
          <TabsList className="mb-4">
            <TabsTrigger value="names">Babynavn</TabsTrigger>
            <TabsTrigger value="categories">Kategorier</TabsTrigger>
          </TabsList>
          
          <TabsContent value="names">
            <AdminPanel />
          </TabsContent>
          
          <TabsContent value="categories">
            <Card>
              <CardHeader>
                <CardTitle>Navnekategorier</CardTitle>
                <CardDescription>
                  Administrer navnekategorier. Denne funksjonen kommer snart.
                </CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Admin;
