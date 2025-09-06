import { Shield, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="max-w-md w-full space-y-6 fade-in">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <Shield className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-semibold">Secure Healthcare Access</h2>
        <p className="text-muted-foreground">
          Access your healthcare provider dashboard using your ABHA credentials. 
          Secure, fast, and compliant with healthcare standards.
        </p>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <Link href="/login">
            <Button 
              className="w-full flex items-center justify-center space-x-2"
              data-testid="button-login-abha"
            >
              <LogIn className="w-5 h-5" />
              <span>Login with ABHA</span>
            </Button>
          </Link>
        </CardContent>
      </Card>

      <div className="text-center text-sm text-muted-foreground">
        <p>Demo Environment - For Testing Purposes Only</p>
      </div>
    </div>
  );
}
