"use client"

import { useState, useEffect } from "react"
import { getEmail, getMailtoHref } from "@/lib/email"

export function ObfuscatedEmail() {
  const [email, setEmail] = useState("loading...")

  useEffect(() => {
    setEmail(getEmail())
  }, [])

  return (
    <a
      href={getMailtoHref()}
      className="text-sm text-muted-foreground hover:text-primary transition-colors"
    >
      {email}
    </a>
  )
}
