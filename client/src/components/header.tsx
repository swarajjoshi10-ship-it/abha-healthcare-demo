import { Heart, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SessionManager, SessionData } from "@/lib/session";

interface HeaderProps {
  session: SessionData | null;
  onLogout: () => void;
}

export function Header({ session, onLogout }: HeaderProps) {
  return (
    <header className="bg-card border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">ABHA Login Demo</h1>
              <p className="text-sm text-muted-foreground">Healthcare Provider Portal</p>
            </div>
          </div>
          {session && (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground" data-testid="text-doctor-id">
                {session.doctorId}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={onLogout}
                className="text-destructive hover:text-destructive/80"
                data-testid="button-logout"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
