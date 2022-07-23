import { assertEquals } from "./deps.ts";

import { decomposeSetCookie, getSetCookieValues } from "./mod.ts";

Deno.test({
  name: "getSetCookieValues",
  fn() {
    const headers = new Headers([
      ["set-cookie", "hello"],
      ["set-cookie", "world"],
    ]);
    assertEquals(getSetCookieValues(headers), ["hello", "world"]);
  },
});

Deno.test({
  name: "decomposeSetCookie",
  fn() {
    const value =
      "sessionId=38afes7a8; Expires=Fri, 07 Jan 1983 15:32:00 GMT; Max-Age=2592000; Domain=example.com; Path=/docs; Secure; HttpOnly; SameSite=Strict; Lulu=meowmeow";
    assertEquals(decomposeSetCookie(value), [
      ["sessionId", "38afes7a8"],
      ["Expires", "Fri, 07 Jan 1983 15:32:00 GMT"],
      ["Max-Age", "2592000"],
      ["Domain", "example.com"],
      ["Path", "/docs"],
      ["Secure"],
      ["HttpOnly"],
      ["SameSite", "Strict"],
      ["Lulu", "meowmeow"],
    ]);
  },
});
