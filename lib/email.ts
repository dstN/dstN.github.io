/**
 * Obfuscated email — assembled at runtime to prevent bot scraping.
 * The parts are split so the full address never appears in source/HTML.
 */
export function getEmail(): string {
  const parts = ["dustin", ".", "tramm", "@", "yinside", ".", "de"]
  return parts.join("")
}

export function getMailtoHref(subject?: string, body?: string): string {
  const email = getEmail()
  const params = new URLSearchParams()
  if (subject) params.set("subject", subject)
  if (body) params.set("body", body)
  const query = params.toString()
  return `mailto:${email}${query ? `?${query}` : ""}`
}
