export interface SessionData {
  doctorId: string;
  consentArtefactId: string;
  accessToken: string;
  timestamp: string;
  appVersion: string;
}

export class SessionManager {
  private static readonly SESSION_KEY = 'abha-session';

  static saveSession(data: SessionData): void {
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(data));
  }

  static getSession(): SessionData | null {
    const savedSession = localStorage.getItem(this.SESSION_KEY);
    if (savedSession) {
      try {
        return JSON.parse(savedSession);
      } catch {
        this.clearSession();
        return null;
      }
    }
    return null;
  }

  static clearSession(): void {
    localStorage.removeItem(this.SESSION_KEY);
  }

  static isAuthenticated(): boolean {
    return this.getSession() !== null;
  }

  static createSession(): SessionData {
    const timestamp = new Date().toLocaleString('en-CA', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: false 
    }).replace(',', '');

    return {
      doctorId: 'Dr1234',
      consentArtefactId: 'consent_demo_001',
      accessToken: 'token_abc123',
      timestamp,
      appVersion: 'v1.0.0'
    };
  }
}
