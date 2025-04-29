
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/hooks/useAuth";
import { Shield, Loader2 } from "lucide-react";
import { PrivacySettingsCard } from "@/components/security/PrivacySettingsCard";
import { ActiveSessionsCard } from "@/components/security/ActiveSessionsCard";
import { SecurityCard } from "@/components/security/SecurityCard";
import { usePrivacySettings } from "@/hooks/security/usePrivacySettings";
import { useUserSessions } from "@/hooks/security/useUserSessions";

export default function SecuritySettings() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [pageLoading, setPageLoading] = useState(false);
  
  // Custom hooks for data fetching
  const { 
    privacySettings, 
    setPrivacySettings, 
    loading: loadingSettings 
  } = usePrivacySettings(user?.id);
  
  const { 
    sessions, 
    setSessions, 
    loading: loadingSessions 
  } = useUserSessions(user?.id);

  // Check if user is authenticated
  useState(() => {
    if (!user) {
      navigate("/auth");
    }
  });

  const isLoading = pageLoading || loadingSettings || loadingSessions;

  if (isLoading) {
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
          <PrivacySettingsCard 
            privacySettings={privacySettings} 
            setPrivacySettings={setPrivacySettings} 
          />

          <ActiveSessionsCard 
            sessions={sessions} 
            setSessions={setSessions} 
            loadingSessions={loadingSessions} 
          />

          <SecurityCard userId={user?.id} />
        </div>
      </div>
    </Layout>
  );
}
