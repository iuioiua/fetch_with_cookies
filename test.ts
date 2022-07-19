import { assertEquals } from "./deps.ts";

import { getSetCookie } from "./mod.ts";

Deno.test({
  name: "getSetCookie",
  fn(): void {
    assertEquals(
      getSetCookie(
        "sessionId=38afes7a8; Expires=Fri, 07 Jan 1983 15:32:00 GMT; Max-Age=2592000; Domain=example.com; Path=/docs; Secure; HttpOnly; SameSite=Strict; Lulu=meowmeow",
      ),
      {
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
      },
    );
  },
});
