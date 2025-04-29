
import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { secureClient } from "@/utils/api";
import { PrivacySettings } from "@/utils/api/types";

export function usePrivacySettings(userId: string | undefined) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>({
    user_id: '',
    show_email: false,
    show_full_name: false,
    allow_public_favorites: false,
  });

  useEffect(() => {
    if (!userId) return;
    
    async function loadSettings() {
      setLoading(true);
      try {
        const { data, error } = await secureClient.get<PrivacySettings[]>(
          {
            table: "user_privacy_settings", 
            filters: [{ column: "user_id", operator: "eq", value: userId }]
          }
        );

        if (error) throw error;
        
        if (data && Array.isArray(data) && data.length > 0) {
          const settings = data[0];
          setPrivacySettings({
            user_id: settings.user_id,
            show_email: settings.show_email,
            show_full_name: settings.show_full_name,
            allow_public_favorites: settings.allow_public_favorites,
          });
        }
      } catch (error: any) {
        toast({
          title: "Feil ved lasting av innstillinger",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    loadSettings();
  }, [userId, toast]);

  return {
    privacySettings,
    setPrivacySettings,
    loading
  };
}
