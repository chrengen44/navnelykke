
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Shield, Trash2 } from "lucide-react";

interface PrivacySettings {
  show_email: boolean;
  show_full_name: boolean;
  allow_public_favorites: boolean;
}

interface Session {
  id: string;
  device_info: string | null;
  ip_address: string | null;
  last_active: string;
  created_at: string;
}

export default function SecuritySettings() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>({
    show_email: false,
    show_full_name: false,
    allow_public_favorites: false,
  });
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingAccount, setDeletingAccount] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    loadSettings();
    loadSessions();
  }, [user, navigate]);

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("user_privacy_settings")
        .select("*")
        .eq("user_id", user?.id)
        .single();

      if (error) throw error;
      if (data) setPrivacySettings(data);
    } catch (error: any) {
      toast({
        title: "Feil ved lasting av innstillinger",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const loadSessions = async () => {
    try {
      const { data, error } = await supabase
        .from("user_sessions")
        .select("*")
        .eq("user_id", user?.id)
        .order("last_active", { ascending: false });

      if (error) throw error;
      if (data) setSessions(data);
    } catch (error: any) {
      toast({
        title: "Feil ved lasting av økter",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updatePrivacySettings = async (key: keyof PrivacySettings, value: boolean) => {
    try {
      const { error } = await supabase
        .from("user_privacy_settings")
        .update({ [key]: value })
        .eq("user_id", user?.id);

      if (error) throw error;

      setPrivacySettings(prev => ({ ...prev, [key]: value }));
      toast({
        title: "Innstillinger oppdatert",
        description: "Dine personverninnstillinger har blitt oppdatert.",
      });
    } catch (error: any) {
      toast({
        title: "Feil ved oppdatering",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handlePasswordReset = async () => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(user?.email || "", {
        redirectTo: `${window.location.origin}/auth/reset`,
      });

      if (error) throw error;

      toast({
        title: "E-post sendt",
        description: "Sjekk e-posten din for instruksjoner om tilbakestilling av passord.",
      });
    } catch (error: any) {
      toast({
        title: "Feil ved tilbakestilling",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleSessionTermination = async (sessionId: string) => {
    try {
      const { error } = await supabase
        .from("user_sessions")
        .delete()
        .eq("id", sessionId);

      if (error) throw error;

      setSessions(prev => prev.filter(s => s.id !== sessionId));
      toast({
        title: "Økt avsluttet",
        description: "Økten har blitt avsluttet.",
      });
    } catch (error: any) {
      toast({
        title: "Feil ved avslutting av økt",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleAccountDeletion = async () => {
    if (!window.confirm("Er du sikker på at du vil slette kontoen din? Dette kan ikke angres.")) {
      return;
    }

    setDeletingAccount(true);
    try {
      const { error } = await supabase.auth.admin.deleteUser(user?.id || "");
      if (error) throw error;

      await supabase.auth.signOut();
      navigate("/");
      toast({
        title: "Konto slettet",
        description: "Din konto har blitt slettet.",
      });
    } catch (error: any) {
      toast({
        title: "Feil ved sletting",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setDeletingAccount(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container max-w-4xl py-8">
        <div className="flex items-center gap-2 mb-6">
          <Shield className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Sikkerhet og personvern</h1>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personverninnstillinger</CardTitle>
              <CardDescription>
                Kontroller hvilken informasjon som er synlig for andre brukere
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium">Vis e-postadresse</div>
                  <div className="text-sm text-muted-foreground">
                    La andre brukere se din e-postadresse
                  </div>
                </div>
                <Switch
                  checked={privacySettings.show_email}
                  onCheckedChange={(checked) => updatePrivacySettings("show_email", checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium">Vis fullt navn</div>
                  <div className="text-sm text-muted-foreground">
                    Vis ditt fulle navn til andre brukere
                  </div>
                </div>
                <Switch
                  checked={privacySettings.show_full_name}
                  onCheckedChange={(checked) => updatePrivacySettings("show_full_name", checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium">Offentlige favoritter</div>
                  <div className="text-sm text-muted-foreground">
                    La andre se dine favoriserte navn
                  </div>
                </div>
                <Switch
                  checked={privacySettings.allow_public_favorites}
                  onCheckedChange={(checked) => updatePrivacySettings("allow_public_favorites", checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Aktive økter</CardTitle>
              <CardDescription>
                Se og administrer dine aktive pålogginger
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">
                        {session.device_info || "Ukjent enhet"}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Sist aktiv: {new Date(session.last_active).toLocaleString()}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSessionTermination(session.id)}
                    >
                      Avslutt økt
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Passord og sikkerhet</CardTitle>
              <CardDescription>
                Administrer ditt passord og kontoinnstillinger
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="outline"
                onClick={handlePasswordReset}
              >
                Tilbakestill passord
              </Button>

              <div className="border-t pt-4">
                <h3 className="text-lg font-medium text-destructive mb-2">Faresone</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Når du sletter kontoen din, slettes all din data permanent.
                </p>
                <Button
                  variant="destructive"
                  onClick={handleAccountDeletion}
                  disabled={deletingAccount}
                >
                  {deletingAccount ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sletter konto...
                    </>
                  ) : (
                    <>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Slett konto
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
