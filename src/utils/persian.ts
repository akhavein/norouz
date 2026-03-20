const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

export function toPersianNumerals(n: number, padded: boolean = false): string {
  const str = padded ? n.toString().padStart(2, '0') : n.toString();
  return str.split('').map(d => persianDigits[parseInt(d)] ?? d).join('');
}
