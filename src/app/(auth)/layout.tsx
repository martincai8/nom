"use client";

import { useEffect } from "react";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  useEffect(() => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) =>
        console.log(
          "sw.js registered with: ",
          registration.scope,
        ),
      )
      .catch((err) => console.log("sw.js registration fail: ", err));
  }, []);

  return children
}