import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { secureApi, sanitizeInput } from "@/utils/apiClient";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Shield, Trash2, AlertCircle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
  const [loadingSettings, setLoadingSettings] = useState(false);
  const [loadingSessions, setLoadingSessions] = useState(false);
  const [deletingAccount, setDeletingAccount] = useState(false);
  const [terminatingSessionId, setTerminatingSessionId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    loadSettings();
    loadSessions();
  }, [user, navigate]);

  const loadSettings = async () => {
    setLoadingSettings(true);
    try {
      const { data, error } = await secureApi.fetch<PrivacySettings[]>(
        "user_privacy_settings",
        { select: "*", eq: ["user_id", user?.id] }
      );

      if (error) throw error;
      if (data && data.length > 0) setPrivacySettings(data[0]);
    } catch (error: any) {
      toast({
        title: "Feil ved lasting av innstillinger",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoadingSettings(false);
    }
  };

  const loadSessions = async () => {
    setLoadingSessions(true);
    try {
      const { data, error } = await secureApi.fetch<Session[]>(
        "user_sessions",
        {
          select: "*",
          eq: ["user_id", user?.id],
          orderBy: "last_active",
          ascending: false
        },
        "default"
      );

      if (error) throw error;
      if (data) setSessions(data);
    } catch (error: any) {
      toast({
        title: "Feil ved lasting av økter",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoadingSessions(false);
      setLoading(false);
    }
  };

  const updatePrivacySettings = async (key: keyof PrivacySettings, value: boolean) => {
    if (loadingSettings) return;
    setLoadingSettings(true);

    try {
      if (typeof value !== 'boolean') {
        throw new Error("Invalid input type");
      }

      const settings = { ...privacySettings, [key]: value };
      const { error } = await secureApi.update(
        "user_privacy_settings",
        { column: "user_id", value: user?.id },
        { [key]: value }
      );

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
    } finally {
      setLoadingSettings(false);
    }
  };

  const handlePasswordReset = async () => {
    try {
      if (!user?.email) {
        throw new Error("No email associated with this account");
      }

      const { error } = await supabase.auth.resetPasswordForEmail(
        sanitizeInput(user.email),
        { redirectTo: `${window.location.origin}/auth/reset` }
      );

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
    setTerminatingSessionId(sessionId);
    try {
      const { error } = await secureApi.delete(
        "user_sessions", 
        { column: "id", value: sessionId }
      );

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
    } finally {
      setTerminatingSessionId(null);
    }
  };

  const handleAccountDeletion = async () => {
    setDeletingAccount(true);
    try {
      if (!user?.id) {
        throw new Error("No user ID available");
      }
      
      await Promise.all([
        supabase.from("user_sessions").delete().eq("user_id", user.id),
        supabase.from("user_privacy_settings").delete().eq("user_id", user.id)
      ]);
      
      await supabase.auth.admin.deleteUser(user.id);

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

  const formatDate = (isoDate: string): string => {
    try {
      const date = new Date(isoDate);
      return new Intl.DateTimeFormat('no-NO', {
        dateStyle: 'medium',
        timeStyle: 'short'
      }).format(date);
    } catch (e) {
      return 'Ugyldig dato';
    }
  };

  const getDeviceName = (userAgent: string | null): string => {
    if (!userAgent) return 'Ukjent enhet';
    
    let deviceName = 'Annen enhet';
    
    if (userAgent.includes('iPhone') || userAgent.includes('iPad')) {
      deviceName = userAgent.includes('iPad') ? 'iPad' : 'iPhone';
    } else if (userAgent.includes('Android')) {
      deviceName = 'Android-enhet';
    } else if (userAgent.includes('Windows')) {
      deviceName = 'Windows-enhet';
    } else if (userAgent.includes('Mac')) {
      deviceName = 'Mac-enhet';
    } else if (userAgent.includes('Linux')) {
      deviceName = 'Linux-enhet';
    }
    
    if (userAgent.includes('Chrome') && !userAgent.includes('Chromium')) {
      deviceName += ' - Chrome';
    } else if (userAgent.includes('Firefox')) {
      deviceName += ' - Firefox';
    } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
      deviceName += ' - Safari';
    } else if (userAgent.includes('Edge')) {
      deviceName += ' - Edge';
    }
    
    return deviceName;
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
                  disabled={loadingSettings}
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
                  disabled={loadingSettings}
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
                  disabled={loadingSettings}
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
              {loadingSessions ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : sessions.length > 0 ? (
                <div className="space-y-4">
                  {sessions.map((session) => {
                    const deviceName = getDeviceName(session.device_info);
                    const isCurrentDevice = session.device_info === navigator.userAgent;
                    
                    return (
                      <div 
                        key={session.id} 
                        className={`flex items-center justify-between p-4 border rounded-lg ${isCurrentDevice ? 'border-primary/30 bg-primary/5' : ''}`}
                      >
                        <div>
                          <div className="font-medium flex items-center">
                            {deviceName}
                            {isCurrentDevice && (
                              <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                                Denne enheten
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Sist aktiv: {formatDate(session.last_active)}
                          </div>
                          {session.ip_address && (
                            <div className="text-xs text-muted-foreground mt-1">
                              IP: {session.ip_address}
                            </div>
                          )}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSessionTermination(session.id)}
                          disabled={terminatingSessionId === session.id}
                        >
                          {terminatingSessionId === session.id ? (
                            <>
                              <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                              Avslutter...
                            </>
                          ) : (
                            "Avslutt økt"
                          )}
                        </Button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Ingen aktive økter funnet
                </div>
              )}
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
                <h3 className="text-lg font-medium text-destructive mb-2 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-1.5" />
                  Faresone
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Når du sletter kontoen din, slettes all din data permanent. Denne handlingen kan ikke angres.
                </p>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Slett konto
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Er du helt sikker?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Denne handlingen kan ikke angres. Dette vil permanent slette din konto og fjerne alle dine data fra våre servere.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Avbryt</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        onClick={handleAccountDeletion}
                        disabled={deletingAccount}
                      >
                        {deletingAccount ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sletter...
                          </>
                        ) : "Ja, slett kontoen min"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
