import { assertEquals, type Cookie } from "./deps.ts";

import { getSetCookies } from "./mod.ts";

Deno.test({
  name: "getSetCookie",
  fn(): void {
    const cookie1String =
      "sessionId=38afes7a8; Expires=Fri, 07 Jan 1983 15:32:00 GMT; Max-Age=2592000; Domain=example.com; Path=/docs; Secure; HttpOnly; SameSite=Strict; Lulu=meowmeow";
    const cookie2String =
      "hello=world; Expires=Fri, 07 Jan 1983 15:32:00 GMT; Max-Age=2592000; Domain=example.com; Path=/docs; Secure; HttpOnly; SameSite=Strict; Lulu=meowmeow";
    const cookie1Parsed: Cookie = {
      name: "sessionId",
      value: "38afes7a8",
      expires: new Date(Date.UTC(1983, 0, 7, 15, 32)),
      maxAge: 2592000,
      domain: "example.com",
      path: "/docs",
      secure: true,
      httpOnly: true,
      sameSite: "Strict",
      unparsed: ["Lulu=meowmeow"],
    };
    const cookie2Parsed: Cookie = {
      name: "hello",
      value: "world",
      expires: new Date(Date.UTC(1983, 0, 7, 15, 32)),
      maxAge: 2592000,
      domain: "example.com",
      path: "/docs",
      secure: true,
      httpOnly: true,
      sameSite: "Strict",
      unparsed: ["Lulu=meowmeow"],
    };
    const headers = new Headers();
    headers.append("Set-Cookie", cookie1String);
    headers.append("Set-Cookie", cookie2String);
    assertEquals(getSetCookies(headers), [cookie1Parsed, cookie2Parsed]);
  },
});
