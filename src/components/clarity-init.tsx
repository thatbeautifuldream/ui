"use client";

import clarity from "@microsoft/clarity";
import { useEffect } from "react";

export function ClarityInit() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      clarity.init("ux08qydaci");
    }
  }, []);

  return null;
}
