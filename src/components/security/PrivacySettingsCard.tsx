
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { secureClient } from "@/utils/api";
import { PrivacySettings } from "@/utils/api/types";
import { PrivacySettingItem } from "./PrivacySettingItem";

interface PrivacySettingsCardProps {
  privacySettings: PrivacySettings;
  setPrivacySettings: React.Dispatch<React.SetStateAction<PrivacySettings>>;
}

export function PrivacySettingsCard({ privacySettings, setPrivacySettings }: PrivacySettingsCardProps) {
  const { toast } = useToast();
  const [loadingSettings, setLoadingSettings] = useState(false);

  const updatePrivacySettings = async (key: keyof PrivacySettings, value: boolean) => {
    if (loadingSettings) return;
    setLoadingSettings(true);

    try {
      if (typeof value !== 'boolean') {
        throw new Error("Invalid input type");
      }

      const settings = { ...privacySettings, [key]: value };
      const { error } = await secureClient.update<PrivacySettings>(
        "user_privacy_settings", 
        privacySettings.user_id,
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personverninnstillinger</CardTitle>
        <CardDescription>
          Kontroller hvilken informasjon som er synlig for andre brukere
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <PrivacySettingItem 
          title="Vis e-postadresse"
          description="La andre brukere se din e-postadresse"
          settingKey="show_email"
          isChecked={privacySettings.show_email}
          isLoading={loadingSettings}
          onToggle={updatePrivacySettings}
        />
        
        <PrivacySettingItem 
          title="Vis fullt navn"
          description="Vis ditt fulle navn til andre brukere"
          settingKey="show_full_name"
          isChecked={privacySettings.show_full_name}
          isLoading={loadingSettings}
          onToggle={updatePrivacySettings}
        />
        
        <PrivacySettingItem 
          title="Offentlige favoritter"
          description="La andre se dine favoriserte navn"
          settingKey="allow_public_favorites"
          isChecked={privacySettings.allow_public_favorites}
          isLoading={loadingSettings}
          onToggle={updatePrivacySettings}
        />
      </CardContent>
    </Card>
  );
}
