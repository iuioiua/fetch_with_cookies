import { type Cookie } from "./deps.ts";

export function getSetCookieValues(headers: Headers): string[] {
  return [...headers.entries()]
    .filter(([key]) => key === "set-cookie")
    .map(([_, value]) => value);
}

/** @link https://httpwg.org/specs/rfc6265.html#set-cookie */
export function decomposeSetCookie(header: string): string[][] {
  return header
    .split(";")
    .map((attr) =>
      attr
        .trim()
        .split("=")
        .map((keyOrValue) => keyOrValue.trim())
    );
}

export function parseSetCookie(attrs: string[][]): Cookie {
  const cookie: Cookie = {
    name: attrs[0][0],
    value: attrs[1][1],
  };
  for (const [key, value] of attrs) {
    switch (key.toLocaleLowerCase()) {
      case "expires":
        cookie.expires = new Date(value);
        break;
      case "max-Age":
        cookie.maxAge = Number(value);
        break;
      case "domain":
        cookie.domain = value;
        break;
      case "path":
        cookie.path = value;
        break;
      case "secure":
        cookie.secure = true;
        break;
      case "httpOnly":
        cookie.httpOnly = true;
        break;
      case "samesite":
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

export function getSetCookies(headers: Headers): Cookie[] {
  return getSetCookieValues(headers)
    .map(decomposeSetCookie)
    .map(parseSetCookie) ?? [];
}
