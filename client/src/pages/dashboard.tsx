import { useEffect, useState } from "react";
import { CheckCircle, User, Clock, Key, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";
import { SessionManager, SessionData } from "@/lib/session";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [sessionData, setSessionData] = useState<SessionData | null>(null);

  useEffect(() => {
    const session = SessionManager.getSession();
    
    if (!session) {
      setLocation("/");
      return;
    }
    
    setSessionData(session);
  }, [setLocation]);

  if (!sessionData) {
    return null;
  }

  return (
    <div className="max-w-2xl w-full space-y-6 fade-in">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-6 h-6 text-secondary" />
        </div>
        <h2 className="text-2xl font-semibold">Login Successful</h2>
        <p className="text-muted-foreground">Welcome to your healthcare provider dashboard</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        {/* Doctor Information Card */}
        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
              <User className="w-5 h-5 text-primary" />
            </div>
            <CardTitle className="text-sm font-medium">Doctor Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Doctor ID:</span>
              <span className="font-mono" data-testid="text-doctor-info-id">{sessionData.doctorId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status:</span>
              <span className="text-secondary font-medium">Active</span>
            </div>
          </CardContent>
        </Card>
        
        {/* Session Information Card */}
        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center mr-3">
              <Clock className="w-5 h-5 text-muted-foreground" />
            </div>
            <CardTitle className="text-sm font-medium">Session Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Login Time:</span>
              <span className="font-mono" data-testid="text-session-timestamp">{sessionData.timestamp}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">App Version:</span>
              <span className="font-mono" data-testid="text-app-version">{sessionData.appVersion}</span>
            </div>
          </CardContent>
        </Card>
        
        {/* Access Token Card */}
        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center mr-3">
              <Key className="w-5 h-5 text-secondary" />
            </div>
            <CardTitle className="text-sm font-medium">Access Token</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div>
              <span className="text-muted-foreground">Token:</span>
              <div 
                className="mt-1 p-2 bg-muted rounded border font-mono text-xs break-all"
                data-testid="text-access-token"
              >
                {sessionData.accessToken}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Consent Information Card */}
        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <CardTitle className="text-sm font-medium">Consent Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Artefact ID:</span>
              <span className="font-mono" data-testid="text-consent-artefact-id">{sessionData.consentArtefactId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status:</span>
              <span className="text-secondary font-medium">Granted</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
