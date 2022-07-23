import { type Cookie } from "./deps.ts";

/**
 * Returns a parsed cookie object from the `Set-Cookie` header value.
 *
 * @todo Parse prefixed `__Secure-*` and `__Host-*` cookies.
 */
function getSetCookie(value: string): Cookie {
  const attrs = value.split("; ")
    .map((attr) => attr.split("="));
  const cookie: Cookie = {
    name: attrs[0][0],
    value: attrs[0][1],
  };
  for (const [key, value] of attrs.slice(1)) {
    switch (key) {
      case "Expires":
        cookie.expires = new Date(value);
        break;
      case "Max-Age":
        cookie.maxAge = Number(value);
        break;
      case "Domain":
        cookie.domain = value;
        break;
      case "Path":
        cookie.path = value;
        break;
      case "Secure":
        cookie.secure = true;
        break;
      case "HttpOnly":
        cookie.httpOnly = true;
        break;
      case "SameSite":
        cookie.sameSite = value as Cookie["sameSite"];
        break;
      default:
        if (!Array.isArray(cookie.unparsed)) {
          cookie.unparsed = [];
        }
        cookie.unparsed.push([key, value].join("="));
    }
  }
  return cookie;
}

function getSetCookieValues(headers: Headers): string[] {
  return [...headers.entries()]
    .filter(([key]) => key === "set-cookie")
    .map(([_, value]) => value);
}

/** Returns cookie objects from `Set-Cookie` headers. */
export function getSetCookies(headers: Headers): Cookie[] {
  return getSetCookieValues(headers)
    .map(getSetCookie) ?? [];
}
