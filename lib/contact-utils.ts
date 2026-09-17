/**
 * Privacy and contact utility functions to protect against automated scraping.
 */

export function triggerObfuscatedMailto(
  user: string,
  domain: string,
  subject: string = "Portfolio Contact: AI Engineering",
  body?: string
) {
  if (typeof window === "undefined") return;
  const email = `${user}@${domain}`;
  let mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
  if (body) {
    mailtoUrl += `&body=${encodeURIComponent(body)}`;
  }
  window.location.href = mailtoUrl;
}

export function copyObfuscatedEmail(user: string, domain: string): Promise<boolean> {
  if (typeof window === "undefined" || !navigator.clipboard) {
    return Promise.resolve(false);
  }
  const email = `${user}@${domain}`;
  return navigator.clipboard
    .writeText(email)
    .then(() => true)
    .catch(() => false);
}