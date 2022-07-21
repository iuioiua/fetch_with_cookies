import { type Cookie } from "./deps.ts";

const SET_COOKIE_SEP = /(?<!Expires=(Mon|Tue|Wed|Thu|Fri|Sat|Sun)), /g;

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

export function getSetCookies(headers: Headers): Cookie[] {
  return headers.get("Set-Cookie")!
    .split(SET_COOKIE_SEP)
    .filter(Boolean)
    .map(getSetCookie) ?? [];
}
