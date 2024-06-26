export function getInitials(fullName: string): string {
  const nameParts: string[] = fullName.trim().split(' ');

  const initials: string[] = nameParts.map(part => part.charAt(0).toUpperCase());

  return initials.join('');
}

export function rateLimitWarning(resetTime: any): string {
  const now = new Date();
  const diffMs = new Date(resetTime).getTime() - now.getTime();

  if (diffMs <= 0) {
    throw new Error('IP ban expired');
  }

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffSeconds = Math.floor((diffMs % (1000 * 60)) / 1000);

  return `Your IP has been banned for the next ${diffMinutes} minutes and ${diffSeconds} seconds!`
}