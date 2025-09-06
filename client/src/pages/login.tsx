import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useLocation } from "wouter";
import { loginSchema, type LoginForm } from "@shared/schema";
import { AuthService } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      credential: "",
    },
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    
    try {
      const result = await AuthService.sendOTP(data.credential);
      
      if (result.success) {
        // Store credential info for OTP page
        sessionStorage.setItem('login-credential', data.credential);
        sessionStorage.setItem('masked-credential', result.maskedCredential);
        
        toast({
          title: "OTP Sent",
          description: `Verification code sent to ${result.maskedCredential}`,
        });
        
        setLocation("/otp");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full space-y-6 fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">Login to Your Account</h2>
        <p className="text-muted-foreground">Enter your ABHA number, phone, or email</p>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="credential"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ABHA Number / Phone / Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your ABHA number, phone, or email"
                        data-testid="input-credential"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
                data-testid="button-send-otp"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  "Send OTP"
                )}
              </Button>
            </form>
          </Form>
          
          <Link href="/">
            <Button variant="ghost" className="w-full mt-4" data-testid="button-back-home">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
