
import { Layout } from "@/components/Layout";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { log } from "@/utils/logger";
import { toast } from "sonner";

// Define the form schema with validation
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Navn må være minst 2 tegn.",
  }),
  email: z.string().email({
    message: "Vennligst oppgi en gyldig e-postadresse.",
  }),
  feedback: z.string().min(10, {
    message: "Tilbakemeldingen må være minst 10 tegn.",
  }),
});

type ContactFormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with react-hook-form and zod validation
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      feedback: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      // In a real-world scenario, this would send an email via a backend API
      // For now, simulating an API call and success
      log("Form data being sent:", data);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      toast.success("Takk for din tilbakemelding! Vi tar kontakt snart.");
      
      // Reset form
      form.reset();
      
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Det oppstod en feil ved sending av skjema. Vennligst prøv igjen senere.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Kontakt Oss</h1>
          
          <p className="mb-8 text-gray-600">
            Har du spørsmål, tilbakemeldinger eller forslag til forbedringer? 
            Vi setter pris på å høre fra deg! Fyll ut skjemaet under, så tar vi kontakt så snart som mulig.
          </p>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Navn</FormLabel>
                      <FormControl>
                        <Input placeholder="Ditt navn" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-post</FormLabel>
                      <FormControl>
                        <Input placeholder="din.epost@eksempel.no" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="feedback"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tilbakemelding</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Skriv din tilbakemelding her..." 
                          className="min-h-[150px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sender..." : "Send tilbakemelding"}
                </Button>
              </form>
            </Form>
          </div>
          
          <div className="mt-8 text-center text-gray-600 text-sm">
            <p>Vi besvarer normalt alle henvendelser innen 2-3 virkedager.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
