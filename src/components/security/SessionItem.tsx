
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Session } from "@/utils/api/types";
import { Loader2 } from "lucide-react";

interface SessionItemProps {
  session: Session;
  isCurrentDevice: boolean;
  onTerminate: (sessionId: string) => Promise<void>;
}

export function SessionItem({ session, isCurrentDevice, onTerminate }: SessionItemProps) {
  const [isTerminating, setIsTerminating] = useState(false);
  
  const handleTerminate = async () => {
    setIsTerminating(true);
    await onTerminate(session.id);
    setIsTerminating(false);
  };
  
  const deviceName = getDeviceName(session.device_info);
  
  return (
    <div 
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
        onClick={handleTerminate}
        disabled={isTerminating}
      >
        {isTerminating ? (
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
}

// Helper functions
function formatDate(isoDate: string): string {
  try {
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat('no-NO', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(date);
  } catch (e) {
    return 'Ugyldig dato';
  }
}

function getDeviceName(userAgent: string | null): string {
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
}
