export const isValidEmailAndPassword = (email: string, password: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;
  
    return emailRegex.test(email.trim()) && passwordRegex.test(password.trim());
  };
  