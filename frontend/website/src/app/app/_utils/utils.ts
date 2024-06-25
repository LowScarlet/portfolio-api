export function getInitials(fullName: string): string {
  const nameParts: string[] = fullName.trim().split(' ');

  const initials: string[] = nameParts.map(part => part.charAt(0).toUpperCase());

  return initials.join('');
}