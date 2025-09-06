export class AuthService {
  static maskCredential(credential: string): string {
    if (credential.includes('@')) {
      // Email masking
      const parts = credential.split('@');
      const maskedLocal = parts[0].substring(0, 2) + '*'.repeat(Math.max(0, parts[0].length - 2));
      return maskedLocal + '@' + parts[1];
    } else if (credential.length === 14) {
      // ABHA number masking
      return '*'.repeat(10) + credential.substring(10);
    } else {
      // Phone number masking
      return '*'.repeat(Math.max(0, credential.length - 4)) + credential.substring(Math.max(0, credential.length - 4));
    }
  }

  static validateCredential(credential: string): boolean {
    const isABHA = /^\d{14}$/.test(credential);
    const isPhone = /^[+]?[\d\s\-\(\)]{10,}$/.test(credential);
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credential);
    
    return isABHA || isPhone || isEmail;
  }

  static validateOTP(otp: string): boolean {
    return otp === '123456';
  }

  static async sendOTP(credential: string): Promise<{ success: boolean; maskedCredential: string }> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      success: true,
      maskedCredential: this.maskCredential(credential)
    };
  }

  static async verifyOTP(otp: string): Promise<{ success: boolean }> {
    // Simulate verification delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      success: this.validateOTP(otp)
    };
  }
}
