import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Mail, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useLocation } from "wouter";
import { otpSchema, type OTPForm } from "@shared/schema";
import { AuthService } from "@/lib/auth";
import { SessionManager } from "@/lib/session";
import { useToast } from "@/hooks/use-toast";

export default function OTPVerification() {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [maskedCredential, setMaskedCredential] = useState("");
  const { toast } = useToast();

  const form = useForm<OTPForm>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  useEffect(() => {
    const stored = sessionStorage.getItem('masked-credential');
    const credential = sessionStorage.getItem('login-credential');
    
    if (!stored || !credential) {
      setLocation("/login");
      return;
    }
    
    setMaskedCredential(stored);
  }, [setLocation]);

  const onSubmit = async (data: OTPForm) => {
    setIsLoading(true);
    
    try {
      const result = await AuthService.verifyOTP(data.otp);
      
      if (result.success) {
        // Create and save session
        const sessionData = SessionManager.createSession();
        SessionManager.saveSession(sessionData);
        
        // Clean up temporary storage
        sessionStorage.removeItem('login-credential');
        sessionStorage.removeItem('masked-credential');
        
        toast({
          title: "Login Successful",
          description: "Welcome to your healthcare provider dashboard",
        });
        
        setLocation("/dashboard");
      } else {
        toast({
          title: "Invalid OTP",
          description: "Please use 123456 for demo.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to verify OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full space-y-6 fade-in">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
          <Mail className="w-6 h-6 text-secondary" />
        </div>
        <h2 className="text-2xl font-semibold">Verify OTP</h2>
        <p className="text-muted-foreground">
          We've sent a verification code to <span data-testid="text-masked-credential">{maskedCredential}</span>
        </p>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter 6-digit OTP</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="123456"
                        className="text-center font-mono text-lg tracking-widest"
                        maxLength={6}
                        data-testid="input-otp"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '').substring(0, 6);
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
                disabled={isLoading}
                data-testid="button-verify-otp"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify OTP"
                )}
              </Button>
            </form>
          </Form>
          
          <Link href="/login">
            <Button variant="ghost" className="w-full" data-testid="button-back-login">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Login
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
