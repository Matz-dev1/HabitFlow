/**
 * Walidacja adresu email
 * @param email - Adres email do walidacji
 * @returns true jeśli email jest poprawny
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Funkcja pomocnicza do walidacji emaila z komunikatem błędu
 * @param email - Adres email do walidacji
 * @returns null jeśli email jest poprawny, komunikat błędu w przeciwnym razie
 */
export function validateEmail(email: string): string | null {
  if (!email || email.trim() === '') {
    return 'Email is required';
  }
  if (!isValidEmail(email)) {
    return 'Please enter a valid email address';
  }
  return null;
}

export function getPasswordErrors(password: string): string[] {
  const errors: string[] = [];

  if (!/.{8,}/.test(password))
    errors.push('Password must be at least 8 characters long');

  if (!/\d/.test(password))
    errors.push('Password must contain at least one number');

  if (!/[!@#$%^&*(),.?\":{}|<>_\-+=]/.test(password))
    errors.push('Password must contain at least one special character');

  if (!/[A-Z]/.test(password))
    errors.push('Password must contain at least one uppercase letter');

  return errors;
}
