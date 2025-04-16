
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Mail, KeyRound, Loader2 } from "lucide-react";

// Form validation schemas
const loginSchema = z.object({
  email: z.string().email("Vennligst oppgi en gyldig e-postadresse"),
  password: z.string().min(6, "Passord må være minst 6 tegn")
});

const registerSchema = z.object({
  email: z.string().email("Vennligst oppgi en gyldig e-postadresse"),
  password: z.string().min(6, "Passord må være minst 6 tegn")
});

const resetSchema = z.object({
  email: z.string().email("Vennligst oppgi en gyldig e-postadresse")
});

const Auth = () => {
  const { action } = useParams();
  const [activeTab, setActiveTab] = useState(action === "register" ? "signup" : "login");
  const [resetSent, setResetSent] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Initialize forms
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const resetForm = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: ""
    }
  });

  // Track loading states
  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  // Update active tab based on URL parameter
  useEffect(() => {
    if (action === "register") {
      setActiveTab("signup");
    } else if (action === "reset") {
      setActiveTab("reset");
    } else {
      setActiveTab("login");
    }
  }, [action]);

  // Update URL when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === "signup") {
      navigate("/auth/register");
    } else if (value === "reset") {
      navigate("/auth/reset");
    } else {
      navigate("/auth/login");
    }
  };

  const handleSignUp = async (values: z.infer<typeof registerSchema>) => {
    setRegisterLoading(true);
    
    try {
      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });
      
      if (error) throw error;
      
      toast({
        title: "Registrering vellykket!",
        description: "Sjekk e-posten din for bekreftelseslink.",
      });

      // Clear form
      registerForm.reset();
    } catch (error: any) {
      toast({
        title: "Registrering mislyktes",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setRegisterLoading(false);
    }
  };

  const handleSignIn = async (values: z.infer<typeof loginSchema>) => {
    setLoginLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      
      if (error) throw error;
      
      toast({
        title: "Innlogging vellykket!",
        description: "Du er nå logget inn.",
      });
      
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Innlogging mislyktes",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoginLoading(false);
    }
  };

  const handleResetPassword = async (values: z.infer<typeof resetSchema>) => {
    setResetLoading(true);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
        redirectTo: `${window.location.origin}/auth/login`,
      });
      
      if (error) throw error;
      
      setResetSent(true);
      toast({
        title: "Tilbakestilling av passord",
        description: "Vi har sendt deg en e-post med instruksjoner for å tilbakestille passordet ditt.",
      });
    } catch (error: any) {
      toast({
        title: "Kunne ikke tilbakestille passord",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container max-w-md mx-auto py-12 px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Konto</CardTitle>
            <CardDescription className="text-center">
              {activeTab === "login" && "Logg inn for å få tilgang til din konto"}
              {activeTab === "signup" && "Opprett en ny konto"}
              {activeTab === "reset" && "Tilbakestill ditt passord"}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {activeTab !== "reset" ? (
              <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Logg inn</TabsTrigger>
                  <TabsTrigger value="signup">Registrer</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login">
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(handleSignIn)} className="space-y-4">
                      <FormField
                        control={loginForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>E-post</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input 
                                  placeholder="din@epost.no" 
                                  className="pl-10"
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Passord</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input 
                                  type="password" 
                                  placeholder="••••••••" 
                                  className="pl-10"
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" className="w-full" disabled={loginLoading}>
                        {loginLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Logger inn...
                          </>
                        ) : "Logg inn"}
                      </Button>
                      
                      <div className="text-center">
                        <Button 
                          variant="link" 
                          type="button" 
                          className="text-sm text-muted-foreground"
                          onClick={() => handleTabChange("reset")}
                        >
                          Glemt passord?
                        </Button>
                      </div>
                    </form>
                  </Form>
                </TabsContent>
                
                <TabsContent value="signup">
                  <Form {...registerForm}>
                    <form onSubmit={registerForm.handleSubmit(handleSignUp)} className="space-y-4">
                      <FormField
                        control={registerForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>E-post</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input 
                                  placeholder="din@epost.no" 
                                  className="pl-10"
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={registerForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Passord</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input 
                                  type="password" 
                                  placeholder="••••••••" 
                                  className="pl-10"
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" className="w-full" disabled={registerLoading}>
                        {registerLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Registrerer...
                          </>
                        ) : "Registrer"}
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
              </Tabs>
            ) : (
              <>
                {!resetSent ? (
                  <>
                    <div className="mb-6">
                      <Button 
                        variant="ghost" 
                        onClick={() => handleTabChange("login")}
                        className="p-0 mb-4"
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Tilbake til innlogging
                      </Button>
                      <h2 className="text-xl font-semibold">Tilbakestill passord</h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        Oppgi e-postadressen din, så sender vi deg en link for å tilbakestille passordet.
                      </p>
                    </div>

                    <Form {...resetForm}>
                      <form onSubmit={resetForm.handleSubmit(handleResetPassword)} className="space-y-4">
                        <FormField
                          control={resetForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>E-post</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                  <Input 
                                    placeholder="din@epost.no" 
                                    className="pl-10"
                                    {...field} 
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button type="submit" className="w-full" disabled={resetLoading}>
                          {resetLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Sender...
                            </>
                          ) : "Send tilbakestillingslink"}
                        </Button>
                      </form>
                    </Form>
                  </>
                ) : (
                  <div className="text-center py-6">
                    <Mail className="mx-auto h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Sjekk e-posten din</h3>
                    <p className="text-muted-foreground mb-6">
                      Vi har sendt instruksjoner for å tilbakestille passordet til din e-post.
                    </p>
                    <Button onClick={() => handleTabChange("login")} variant="outline">
                      Tilbake til innlogging
                    </Button>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Auth;
