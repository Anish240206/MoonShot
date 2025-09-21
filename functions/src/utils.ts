
export function roundUpToStep(x: number, step = 10): number {
  return Math.ceil(x / step) * step;
}

export function monthsBetween(startISO: string, endISO: string): number {
  const s = new Date(startISO);
  const e = new Date(endISO);
  const days = Math.max(0, Math.floor((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)));
  return Math.max(1, Math.ceil(days / 30));
}
