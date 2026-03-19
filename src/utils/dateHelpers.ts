const irstFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Tehran',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

const localFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
  timeZoneName: 'short',
});

const utcFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'UTC',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

export function formatIRST(date: Date): string {
  return irstFormatter.format(date) + ' IRST';
}

export function formatLocal(date: Date): string {
  return localFormatter.format(date);
}

export function formatUTC(date: Date): string {
  return utcFormatter.format(date) + ' UTC';
}

export function padTwo(n: number): string {
  return n.toString().padStart(2, '0');
}
