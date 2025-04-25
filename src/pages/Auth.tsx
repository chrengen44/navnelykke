
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Mail, KeyRound, Loader2, AlertTriangle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import DOMPurify from "dompurify";

// Form validation schemas with stronger requirements
const loginSchema = z.object({
  email: z.string()
    .email("Vennligst oppgi en gyldig e-postadresse")
    .trim()
    .toLowerCase(),
  password: z.string()
    .min(8, "Passord må være minst 8 tegn")
    .max(100, "Passord kan ikke overstige 100 tegn")
});

const registerSchema = z.object({
  email: z.string()
    .email("Vennligst oppgi en gyldig e-postadresse")
    .trim()
    .toLowerCase(),
  password: z.string()
    .min(8, "Passord må være minst 8 tegn")
    .max(100, "Passord kan ikke overstige 100 tegn")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
      "Passord må inneholde minst én stor bokstav, én liten bokstav, ett tall og ett spesialtegn")
});

const resetSchema = z.object({
  email: z.string()
    .email("Vennligst oppgi en gyldig e-postadresse")
    .trim()
    .toLowerCase()
});

// Basic password strength indicator
const PasswordStrengthIndicator = ({ password }: { password: string }) => {
  // Check password strength
  const getStrength = () => {
    let score = 0;
    
    if (!password) return { score: 0, label: "Ingen passord", color: "bg-gray-200" };
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    const strengthMap = [
      { score: 0, label: "Meget svakt", color: "bg-red-500" },
      { score: 1, label: "Svakt", color: "bg-red-400" },
      { score: 2, label: "Middels", color: "bg-yellow-400" },
      { score: 3, label: "Bra", color: "bg-yellow-300" },
      { score: 4, label: "Sterkt", color: "bg-green-400" },
      { score: 5, label: "Veldig sterkt", color: "bg-green-500" },
      { score: 6, label: "Ekstremt sterkt", color: "bg-green-600" }
    ];
    
    return strengthMap[score];
  };
  
  const strength = getStrength();
  
  return (
    <div className="mt-2 space-y-1">
      <div className="text-xs flex justify-between">
        <span>Passordstyrke:</span>
        <span className="font-medium">{strength.label}</span>
      </div>
      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full ${strength.color} transition-all duration-300`} 
          style={{ width: `${(strength.score / 6) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

const Auth = () => {
  const { action } = useParams();
  const [activeTab, setActiveTab] = useState(action === "register" ? "signup" : "login");
  const [resetSent, setResetSent] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn, signUp, resetPassword } = useAuth();

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

  // Sanitize inputs before submission
  const sanitizeInput = (input: string): string => {
    return DOMPurify.sanitize(input.trim());
  };

  const handleSignUp = async (values: z.infer<typeof registerSchema>) => {
    setRegisterLoading(true);
    
    try {
      const sanitizedEmail = sanitizeInput(values.email);
      
      const { error, success } = await signUp(sanitizedEmail, values.password);
      
      if (error) throw error;
      
      if (success) {
        toast({
          title: "Registrering vellykket!",
          description: "Sjekk e-posten din for bekreftelseslink.",
        });

        // Clear form
        registerForm.reset();
      }
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
      const sanitizedEmail = sanitizeInput(values.email);
      
      const { error, success } = await signIn(sanitizedEmail, values.password);
      
      if (error) {
        setAttempts(prev => prev + 1);
        throw error;
      }
      
      if (success) {
        toast({
          title: "Innlogging vellykket!",
          description: "Du er nå logget inn.",
        });
        
        navigate("/");
      }
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
      const sanitizedEmail = sanitizeInput(values.email);
      
      const { error, success } = await resetPassword(sanitizedEmail);
      
      if (error) throw error;
      
      if (success) {
        setResetSent(true);
        toast({
          title: "Tilbakestilling av passord",
          description: "Vi har sendt deg en e-post med instruksjoner for å tilbakestille passordet ditt.",
        });
      }
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

  // Safety feature: show CAPTCHA-like delay after multiple failed attempts
  useEffect(() => {
    const attemptThreshold = 3;
    if (attempts >= attemptThreshold) {
      const timer = setTimeout(() => {
        setAttempts(0);
      }, 30000); // 30 second cooldown
      
      return () => clearTimeout(timer);
    }
  }, [attempts]);

  // Display warning for too many failed attempts
  const showLoginDelay = attempts >= 3;

  return (
    <Layout>
      <div className="container max-w-md mx-auto py-12 px-4">
        <Card className="shadow-lg border-t-4 border-t-primary">
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
                      {showLoginDelay && (
                        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md flex items-start space-x-2 mb-4">
                          <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                          <div className="text-sm text-yellow-700">
                            For mange innloggingsforsøk. Vennligst vent litt før du prøver igjen.
                          </div>
                        </div>
                      )}
                      
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
                                  autoComplete="email"
                                  disabled={showLoginDelay || loginLoading}
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
                                  type={passwordVisible ? "text" : "password"}
                                  placeholder="••••••••" 
                                  className="pl-10 pr-10"
                                  autoComplete="current-password"
                                  disabled={showLoginDelay || loginLoading}
                                  {...field} 
                                />
                                <button 
                                  type="button"
                                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                                  onClick={() => setPasswordVisible(!passwordVisible)}
                                >
                                  {passwordVisible ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                                      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                                      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                                      <line x1="2" x2="22" y1="2" y2="22" />
                                    </svg>
                                  ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                      <circle cx="12" cy="12" r="3" />
                                    </svg>
                                  )}
                                </button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={loginLoading || showLoginDelay}
                      >
                        {loginLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Logger inn...
                          </>
                        ) : showLoginDelay ? (
                          "Vennligst vent..."
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
                                  autoComplete="email"
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
                                  type={passwordVisible ? "text" : "password"}
                                  placeholder="••••••••" 
                                  className="pl-10 pr-10"
                                  autoComplete="new-password"
                                  {...field} 
                                />
                                <button 
                                  type="button"
                                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                                  onClick={() => setPasswordVisible(!passwordVisible)}
                                >
                                  {passwordVisible ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                                      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                                      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                                      <line x1="2" x2="22" y1="2" y2="22" />
                                    </svg>
                                  ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                      <circle cx="12" cy="12" r="3" />
                                    </svg>
                                  )}
                                </button>
                              </div>
                            </FormControl>
                            <PasswordStrengthIndicator password={registerForm.watch('password')} />
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
                                    autoComplete="email"
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
