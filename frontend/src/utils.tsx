export function addTrailingSlash (s: string) {
  return s[s.length - 1] === '/' ? s : s + '/'
}

export function removeTrailingSlash (s: string) {
  return s[s.length - 1] === '/' ? s.slice(0, s.length - 1) : s
}