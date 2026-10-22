"use client";

import { useEffect, useState } from "react";

/** Renders the visitor's current year, so a statically built page never shows a stale copyright. */
export function CurrentYear() {
  const [year, setYear] = useState(() => new Date().getFullYear());
  useEffect(() => setYear(new Date().getFullYear()), []);
  return <span suppressHydrationWarning>{year}</span>;
}
