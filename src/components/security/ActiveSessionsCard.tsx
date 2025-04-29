
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { secureClient } from "@/utils/api";
import { Session } from "@/utils/api/types";
import { Loader2 } from "lucide-react";
import { SessionItem } from "./SessionItem";

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
            {sessions.map((session) => (
              <SessionItem
                key={session.id}
                session={session}
                isCurrentDevice={session.device_info === navigator.userAgent}
                onTerminate={handleSessionTermination}
              />
            ))}
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
