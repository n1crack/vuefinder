export default function datetimestring(timestamp: number, locale: string | null = null): string {
  return new Date(timestamp * 1000).toLocaleString(locale ?? navigator.language ?? 'en-US');
}
