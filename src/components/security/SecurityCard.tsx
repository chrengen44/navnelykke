
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Loader2, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
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

interface SecurityCardProps {
  userId: string | undefined;
}

export function SecurityCard({ userId }: SecurityCardProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [deletingAccount, setDeletingAccount] = useState(false);

  const handlePasswordReset = async () => {
    try {
      const { data } = await supabase.auth.getUser();
      if (!data?.user?.email) {
        throw new Error("No email associated with this account");
      }

      const { error } = await supabase.auth.resetPasswordForEmail(
        data.user.email,
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

  const handleAccountDeletion = async () => {
    if (!userId) {
      toast({
        title: "Feil ved sletting",
        description: "Bruker-ID er ikke tilgjengelig",
        variant: "destructive",
      });
      return;
    }
    
    setDeletingAccount(true);
    try {
      await Promise.all([
        supabase.from("user_sessions").delete().eq("user_id", userId),
        supabase.from("user_privacy_settings").delete().eq("user_id", userId)
      ]);
      
      await supabase.auth.admin.deleteUser(userId);

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

  return (
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
  );
}
