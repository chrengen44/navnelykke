
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { secureClient } from "@/utils/api";
import { PrivacySettings } from "@/utils/api/types";

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
  );
}
