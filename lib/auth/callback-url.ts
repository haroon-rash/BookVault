/**
 * Sanitizes post-login redirect URL to prevent open-redirect attacks.
 * Only allows safe internal paths starting with /.
 */

export function getSafeCallbackUrl(url: string | null | undefined): string {
  if (!url || !url.startsWith("/") || url.startsWith("//")) {
    return "/admin";
  }

  if (url.startsWith("/admin/login")) {
    return "/admin";
  }

  return url;
}
