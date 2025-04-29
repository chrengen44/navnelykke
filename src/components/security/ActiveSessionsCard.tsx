
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { secureClient } from "@/utils/api";
import { Session } from "@/utils/api/types";
import { Loader2 } from "lucide-react";

interface ActiveSessionsCardProps {
  sessions: Session[];
  setSessions: React.Dispatch<React.SetStateAction<Session[]>>;
  loadingSessions: boolean;
}

export function ActiveSessionsCard({ 
  sessions, 
  setSessions, 
  loadingSessions 
}: ActiveSessionsCardProps) {
  const { toast } = useToast();
  const [terminatingSessionId, setTerminatingSessionId] = useState<string | null>(null);

  const handleSessionTermination = async (sessionId: string) => {
    setTerminatingSessionId(sessionId);
    try {
      const { success, error } = await secureClient.delete(
        "user_sessions", 
        sessionId
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

  return (
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
  );
}
