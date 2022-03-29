export function addTrailingSlash (s: string): string {
  return s[s.length - 1] === '/' ? s : s + '/'
}

export function removeTrailingSlash (s: string): string {
  return s[s.length - 1] === '/' ? s.slice(0, s.length - 1) : s
}