
import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { secureClient } from "@/utils/api";
import { Session } from "@/utils/api/types";

export function useUserSessions(userId: string | undefined) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    if (!userId) return;
    
    async function loadSessions() {
      setLoading(true);
      try {
        const { data, error } = await secureClient.get<Session[]>(
          {
            table: "user_sessions",
            filters: [{ column: "user_id", operator: "eq", value: userId }],
            order: { column: "last_active", ascending: false }
          }
        );

        if (error) throw error;
        
        if (data && Array.isArray(data)) {
          setSessions(data);
        }
      } catch (error: any) {
        toast({
          title: "Feil ved lasting av økter",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    loadSessions();
  }, [userId, toast]);

  return {
    sessions,
    setSessions,
    loading
  };
}
