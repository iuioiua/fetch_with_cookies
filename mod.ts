import { type Cookie } from "./deps.ts";

export function getSetCookie(value: string): Cookie {
  const array = value.split("; ")
    .map((part) => part.split("="));
  const cookie: Cookie = {
    name: array[0][0],
    value: array[0][1],
  };
  for (const [key, value] of array.slice(1)) {
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
        cookie.sameSite = value as "Strict" | "Lax" | "None";
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
